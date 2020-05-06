import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueEllipseProgress from "vue-ellipse-progress";
import VueEllipseProgressTest from "vue-ellipse-progress-test";
import Clipboard from "v-clipboard";

Vue.use(VueEllipseProgress);
Vue.use(VueEllipseProgressTest, "vue-ellipse-progress-test");
Vue.use(Clipboard);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
