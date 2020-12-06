import { createApp } from "vue";
import veProgress from "@/plugin";
import App from "./App.vue";

const app = createApp(App);

app.use(veProgress);

app.mount("#app");
