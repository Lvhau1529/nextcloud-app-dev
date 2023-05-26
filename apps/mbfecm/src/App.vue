<template>
	<div id="content" class="app-mbfecm">
		<Content app-name="mbfecm" id="app-content">
			<router-view />		
		</Content>
	</div>
</template>
<script>
import Content from "@nextcloud/vue/dist/Components/Content";
export default {
	name: "App",
	components: {
		Content,
	},
};
</script>
<style lang="scss" scoped>
::v-deep .content {
	padding-top: 20px;
}
</style>
