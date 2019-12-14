import Vue from "vue";
import "@mdi/font/css/materialdesignicons.css";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: "mdi"
  }
};

export default new Vuetify(opts);
