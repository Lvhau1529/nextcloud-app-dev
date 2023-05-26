<template>
  <div class="wrapper">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        :validate-status="userNameError() ? 'error' : ''"
        :help="userNameError() || ''"
      >
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            },
          ]"
          placeholder="Username"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item
        :validate-status="passwordError() ? 'error' : ''"
        :help="passwordError() || ''"
      >
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item style="text-align: center">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="hasErrors(form.getFieldsError())"
        >
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
import Auth from "@/services/auth/index";
import { setToken } from "@/helper/auth";

export default {
  name: "LoginView",
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    setToken,
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("username") && getFieldError("username");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          Auth.login(values)
            .then((res) => {
              this.setToken(res.data);
              this.$message.success("Đăng nhập thành công");
              this.$router.push("/");
            })
            .catch((err) => {
              this.$message.error(err.response.data.message);
            });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
	width: 100%;
  min-width: 400px;
  display: flex;
  justify-content: center;
  .ant-form {
    min-width: 300px;
  }
}

select:disabled,
button:not(.button-vue):disabled,
.button:disabled,
input[type=button]:disabled,
input[type=submit]:disabled,
input[type=reset]:disabled {
	cursor: not-allowed;
}

div.select2-drop .select2-search input:disabled,
input[type=submit]:disabled,
input[type=button]:disabled,
input[type=reset]:disabled,
button:not(.button-vue):disabled,
.button:disabled,
.pager li a:disabled {
	color: rgba(0, 0, 0, 0.25);
	background-color: #f5f5f5;
	opacity: 1;
	margin: 0;
	padding: 0 15px;
	font-size: 14px;
	color: -webkit-fill-available;
	border: -webkit-fill-available;
}

div.select2-drop .select2-search input,
input[type=submit],
input[type=button],
input[type=reset],
button:not(.button-vue),
.button,
.pager li a {
	margin: unset;
	padding: 0 15px;
}

::v-deep button:not(.button-vue),
::v-deep .button,
::v-deep input[type=button],
::v-deep input[type=submit],
::v-deep input[type=reset] {
	font-weight: 400;
	border-radius: 4px;
}

select,
button:not(.button-vue),
.button,
input[type=button],
input[type=submit],
input[type=reset] {
	font-weight: 400;
	border-radius: 4px;	
	width: unset;
	min-height: unset;
	font-size: 14px;
	color: #fff;
	background-color: #1890ff;
	border-color: #1890ff;
	text-shadow: 0 -1px 0 rgba(0,0,0,.12);
	box-shadow: 0 2px 0 rgba(0,0,0,.045);	
}

::v-deep input:not([type=range]):not(.input-field__input):not([type=submit]):not([type=button]):not([type=reset]):not(.multiselect__input):not(.select2-input):not(.action-input__input),
::v-deep select,
::v-deep div[contenteditable=true],
::v-deep textarea {
	margin: 0;
	padding: 4px 11px 4px 30px;
	color: rgba(0, 0, 0, 0.65);
	font-size: 14px;
	background-color: #fff;
	background-image: none;
	border: 1px solid #d9d9d9;
	border-radius: 4px;
}

::v-deep select,
::v-deep button:not(.button-vue),
::v-deep input,
textarea,
div[contenteditable=true],
div[contenteditable=false] {
	min-height: unset;
}

::v-deep input:not([type=radio]):not([type=checkbox]):not([type=range]):not([type=submit]):not([type=button]):not([type=reset]):not([type=color]):not([type=file]):not([type=image]) {
	height: -webkit-fill-available;
}

::v-deep table {
	white-space: unset;
}
</style>
