import VueEllipseProgress from "./components/VueEllipseProgress.vue";

const install = (app, name = "vue-ellipse-progress") => app.component(name, VueEllipseProgress);
export default install;
export { VueEllipseProgress, install };
