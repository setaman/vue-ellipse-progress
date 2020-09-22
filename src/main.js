import { createApp } from "vue";
import VueEllipseProgress from "@/plugin";
import App from "./App.vue";

const app = createApp(App);

app.use(VueEllipseProgress);

app.mount("#app");
