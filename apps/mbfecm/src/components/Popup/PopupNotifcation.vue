<template>
  <div class="wrapper-modal">
    <a-modal
      class="custom-modal"
      v-model="visible"
      centered
      :maskClosable="false"
      :confirm-loading="loading"
    >
      <template slot="title">
        <div class="modal__header">
          <p>Thông báo</p>
        </div>
      </template>
      <div class="modal__content">
        <div class="success">
          <div class="detail-notif">
            <a-icon
              class="icon"
              type="check-circle"
              theme="twoTone"
              two-tone-color="#52c41a"
            />
            <p>Hệ thống ERP có 50 hoá đơn trùng khớp ECM</p>
          </div>
        </div>
        <div class="error">
          <div class="detail-notif">
            <a-icon
              class="icon"
              type="close-circle"
              theme="twoTone"
              two-tone-color="#f5222d"
            />
            <div>
              <p>Hệ thống ERP có 0 hoá đơn sai lệch hệ thống ECM</p>
              <p class="error_detail" @click="handleToPage">
                (Xem chi tiết tại đây)
              </p>
            </div>
          </div>
        </div>
        <div class="warning">
          <div class="detail-notif">
            <a-icon
              class="icon"
              type="exclamation-circle"
              theme="twoTone"
              two-tone-color="#faad14"
            />
            <p>
              Bạn có muốn đồng bộ ngày hạch toán và số tham chiếu của các hoá
              đơn trùng khớp không?
            </p>
          </div>
        </div>
      </div>
      <template slot="footer">
        <div class="modal__footer">
          <a-button @click="handleOk" type="primary" :loading="loading"
            >Xác nhận</a-button
          >
          <a-button @click="handleCancel">Huỷ</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "PopupNotifcation",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: false,
      loading: false,
    };
  },
  methods: {
    handleToPage() {
      this.$router.push({ name: "about" });
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.loading = true;
      this.$emit("ok");
    },
    handleCancel() {
      this.destroyAll();
    },
    destroyAll() {
      this.visible = false;
      this.$destroyAll();
    },
  },
};
</script>
<style lang="scss">
.ant-modal-footer {
  border-top: none !important;
}
</style>

<style lang="scss" scoped>
.modal {
  &__header {
    text-align: center;
    p {
      font-size: 20px;
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
  > div:not(:last-child) {
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
</style>
