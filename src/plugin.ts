import { h } from "vue";
import VeProgress from "@/components/PluginTest.vue";
import type {
  VeProgressProps,
  VeProgressPlugin,
  VeProgressPluginInstallFunction,
} from "@/types.ts";

const install: VeProgressPluginInstallFunction = (app, props) => {
  app.component("VeProgress", h(VeProgress, props as VeProgressProps));
};

export default { install } as VeProgressPlugin;
export { VeProgress, install };
