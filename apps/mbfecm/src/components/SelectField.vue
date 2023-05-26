<template>
  <div>
    <a-select
      v-model="content"
      :allowClear="true"
      style="min-width: 220px"
      :placeholder="placeholder"
    >
      <template v-for="(option, index) in options">
        <a-select-option :value="option.value" :key="index">
          {{ option.label }}
        </a-select-option>
      </template>
    </a-select>
  </div>
</template>

<script>
export default {
  name: "SelecteField",
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Props placeholder",
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  watch: {
    value(val) {
      this.content = val;
    },
    content(val) {
      this.$emit("input", val);
    },
  },
  data() {
    return {
      content: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
