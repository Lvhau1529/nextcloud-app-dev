<template>
	<table>
		<thead>
			<tr>
				<th v-html="t('viewer', 'HHDVu.STT')"></th>
				<th v-html="t('viewer', 'HHDVu.THHDVu')"></th>
				<th v-html="t('viewer', 'HHDVu.TChat')"></th>
				<th v-html="t('viewer', 'HHDVu.SLuong')"></th>
				<th v-html="t('viewer', 'HHDVu.DGia')"></th>
				<th v-html="t('viewer', 'HHDVu.ThTien')"></th>
				<th v-html="t('viewer', 'HHDVu.TSuat')"></th>
				<th v-html="t('viewer', 'HHDVu.TThue')"></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6 = 4x5</td>
				<td>7</td>
				<td>8 = 6x7</td>
			</tr>
			<template v-if="listing.items && listing.items.length">
				<tr v-for="(item, index) in listing.items" :key="index">
					<td>{{ index + 1 }}</td>
					<td>{{ item["THHDVu"].value || '' }}</td>
					<td>{{ item["TChat"].value || '' }}</td>
					<td>{{ item["SLuong"].value || '' }}</td>
					<td v-numberFormat:value="item.DGia.value || 0"></td>
					<td>
						{{
							_getAmount(item["SLuong"].value, item["DGia"].value)
						}}
					</td>
					<td>{{ item["TSuat"].value || '' }}</td>
					<td>
						{{
							_getTaxAmount(
								item["TSuat"].value,
								item["SLuong"].value,
								item["DGia"].value
							)
						}}
					</td>
				</tr>
			</template>
			<tr>
				<td colspan="6">Cộng tiền hàng <i>(Sub total)</i>:</td>
				<td
					colspan="2"
					v-numberFormat:value="listing.payInfo.TgTCThue.value"
				>
					{{ listing.payInfo.TgTCThue.value }}
				</td>
			</tr>
			<tr>
				<td colspan="6">Tiền thuế GTGT <i>(VAT amount)</i>:</td>
				<td
					colspan="2"
					v-numberFormat:value="listing.payInfo.TgTThue.value"
				>
					{{ listing.payInfo.TgTThue.value }}
				</td>
			</tr>
			<tr>
				<td colspan="6">
					Tổng cộng tiền thanh toán <i>(Total payment)</i>:
				</td>
				<td
					colspan="2"
					v-numberFormat:value="listing.payInfo.TgTTTBSo.value"
				>
					{{ listing.payInfo.TgTTTBSo.value }}
				</td>
			</tr>
			<tr>
				<td colspan="8">
					Số tiền viết bằng chữ <i>(Amount in words)</i>:
					<b>{{ listing.payInfo.TgTTTBChu.value }}</b>
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
export default {
	directives: {
		numberFormat(el, binding, value) {
			const result = new Intl.NumberFormat("vi-VN").format(binding.value);
			return (el.innerText = result);
		},
	},
	name: "Listing",
	props: {
		listing: {
			type: Object,
			default: () => {
				return {
					name: "DSHHDVu",
					value: "",
					items: [],
					payInfo: {
						name: "TToan",
						value: "",
						THTTLTSuat: { name: "THTTLTSuat", value: "" },
						TgTCThue: { name: "TgTCThue", value: 0 },
						TgTThue: { name: "TgTThue", value: 0 },
						TTCKTMai: { name: "TTCKTMai", value: 0 },
						TgTTTBSo: { name: "TgTTTBSo", value: 0 },
						TgTTTBChu: {
							name: "TgTTTBChu",
							value: "",
						},
					},
				};
			},
		},
	},
	data() {
		return {};
	},
	mounted() {
		console.log("Listing");
	},
	methods: {
		_getDGia(DGia) {
			console.log({ DGia });
			new Intl.NumberFormat("vi-VN").format(DGia);
		},
		_amount(SLuong, DGia) {
			return SLuong * DGia;
		},
		_getAmount(SLuong, DGia) {
			return new Intl.NumberFormat("vi-VN").format(
				this._amount(SLuong, DGia)
			);
		},
		_getTaxAmount(TSuat, SLuong, DGia) {
			const amount = this._amount(SLuong, DGia);
			TSuat = TSuat.replace(/\D+/, "") ?? 0;
			return new Intl.NumberFormat("vi-VN").format(
				(amount * TSuat) / 100
			);
		},
	},
};
</script>

<style lang="scss" scoped>
td[colspan="6"] {
	text-align: right;
}
td[colspan="2"] {
	text-align: left;
	font-weight: bold;
}
</style>
