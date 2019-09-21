import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Builder from "./views/Builder.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/builder",
      name: "builder",
      component: Builder
    }
  ]
});
