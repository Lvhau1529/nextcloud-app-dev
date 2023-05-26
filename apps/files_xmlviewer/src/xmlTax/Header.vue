<template>
	<ul class="header">
		<li class="item">
			<div>
				<p>{{ header.items.THDon.value }}</p>
				<p><i>(VAT INVOICE)</i></p>
				<p
					v-html="
						t('viewer', 'NLap', {
							day: createdAt.day,
							month: createdAt.month,
							year: createdAt.year,
						})
					"
				></p>
			</div>
		</li>
		<li class="item">
			<ul class="sub">
				<li>
					<p
						v-html="
							t('viewer', 'KHHDon', {
								value: header.items.KHHDon.value,
								sub: '(Serial No.)',
							})
						"
					></p>
				</li>
				<li>
					<p
						v-html="
							t('viewer', 'SHDon', {
								value: header.items.SHDon.value,
							})
						"
					/>
				</li>
			</ul>
		</li>
	</ul>
</template>
<script>
export default {
	name: "Header",
	props: {
		header: {
			type: Object,
			default: () => {
				return {
					type: "element",
					name: "PBan",
					items: {
						THDon: { name: "", value: "" },
						KHMSHDon: { name: "", value: 1 },
						KHHDon: {
							name: "",
							value: "",
						},
						SHDon: { name: "", value: "" },
						NLap: {
							name: "",
							value: "",
						},
						// MSTTCGP: { name: "Mã số thuế: {value}", value: 101360697 },
					},
				};
			},
		},
	},
	computed: {
		createdAt() {
			const [year, month, day] = this.header.items.NLap.value.split("-");
			return { day, month, year };
		},
	},
	data() {
		return {};
	},
	mounted() {
		console.log("header");
	},
};
</script>
<style lang="scss" scoped>
ul {
	display: flex;
	li {
		&:first-child {
			&.item {
				flex-grow: 5;
				text-align: center;
				div {
					p {
						&:first-child {
							font-size: 20px;
							font-weight: bold;
							text-transform: uppercase;
						}
					}
				}
			}
		}
		&:last-child {
			&.item {
				flex-grow: 0;
			}
		}
	}
	ul.sub {
		padding-top: 0;
		border-bottom: none;
		display: flex;
		flex-direction: column;
	}
}
</style>
