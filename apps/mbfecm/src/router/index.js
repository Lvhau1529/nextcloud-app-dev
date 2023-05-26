import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import TokenService from "@/helper/token";

Vue.use(VueRouter);

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (TokenService.getToken()) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
}

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "home",
    // beforeEnter: guardMyroute,
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;