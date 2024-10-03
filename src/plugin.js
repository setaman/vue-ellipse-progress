import VeProgress from "./components/VueEllipseProgress.vue";

const install = (app, name = "ve-progress") => app.component(name, VeProgress);
export default install;
export { VeProgress, install };
