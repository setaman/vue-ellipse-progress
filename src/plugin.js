import EllipseProgress from "./components/VueEllipseProgress.vue";

export default {
  install(Vue, name = "vue-ellipse-progress") {
    Vue.component(name, EllipseProgress);
  },
};
