import Vue from "vue";
import VueCookies from "vue-cookies";

const TOKEN_KEY = "access_token";
const TOKEN_EXPIRED_AT_KEY = "token_expired_at";
const REFRESH_TOKEN_KEY = "refresh_token";
const REFRESH_TOKEN_EXPIRED_AT_KEY = "refresh_token_expired_at";
const LANGUAGE_KEY = "lang";

Vue.use(VueCookies);

const BUFFER_TIME = 60 * 1000; // 60s

const TokenService = {
  getToken() {
    return (
      localStorage.getItem(TOKEN_KEY) || Vue.$cookies.get("MbfEcmAccessToken")
    );
  },

  setToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken || "");
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getTokenExpiredAt() {
    return localStorage.getItem(TOKEN_EXPIRED_AT_KEY) || "0";
  },

  setTokenExpiredAt(expiredAt) {
    // minus buffer time = BUFFER_TIME (s) to expiredAt
    const expAt = +expiredAt - BUFFER_TIME;
    localStorage.setItem(TOKEN_EXPIRED_AT_KEY, `${expAt}`);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken || "");
  },

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  getRefreshTokenExpiredAt() {
    return localStorage.getItem(REFRESH_TOKEN_EXPIRED_AT_KEY) || "0";
  },

  setRefreshTokenExpiredAt(expiredAt) {
    // minus buffer time = BUFFER_TIME (s) to expiredAt
    const expAt = +expiredAt - BUFFER_TIME;
    localStorage.setItem(REFRESH_TOKEN_EXPIRED_AT_KEY, `${expAt}`);
  },

  getHeader() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
    };
  },

  getHeaderToUploadFile() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
      "Content-Type": "multipart/form-data",
    };
  },

  setLanguage(lang) {
    return localStorage.setItem(LANGUAGE_KEY, lang);
  },

  getLanguage() {
    return localStorage.getItem(LANGUAGE_KEY) || "en";
  },
};

export default TokenService;
