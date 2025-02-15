import { h } from "vue";
import type {
  VeProgressProps,
  VeProgressPlugin,
  VeProgressPluginInstallFunction,
} from "@/types.ts";
import VeProgress from "@/components/VueEllipseProgress.vue";

const install: VeProgressPluginInstallFunction = (app, props) => {
  app.component("VeProgress", h(VeProgress, props as VeProgressProps));
};

export default { install } as VeProgressPlugin;
export { VeProgress, install };
