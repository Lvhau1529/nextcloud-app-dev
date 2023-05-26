<template>
	<ul>
		<li>
			<p>{{ t("viewer", tax.name) }}:</p>
			<p>{{ tax.value }}</p>
		</li>
	</ul>
</template>
<script>
export default {
	name: "TaxID",
	props: {
		tax: {
			type: Object,
			default: () => {
				return {
					name: "",
					value: "",
				};
			},
		},
	},
	data() {
		return {};
	},
	mounted() {
		console.log("TaxID");
	},
};
</script>
<style lang="scss" scoped>
li {
	display: flex !important;
	gap: 10px;
	P {
		display: flex !important;
		gap: 10px;
		&:last-child {
			flex-grow: 2;
			font-weight: bold;
		}
	}
}
</style>
