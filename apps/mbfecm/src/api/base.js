import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { getToken } from "@/helper/auth.js";

/**
 * Service to call HTTP request via Axios
 */
const http = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = "http://10.1.204.16:8003/ecm/v1/";
  },

  /**
   * Set the default HTTP request headers
   */
  setHeader() {
    this.init();
    if (getToken()) {
      Vue.axios.defaults.headers.Authorization = `Bearer ${getToken()}`;
    }
  },

  /**
   * Send the GET HTTP request
   *
   * @param resource
   * @param config
   * @return {*}
   */
  get(resource, config) {
    this.setHeader();
    return Vue.axios
      .get(`${resource}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  },

  /**
   * Set the POST HTTP request
   *
   * @param resource
   * @param params
   * @param config
   * @return {*}
   */
  post(resource, params) {
    this.setHeader();
    return Vue.axios
      .post(`${resource}`, params)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  },

  /**
   * Send the PUT HTTP request
   *
   * @param resource
   * @param params
   * @param config
   * @return {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params, config) {
    this.setHeader();
    return Vue.axios.put(`${resource}`, params, config);
  },

  /**
   * Send the DELETE HTTP request
   *
   * @param resource
   * @param config
   * @return {*}
   */
  delete(resource, config) {
    this.setHeader();
    return Vue.axios.delete(resource, config);
  },

  /**
   * Set the UPLOAD HTTP request
   *
   * @param resource
   * @param params
   * @return {*}
   */
  upload(resource, params) {
    this.setHeader();
    return Vue.axios
      .post(`${resource}`, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  },
};

export default http;
