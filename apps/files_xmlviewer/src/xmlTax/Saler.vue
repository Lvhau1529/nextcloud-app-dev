<template>
	<ul class="saler">
		<li v-if="saler.items.Ten">
			<p v-html="t('viewer', 'saler.Ten')"></p>
			<p>{{ saler.items.Ten.value }}</p>
		</li>
		<li v-if="saler.items.MST">
			<p v-html="t('viewer', 'saler.MST')"></p>
			<p>{{ saler.items.MST.value }}</p>
		</li>
		<li v-if="saler.items.DChi">
			<p v-html="t('viewer', 'saler.DChi')"></p>
			<p class="address">{{ saler.items.DChi.value }}</p>
		</li>
		<li v-if="saler.items.DThoai">
			<p v-html="t('viewer', 'saler.DThoai')"></p>
			<p>{{ saler.items.DThoai.value }}</p>
		</li>
		<li v-if="saler.items.STK">
			<p v-html="t('viewer', 'saler.STK')"></p>
			<p>{{ saler.items.STK.value }}</p>
		</li>
	</ul>
</template>
<script>
export default {
	name: "Saler",
	props: {
		saler: {
			type: Object,
			default: () => {
				return {
					name: "NBan",
					items: {
						Ten: { name: "MST", value: "" },
						MST: { name: "MST", value: "" },
						DChi: { name: "DChi", value: "" },
						DThoai: { name: "DThoai", value: "" },
						STK: { name: "STK", value: "" },
					},
				};
			},
		},
	},
	mounted() {
		console.log("Saler");
	},
};
</script>
<style lang="scss" scoped>
li {
	display: flex !important;
	gap: 10px;
	p {
		display: flex !important;
		gap: 10px;
		&:last-child {
			flex-grow: 2;
			font-weight: bold;
		}
		&.address {
			font-weight: normal;
		}
	}
}
</style>
