<template>
  <g class="ep-circle" :style="{ transform: `rotate(${startAngle}deg)` }">
    <defs>
      <gradient v-if="isColorGradient" :color="color" type="progress" :id="_uid" />
      <gradient v-if="isColorFillGradient" :color="colorFill" type="progress-fill" :id="_uid" />
      <gradient v-if="isEmptyColorGradient" :color="emptyColor" type="empty" :id="_uid" />
      <gradient v-if="isEmptyColorFillGradient" :color="emptyColorFill" type="empty-fill" :id="_uid" />
    </defs>
    <component :is="circleType" v-bind="$props" :id="_uid" />
  </g>
</template>

<script>
import Gradient from "../Gradient.vue";
import HalfCircleProgress from "./HalfCircleProgress.vue";
import CircleProgress from "./CircleProgress.vue";
import { isValidNumber } from "../../utils";
import { simplifiedProps } from "../interface";

export default {
  name: "EpCircleContainer",
  components: { CircleProgress, HalfCircleProgress, Gradient },
  props: {
    ...simplifiedProps,
    index: {
      type: Number,
      required: true
    },
    multiple: {
      type: Boolean,
      required: true
    },
    globalThickness: {
      type: [Number, String],
      required: false,
      default: "5%"
    },
    globalGap: {
      type: Number,
      required: false
    }
  },
  computed: {
    circleType() {
      return this.half ? "half-circle-progress" : "circle-progress";
    },
    startAngle() {
      return isValidNumber(this.angle) ? this.angle : -90;
    },
    isColorGradient() {
      return Array.isArray(this.color.colors);
    },
    isColorFillGradient() {
      return Array.isArray(this.colorFill.colors);
    },
    isEmptyColorGradient() {
      return Array.isArray(this.emptyColor.colors);
    },
    isEmptyColorFillGradient() {
      return Array.isArray(this.emptyColorFill.colors);
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
