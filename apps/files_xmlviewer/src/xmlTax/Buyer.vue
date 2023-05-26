<template>
	<ul>
		<li v-if="buyer.items.NMua">
			<p v-html="t('viewer', 'buyer.NMua')"></p>
			<p></p>
		</li>
		<li v-if="buyer.items.Ten">
			<p v-html="t('viewer', 'buyer.Ten')"></p>
			<p>{{ buyer.items.Ten.value }}</p>
		</li>
		<li v-if="buyer.items.MST">
			<p v-html="t('viewer', 'buyer.MST')"></p>
			<p>{{ buyer.items.MST.value }}</p>
		</li>
		<li v-if="buyer.items.DChi">
			<p v-html="t('viewer', 'buyer.DChi')"></p>
			<p class="address">{{ buyer.items.DChi.value }}</p>
		</li>
		<li v-if="buyer.items.HTTToan">
			<p v-html="t('viewer', 'buyer.HTTToan')"></p>
			<p>{{ buyer.items.HTTToan.value }}</p>
		</li>
		<li v-if="buyer.items.STK">
			<p v-html="t('viewer', 'buyer.STK')"></p>
			<p>{{ buyer.items.STK.value }}</p>
		</li>
	</ul>
</template>
<script>
export default {
	name: "Buyer",
	props: {
		buyer: {
			type: Object,
			default: () => {
				return {
					name: "NMua",
					items: {
						Ten: { name: "MST", value: "" },
						MST: { name: "MST", value: "" },
						DChi: { name: "DChi", value: "" },
						DThoai: { name: "DThoai", value: "" },
						STK: { name: "STK", value: "" },
						HTTToan: {
							name: "STK",
							value: "Tiền mặt/Chuyển khoản",
						},
					},
				};
			},
		},
	},
	mounted() {
		console.log("Buyer");
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
