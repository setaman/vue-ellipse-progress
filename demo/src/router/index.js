import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TestFeatures from "../views/TestFeatures.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/test",
    name: "test",
    component: TestFeatures,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
