import EllipseProgress from "./components/EllipseProgressContainer.vue";

export default {
  install(Vue) {
    console.info("Installing plugin", EllipseProgress);
    Vue.component("vue-ellipse-progress", EllipseProgress);
  }
};
