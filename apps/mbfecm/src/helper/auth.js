import Vue from "vue";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);

const KEY_ACCESS_TOKEN = "access_token";

export function getToken() {
  return (
    Vue.$cookies.get("MbfEcmAccessToken") ||
    JSON.parse(localStorage.getItem(KEY_ACCESS_TOKEN))
  );
}

export function setToken(data) {
  return localStorage.setItem(KEY_ACCESS_TOKEN, JSON.stringify(data.token));
}

export function removeToken() {
  return Vue?.prototype?.$q?.cookies?.remove(KEY_ACCESS_TOKEN, {
    path: "/",
  });
}

export function isLogged() {
  return !!getToken();
}

// export function state() {
//   return store.state;
// }

export function redirectUrl(val, target) {
  if (window) {
    window.open(val, target);
  }
}
