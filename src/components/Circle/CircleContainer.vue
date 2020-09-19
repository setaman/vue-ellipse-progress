<template>
  <div class="ep-svg-container" :class="{ 'ep-reverse': reverse }">
    <svg class="ep-svg" :height="size" :width="size" xmlns="http://www.w3.org/2000/svg">
      <g class="ep-circle--container">
        <defs>
          <gradient v-if="isColorGradient" :color="color" type="progress" :id="_uid" />
          <gradient v-if="isColorFillGradient" :color="colorFill" type="progress-fill" :id="_uid" />
          <gradient v-if="isEmptyColorGradient" :color="emptyColor" type="empty" :id="_uid" />
          <gradient v-if="isEmptyColorFillGradient" :color="emptyColorFill" type="empty-fill" :id="_uid" />
        </defs>
        <component :is="circleType" v-bind="$props" :id="_uid" />
      </g>
    </svg>
    <circle-dot v-if="dot" v-bind="$props" :id="_uid" />
  </div>
</template>

<script>
import Gradient from "../Gradient.vue";
import HalfCircleProgress from "./HalfCircle.vue";
import CircleProgress from "./Circle.vue";
import { simplifiedProps } from "../interface";
import CircleDot from "./CircleDot.vue";

export default {
  name: "EpCircleContainer",
  components: { CircleDot, CircleProgress, HalfCircleProgress, Gradient },
  props: {
    ...simplifiedProps,
    index: {
      type: Number,
      required: true,
    },
    multiple: {
      type: Boolean,
      required: true,
    },
    globalThickness: {
      type: [Number, String],
      required: false,
      default: "5%",
    },
    globalGap: {
      type: Number,
      required: false,
    },
    globalDot: {
      type: [Number, String, Object],
      required: false,
    },
  },
  computed: {
    circleType() {
      return this.half ? "half-circle-progress" : "circle-progress";
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
    },
  },
};
</script>
<style lang="scss">
@import "~@/styles/animations.scss";
@import "~@/styles/animationsUsage.scss";
.ep-svg-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  &.ep-reverse {
    transform: scaleX(-1);
  }
}
g.ep-circle--container {
  transition: inherit;
  transform-origin: 50% 50%;
}
</style>
