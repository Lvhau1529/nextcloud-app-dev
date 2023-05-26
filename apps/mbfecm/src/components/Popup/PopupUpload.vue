<template>
  <div v-if="visible" class="wrapper-modal">
    <a-modal centered :maskClosable="false" :width="540" :destroyOnClose="true" :visible.sync="visible"
      @cancel="handleCancel" class="custom-modal">
      <template slot="title">
        <div class="modal__header">
          <p v-if="isFileUpload">
            Bạn vui lòng chọn file bảng kê ERP để đồng bộ dữ liệu
          </p>
          <p v-else>Thông báo</p>
        </div>
      </template>
      <div v-if="isFileUpload" class="modal__content">
        <BreadcrumbField :breadcrumb-data="treeData" :selected-value="selectFolder" :disable-select="true" />
        <a-list v-if="fileUpload" :class="{ 'custom__alist--error': errorMessage }" item-layout="horizontal"
          :data-source="fileUpload" :bordered="true">
          <a-list-item class="custom-list-item" slot="renderItem" slot-scope="item">
            <div>
              <template v-if="errorMessage">
                <a-icon style="margin-right: 10px; font-size: 20px" type="file-exclamation" theme="twoTone" />
                <span :class="{ 'upload-error': errorMessage }">{{
                  item.name
                }}</span>
              </template>
              <template v-else>
                <a-icon style="margin-right: 10px; font-size: 20px" type="file-excel" theme="twoTone"
                  two-tone-color="#52c41a" />
                <span>{{ item.name }}</span>
              </template>
            </div>
            <div style="cursor: pointer">
              <a-icon type="delete" theme="twoTone" two-tone-color="#f5222d" @click="handleClearUpload" />
            </div>
          </a-list-item>
        </a-list>
        <a-upload-dragger name="file" :multiple="false" :before-upload="beforeUpload" :showUploadList="false">
          <p class="ant-upload-drag-icon">
            <a-icon type="cloud-upload" />
          </p>
          <p class="ant-upload-text">Upload file</p>
          <p v-if="errorMessage" class="upload-error">
            File của bạn không hợp lệ, vui lòng upload đúng định dạng excel
          </p>
        </a-upload-dragger>
      </div>
      <div v-else class="modal__content">
        <div class="success">
          <div class="detail-notif">
            <a-icon class="icon" type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
            <p>Hệ thống ERP có {{ successCount }} hoá đơn trùng khớp ECM</p>
          </div>
        </div>
        <div class="error">
          <div class="detail-notif">
            <a-icon class="icon" type="close-circle" theme="twoTone" two-tone-color="#f5222d" />
            <div>
              <p>
                Hệ thống ERP có {{ errorCount }} hoá đơn sai lệch hệ thống ECM
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="detail-notif">
            <a-icon class="icon" type="exclamation-circle" theme="twoTone" two-tone-color="#faad14" />
            <p>
              Bạn có muốn đồng bộ ngày hạch toán và số tham chiếu của các hoá
              đơn trùng khớp không?
            </p>
          </div>
        </div>
      </div>
      <template slot="footer">
        <div class="modal__footer">
          <a-button :disabled="!fileUpload || !isValidType" @click="handleOk" type="primary" :loading="loading">Xác
            nhận</a-button>
          <a-button @click="handleCancel">Huỷ</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ECM from "@/services/ecm/index";
import BreadcrumbField from "@/components/BreadcrumbField.vue";
export default {
  name: "PopupUpload",
  components: {
    BreadcrumbField,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isFileUpload: true,
      fileUpload: null,
      isValidType: false,
      visible: false,
      loading: false,
      errorMessage: false,
      successCount: 0,
      errorCount: 0,
      resultId: "",
    };
  },
  computed: {
    ...mapState({
      folderSelected: (state) => state.global.folderSelected,
      treeData: (state) => state.global.treeData,
    }),
    selectFolder: {
      get() {
        return this.folderSelected;
      },
      set(value) {
        this.setFolderSelected(value);
      },
    },
  },
  methods: {
    handleClearUpload() {
      this.errorMessage = false;
      this.fileUpload = null;
      this.isValidType = false;
    },
    beforeUpload(file, fileUpload) {
      this.handleClearUpload();
      const fileType = file.type;
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      this.isValidType = validTypes.includes(fileType);
      if (!this.isValidType) {
        this.errorMessage = true;
      }
      this.fileUpload = fileUpload;
      return false;
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      if (this.isFileUpload) {
        this.submitFileUpload();
      } else {
        this.submitErpSync();
      }
    },
    async submitFileUpload() {
      this.loading = true;
      const payload = {
        file_upload: this.fileUpload[0],
        ecm_path: this.selectFolder,
        overwrite: 0,
      };
      // this.submitErpProcess(payload);
      await ECM.UploadFile(payload)
        .then((res) => {
          if (res?.details[0].code === "0") {
            this.$message.success(
              res?.details[0].message || "Upload file thành công"
            );
          } else {
            this.$message.warning(res?.details[0].message);
          }
          // After upload file call api show notification
          this.submitErpProcess(payload);
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(
            err?.data.message || "Có lỗi xảy ra, vui lòng thử lại sau"
          );
        });
    },
    submitErpProcess(payload) {
      // this.isFileUpload = false;
      // this.loading = false;
      ECM.ErpProcess(payload)
        .then((res) => {
          this.isFileUpload = false;
          this.resultId = res[0];
          this.errorCount = res[1]["So luong hoa don khong trung khop"];
          this.successCount = res[1]["So luong hoa don trung khop"];
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(
            err?.data.message || "Có lỗi xảy ra, vui lòng thử lại sau"
          );
        });
    },
    submitErpSync() {
      this.loading = true;
      const payload = { result_id: this.resultId };
      ECM.ErpSync(payload)
        .then((res) => {
          this.loading = false;
          this.$message.success(res[0]?.message);
          this.handleClearUpload();
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(
            err?.data.message || "Có lỗi xảy ra, vui lòng thử lại sau"
          );
        });
    },
    handleCancel() {
      this.visible = false;
      this.$emit("Cancel");
    },
  },
};
</script>
<style lang="scss">
.ant-modal-footer {
  border-top: none !important;
}

.ant-upload-drag-icon {
  margin-bottom: 5px !important;
}

.ant-modal-body {
  padding: 10px 24px 24px 24px;
}
</style>

<style lang="scss" scoped>
.modal {
  &__header {
    p {
      font-size: 19px;
      margin: 0;
    }
  }

  &__content {
    font-weight: 500;

    p {
      margin: 0;
    }

    &--note {
      font-style: italic;
    }
  }

  &__footer {
    display: flex;
    justify-content: center;

    button:last-child {
      margin-left: 10px;
    }
  }
}

.modal__content {
  >div:not(:last-child) {
    margin-bottom: 10px;
  }

  .detail-notif {
    display: flex;
    align-items: center;

    i {
      font-size: 18px;
      margin-right: 8px;
    }

    .error_detail {
      font-weight: normal;
      text-decoration: underline;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}

.custom__alist--error {
  border-color: #fb0808;

  .custom-list-item {
    align-items: center;
    justify-content: space-between;
  }
}

.upload-error {
  font-weight: normal;
  color: #fb0808;
}
</style>

<style lang="scss" scoped>
@import '@/assets/styles/popup.scss';
</style>
