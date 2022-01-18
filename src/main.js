import Vue from "vue";
import vueEllipseProgress from "@/plugin";
import App from "./App.vue";

Vue.use(vueEllipseProgress);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
