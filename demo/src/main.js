import VueEllipseProgress from "vue-ellipse-progress";
import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(VueEllipseProgress);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
