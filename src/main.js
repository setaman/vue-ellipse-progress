import Vue from "vue";
import VueEllipseProgress from "@/plugin";
import App from "./App.vue";

Vue.use(VueEllipseProgress);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
