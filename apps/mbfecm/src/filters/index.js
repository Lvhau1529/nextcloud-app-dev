import Vue from "vue";

const formatMoney = Vue.filter("formatMoney", function (value) {
  const formatValue = value.replace(/\..*/, "");
  return formatValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

const formatDate = Vue.filter("formatDate", function (value) {
  const formatValue = value.split("-");
  return `${formatValue[2]}/${formatValue[1]}/${formatValue[0]}`;
});

export default { formatMoney, formatDate };
