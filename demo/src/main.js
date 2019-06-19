import VueEllipseProgress from "vue-ellipse-progress";
import SergaTest from "serga-test";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
console.log('PROGRESS', VueEllipseProgress);
Vue.use(VueEllipseProgress);
Vue.use(SergaTest);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
