<<<<<<< HEAD
<template>
  <div>
    <a-tag :color="checkColorTag">
      {{ invoiceStatus }}
    </a-tag>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ECM from "@/services/ecm";
export default {
  name: "ItemInvoice",
  props: {
    fileId: {
      type: Number,
      default: 0,
    },
    reload: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      invoiceStatus: "",
      loading: true,
    };
  },
  watch: {
    reload: {
      handler() {
        if (this.getSelectedRowKeys.includes(this.fileId)) {
          this.checkVaildInvoice(this.fileId, "reCheck");
        }
      },
    },
    "$store.state.global.folderSelected": {
      handler() {
        this.checkVaildInvoice(this.fileId);
      },
    },
  },
  created() {
    if (this.$store.state.global.folderSelected) {
      this.checkVaildInvoice(this.fileId);
    }
  },
  computed: {
    ...mapGetters("table", ["getSelectedRowKeys"]),
    // eslint-disable-next-line vue/return-in-computed-property
    checkColorTag() {
      if (this.invoiceStatus === "Không") {
        return "orange";
      }
      if (this.invoiceStatus === "Không hợp lệ") {
        return "pink";
      }
      if (this.invoiceStatus === "Hợp lệ") {
        return "green";
      }
    },
  },
  methods: {
    checkVaildInvoice(id_file, checkStatus) {
      this.loading = true;
      this.invoiceStatus = "Không";
      const payload = { ecm_file_id: id_file };
      ECM.CheckValidInvoice(payload)
        .then(async (res) => {
          this.invoiceStatus = (await res?.details[0].invoice_checked
            .is_modified_invoice.result)
            ? "Không hợp lệ"
            : "Hợp lệ";
          if (
            this.getSelectedRowKeys.length > 0 &&
            this.getSelectedRowKeys[this.getSelectedRowKeys.length - 1]
              .file_id === this.fileId &&
            checkStatus
          ) {
            this.$emit("checkVaildSuccess");
            this.$message.success("Kiểm tra thành công");
          }
        })
        .catch((err) => {
          this.$message.error(
            err?.data.message || "Có lỗi xảy ra, vui lòng thử lại sau"
          );
          this.invoiceStatus = "Không";
        });
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
=======
<template>
  <div>
    <a-tag :color="checkColorTag">
      {{ invoiceStatus }}
    </a-tag>
  </div>
</template>

<script>
import ECM from "@/services/ecm";
export default {
  name: "ItemInvoice",
  props: {
    fileId: {
      type: Number,
      default: 0,
    },
    selectedRowKeys: {
      type: Array,
      default: () => [],
    },
    reload: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      invoiceStatus: "",
      loading: true,
    };
  },
  watch: {
    reload: {
      handler() {
        if (this.selectedRowKeys.includes(this.fileId)) {
          this.checkVaildInvoice(this.fileId, "reCheck");
        }
      },
    },
  },
  mounted() {
    this.checkVaildInvoice(this.fileId);
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    checkColorTag() {
      if (this.invoiceStatus === "Không") {
        return "orange";
      }
      if (this.invoiceStatus === "Không hợp lệ") {
        return "pink";
      }
      if (this.invoiceStatus === "Hợp lệ") {
        return "green";
      }
    },
  },
  methods: {
    checkVaildInvoice(id_file, checkStatus) {
      this.loading = true;
      this.invoiceStatus = "Không";
      const payload = { ecm_file_id: id_file };
      ECM.CheckValidInvoice(payload)
        .then(async (res) => {
          this.invoiceStatus = (await res?.data?.details[0].invoice_checked
            .is_modified_invoice.result)
            ? "Không hợp lệ"
            : "Hợp lệ";
          if (
            this.selectedRowKeys[this.selectedRowKeys.length - 1] ===
              this.fileId &&
            checkStatus
          ) {
            this.$emit("checkVaildSuccess");
            this.$message.success("Kiểm tra thành công");
          }
        })
        .catch((err) => {
          this.$message.error(err.response.data.message);
          this.invoiceStatus = "Không";
        });
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
>>>>>>> 471e025a94c1209bc549ab01e61452c017ba49b6
