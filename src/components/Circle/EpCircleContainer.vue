<template>
  <g class="ep-circle" :style="{ transform: `rotate(${startAngle}deg)` }">
    <defs>
      <gradient v-if="isColorGradient" :color="options.color" type="progress" :id="_uid" />
      <gradient v-if="isColorFillGradient" :color="options.colorFill" type="progress-fill" :id="_uid" />
      <gradient v-if="isEmptyColorGradient" :color="options.emptyColor" type="empty" :id="_uid" />
      <gradient v-if="isEmptyColorFillGradient" :color="options.emptyColorFill" type="empty-fill" :id="_uid" />
    </defs>
    <component :is="circleType" :options="options" :multiple="multiple" :id="_uid" :index="index" />
  </g>
</template>

<script>
import Gradient from "../Gradient.vue";
import HalfCircleProgress from "./HalfCircleProgress.vue";
import CircleProgress from "./CircleProgress.vue";
import { getValueIfDefined } from "../../utils";

export default {
  name: "EpCircleContainer",
  components: { CircleProgress, HalfCircleProgress, Gradient },
  props: {
    ...CircleProgress.mixins[0].props
  },
  computed: {
    circleType() {
      return this.options.half ? "half-circle-progress" : "circle-progress";
    },
    startAngle() {
      return getValueIfDefined(this.options.angle) || -90;
    },
    isColorGradient() {
      return Array.isArray(this.options.color.colors);
    },
    isColorFillGradient() {
      return Array.isArray(this.options.colorFill.colors);
    },
    isEmptyColorGradient() {
      return Array.isArray(this.options.emptyColor.colors);
    },
    isEmptyColorFillGradient() {
      return Array.isArray(this.options.emptyColorFill.colors);
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
