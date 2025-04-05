import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import plugin1 from "@/plugin.ts";
//import plugin from "../dist/veprogress.js";
import plugin from "@veprogress/local";

const app = createApp(App);
/*app.use(plugin1, { legend: "123", color: "123" });
app.use(plugin, { legend: "123" });*/
app.mount("#app");
