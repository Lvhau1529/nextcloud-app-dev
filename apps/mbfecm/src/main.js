/**
 * SPDX-FileCopyrightText: 2018 John Molakvoæ <skjnldsv@protonmail.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { generateFilePath } from '@nextcloud/router'

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import filters from "./filters";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/styles/main.scss";
import BreadcrumbField from "./components/BreadcrumbField.vue";

Vue.config.productionTip = false;

Vue.component("BreadcrumbField", BreadcrumbField);

Vue.use(Antd)

// eslint-disable-next-line
__webpack_public_path__ = generateFilePath(appName, '', 'js/')

Vue.mixin({ methods: { t, n } })

export default new Vue({
	el: '#content',
	filters,
	router,
	store,
	render: (h) => h(App),
})
