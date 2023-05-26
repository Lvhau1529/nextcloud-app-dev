<template>
  <div class="wrapper-breadcrumb">
    <a-breadcrumb v-if="breadcrumbItems.length > 0" separator=">">
      <a-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index" :href="item.value" class="breadcrumb">
        <template v-if="item.title === '/'">
          <a-icon type="home" @click="handleBreadcrumbClick(item)" />
        </template>
        <span v-else :class="{ 'cursor-default': disableSelect }" @click="handleBreadcrumbClick(item)">{{
          item.title
        }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "BreadcrumbField",
  props: {
    breadcrumbData: {
      type: Array,
      default: () => [],
      required: true,
    },
    selectedValue: {
      type: String,
      default: "",
    },
    disableSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      breadcrumbItems: [],
    };
  },
  watch: {
    selectedValue: {
      handler(val) {
        this.breadcrumbItems = [];
        this.generateBreadcrumbItems(this.breadcrumbData, val);
      },
    },
  },
  mounted() {
    if (this.breadcrumbData && this.selectedValue) {
      this.generateBreadcrumbItems(this.breadcrumbData, this.selectedValue);
    }
  },
  methods: {
    handleBreadcrumbClick(item) {
      this.$emit("BreadcrumbItem", item);
    },
    generateBreadcrumbItems(data, selectedValue) {
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          if (item.value === selectedValue) {
            this.breadcrumbItems.push({ title: item.title, value: item.value });
            return;
          }
          if (Array.isArray(item.children)) {
            this.generateBreadcrumbItems(item.children, selectedValue);
            if (this.breadcrumbItems.length > 0) {
              this.breadcrumbItems.unshift({
                title: item.title,
                value: item.value,
              });
              return;
            }
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper-breadcrumb {
  margin-bottom: 10px;

  .ant-breadcrumb {
    display: flex;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
  }

  .breadcrumb-title {
    cursor: pointer;
  }
}
</style>
