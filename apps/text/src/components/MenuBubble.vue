<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<BubbleMenu :editor="$editor"
		:tippy-options="{ onHide: hideLinkMenu, duration: 200, placement: 'bottom' }"
		data-text-el="menu-bubble"
		class="menububble">
		<form v-if="linkMenuIsActive" class="menububble__form" @submit.prevent="setLinkUrl()">
			<input ref="linkInput"
				v-model="linkUrl"
				class="menububble__input"
				type="text"
				placeholder="https://"
				@keydown.esc="hideLinkMenu">
			<button class="menububble__button"
				data-text-bubble-action="confirm"
				type="button"
				tabindex="0"
				@click="setLinkUrl()">
				<Check />
			</button>
		</form>

		<template v-else>
			<button class="menububble__button"
				data-text-bubble-action="add-link"
				:class="{ 'is-active': isActive }"
				@click="showLinkMenu()">
				<LinkIcon />
				<span class="menububble__buttontext">
					{{ isActive ? t('text', 'Update Link') : t('text', 'Add Link') }}
				</span>
			</button>
			<button v-if="!isUsingDirectEditing"
				data-text-bubble-action="add-file"
				class="menububble__button"
				:class="{ 'is-active': isActive }"
				@click="selectFile()">
				<Document />
				<span class="menububble__buttontext">{{ t('text', 'Link file') }}</span>
			</button>
			<button v-if="isActive"
				class="menububble__button"
				data-text-bubble-action="remove-link"
				:class="{ 'is-active': isActive }"
				@click="removeLinkUrl()">
				<Delete />
				<span class="menububble__buttontext">
					{{ t('text', 'Remove Link') }}
				</span>
			</button>
		</template>
	</BubbleMenu>
</template>

<script>
import debounce from 'debounce'
import { BubbleMenu } from '@tiptap/vue-2'
import { getMarkAttributes } from '@tiptap/core'
import { getCurrentUser } from '@nextcloud/auth'
import { loadState } from '@nextcloud/initial-state'
import { Tooltip } from '@nextcloud/vue'
import { optimalPath } from './../helpers/files.js'

import { useEditorMixin } from './Editor.provider.js'

import { LinkIcon, Document, Delete, Check } from '../components/icons.js'

export default {
	name: 'MenuBubble',
	components: {
		BubbleMenu,
		LinkIcon,
		Document,
		Delete,
		Check,
	},
	directives: {
		tooltip: Tooltip,
	},
	mixins: [useEditorMixin],
	props: {
		// used to calculate the position based on the scrollOffset
		contentWrapper: {
			type: HTMLDivElement,
			required: false,
			default: null,
		},
		filePath: {
			type: String,
			required: false,
			default: '',
		},
	},
	data: () => {
		return {
			isActive: false,
			linkUrl: null,
			linkMenuIsActive: false,
			isUsingDirectEditing: loadState('text', 'directEditingToken', null) !== null,
		}
	},
	mounted() {
		this.$_updateIsActive = debounce(this.updateIsActive.bind(this), 50)
		this.$editor.on('update', this.$_updateIsActive)
		this.$editor.on('selectionUpdate', this.$_updateIsActive)
	},
	beforeDestroy() {
		this.$editor.off('update', this.$_updateIsActive)
		this.$editor.off('selectionUpdate', this.$_updateIsActive)
	},
	methods: {
		showLinkMenu() {
			const attrs = getMarkAttributes(this.$editor.state, 'link')
			this.linkUrl = attrs.href
			this.linkMenuIsActive = true
			this.$nextTick(() => {
				this.$refs.linkInput.focus()
			})
		},
		hideLinkMenu() {
			this.linkUrl = null
			this.linkMenuIsActive = false
		},
		selectFile() {
			const currentUser = getCurrentUser()
			if (!currentUser) {
				return
			}
			const startPath = this.filePath.split('/').slice(0, -1).join('/')
			OC.dialogs.filepicker(t('text', 'Select file to link to'), (file) => {
				const client = OC.Files.getClient()
				client.getFileInfo(file).then((_status, fileInfo) => {
					const path = optimalPath(this.filePath, `${fileInfo.path}/${fileInfo.name}`)
					const encodedPath = path.split('/').map(encodeURIComponent).join('/')
					const href = `${encodedPath}?fileId=${fileInfo.id}`
					this.$editor.chain().setLink({ href }).focus().run()
					this.hideLinkMenu()
				})
			}, false, [], true, undefined, startPath)
		},
		setLinkUrl() {
			let url = this.linkUrl
			// Heuristics for determining if we need a https:// prefix.
			const noPrefixes = [
				/^[a-zA-Z]+:/, // url with protocol ("mailTo:email@domain.tld")
				/^\//, // absolute path
				/\?fileId=/, // relative link with fileId
				/^\.\.?\//, // relative link starting with ./ or ../
				/^[^.]*[/$]/, // no dots before first '/' - not a domain name
				/^#/, // url fragment
			]
			if (url && !noPrefixes.find(regex => url.match(regex))) {
				url = 'https://' + url
			}

			// Avoid issues when parsing urls later on in markdown that might be entered in an invalid format (e.g. "mailto: example@example.com")
			const href = url.replaceAll(' ', '%20')
			this.$editor.chain().setLink({ href }).focus().run()
			this.hideLinkMenu()
		},
		removeLinkUrl() {
			this.$editor.chain().unsetLink().focus().run()
		},
		updateIsActive() {
			this.isActive = this.$editor.isActive('link')
		},
	},
}
</script>

<style scoped lang="scss">
	.menububble {
		display: flex;
		z-index: 10020;
		background: var(--color-main-background-translucent);
		box-shadow: 0 1px 5px var(--color-box-shadow);
		border-radius: var(--border-radius-large);
		overflow: hidden;
		padding: 0;
		margin-left: 10px;
		height: 44px;

		&__button {
			flex-grow: 1;
			border: 0;
			padding: 0.9rem 0.7rem;
			margin: 0;
			border-radius: 0;
			cursor: pointer;
			background-color: var(--color-main-background);
			border-right: 1px solid var(--color-border);
			display: flex;
			align-items: center;

			&:focus,
			&:hover {
				background-color: var(--color-background-hover);
				border: 0;
				border-right: 1px solid var(--color-border) !important;
			}

			&:last-child {
				border: 0 !important;
			}
		}

		&__buttontext {
			padding: 0.4rem;
			padding-right: 0;
		}

		&__form {
			display: flex;
			align-items: center;
		}

		&__input {
			font: inherit;
			border: none;
			background: transparent;
			min-width: 250px;
			margin: 0 0.5em 0 1em;
		}
	}
</style>
