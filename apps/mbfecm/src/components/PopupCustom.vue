<<<<<<< HEAD
<template>
  <div class="wrapper-modal">
    <a-modal class="custom-modal" v-model="visible" centered :maskClosable="false" :confirm-loading="loading">
      <template slot="title">
        <div class="modal__header">
          <p>Thông báo</p>
        </div>
      </template>
      <div class="modal__content">
        <p>{{ content }}</p>
        <p v-if="subContent">{{ subContent }}</p>
        <p v-if="note" class="modal__content--note">
          <span style="color: red">Lưu ý</span>: {{ note }}
        </p>
      </div>
      <template slot="footer">
        <div class="modal__footer">
          <a-button @click="handleOk" type="primary" :loading="loading">Xác nhận</a-button>
          <a-button v-if="hasCancel" @click="handleCancel">Huỷ</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "PopupCustom",
  props: {
    content: {
      type: String,
      default: "Truyền props content",
      required: true,
    },
    subContent: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "",
    },
    hasCancel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
      loading: false,
    };
  },
  methods: {
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
    text-align: center;
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
</style>

<style lang="scss" scoped>
@import '@/assets/styles/popup.scss';
</style>
=======
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
        <p>{{ content }}</p>
        <p v-if="subContent">{{ subContent }}</p>
        <p v-if="note" class="modal__content--note">
          <span style="color: red">Lưu ý</span>: {{ note }}
        </p>
      </div>
      <template slot="footer">
        <div class="modal__footer">
          <a-button @click="handleOk" type="primary" :loading="loading"
            >Xác nhận</a-button
          >
          <a-button v-if="hasCancel" @click="handleCancel">Huỷ</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "PopupCustom",
  props: {
    content: {
      type: String,
      default: "Truyền props content",
      required: true,
    },
    subContent: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "",
    },
    hasCancel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
      loading: false,
    };
  },
  methods: {
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
    text-align: center;
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

::v-deep .ant-modal-close {
  margin: 0;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0;
  color: rgba(0, 0, 0, 0.45);
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: color 0.3s;
}

::v-deep .ant-btn {
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;
}

::v-deep .ant-btn-primary {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

</style>
>>>>>>> 471e025a94c1209bc549ab01e61452c017ba49b6
