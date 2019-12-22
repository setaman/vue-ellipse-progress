<template>
  <g class="ep-circle" :style="{ transform: `rotate(${startAngle}deg)` }">
    <defs>
      <gradient v-if="options.color.gradient" :color="options.color" type="progress" :id="_uid" />
      <gradient v-if="options.colorFill.gradient" :color="options.colorFill" type="progress-fill" :id="_uid" />
      <gradient v-if="options.emptyColor.gradient" :color="options.emptyColor" type="empty" :id="_uid" />
      <gradient v-if="options.emptyColorFill.gradient" :color="options.emptyColorFill" type="empty-fill" :id="_uid" />
    </defs>
    <half-circle-progress v-if="options.half" :options="options" multiple="multiple" :id="_uid" :index="index" />
    <circle-progress v-else :options="options" multiple="multiple" :id="_uid" :index="index" />
  </g>
</template>

<script>
import Gradient from "../Gradient.vue";
import HalfCircleProgress from "../HalfCircleProgress.vue";
import CircleProgress from "../CircleProgress.vue";
import { getValueIfDefined } from "../../utils";

export default {
  name: "EpCircle",
  components: { CircleProgress, HalfCircleProgress, Gradient },
  props: {
    ...CircleProgress.mixins[0].props
  },
  computed: {
    startAngle() {
      return getValueIfDefined(this.options.angle) || -90;
    }
  }
};
</script>
<style scoped lang="scss">
g.ep-circle {
  transition: inherit;
  transform-origin: 50% 50%;
}
</style>
