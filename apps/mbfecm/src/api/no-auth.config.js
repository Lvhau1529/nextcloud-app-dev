import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

/**
 * Service to call HTTP request via Axios
 */
const httpNoAuth = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = "http://10.1.204.16:8007/ecm/v1/";
  },

  /**
   * Set the default HTTP request headers
   */
  setHeader() {
    this.init();
  },
  /**
   * Send the GET HTTP request
   * @param resource
   * @param config
   * @returns {*}
   */
  get(resource, config) {
    this.setHeader();
    return Vue.axios.get(
      `${resource}&appid=${process.env.VUE_APP_API_KEY}`,
      config
    );
  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @param config
   * @returns {*}
   */
  post(resource, params, config) {
    this.setHeader();
    return Vue.axios.post(`${resource}`, params, config);
  },

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @param config
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params, config) {
    this.setHeader();
    return Vue.axios.put(`${resource}`, params, config);
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @param config
   * @returns {*}
   */
  delete(resource, config) {
    this.setHeader();
    return Vue.axios.delete(resource, config);
  },

  /**
   * Set the UPLOAD HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  upload(resource, params) {
    this.setHeader();
    return Vue.axios.post(`${resource}`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default httpNoAuth;
