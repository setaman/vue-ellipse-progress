<template>
  <div class="ep-svg-container" :class="{ 'ep-reverse': options.reverse }">
    <svg class="ep-svg" :height="options.size" :width="options.size" xmlns="http://www.w3.org/2000/svg">
      <g class="ep-circle--container">
        <defs>
          <gradient v-if="isColorGradient" :color="options.color" type="progress" :uid="uid" />
          <gradient v-if="isColorFillGradient" :color="options.colorFill" type="progress-fill" :uid="uid" />
          <gradient v-if="isEmptyColorGradient" :color="options.emptyColor" type="empty" :uid="uid" />
          <gradient v-if="isEmptyColorFillGradient" :color="options.emptyColorFill" type="empty-fill" :uid="uid" />
          <gradient v-if="isLoaderColorGradient" :color="options.loader.color" type="loader" :uid="uid" />
        </defs>
        <component :is="circleType" :options="computedOptions" />
      </g>
    </svg>
    <circle-dot v-if="options.dot" :options="computedOptions" />
  </div>
</template>

<script>
import Gradient from "../Gradient.vue";
import HalfCircleProgress from "./HalfCircle.vue";
import CircleProgress from "./Circle.vue";
import CircleDot from "./CircleDot.vue";

export default {
  name: "CircleContainer",
  components: { CircleDot, CircleProgress, HalfCircleProgress, Gradient },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  computed: {
    computedOptions() {
      return {
        ...this.options,
        uid: this.uid,
      };
    },
    circleType() {
      return this.options.half ? "half-circle-progress" : "circle-progress";
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
    },
    isLoaderColorGradient() {
      return Array.isArray(this.options.loader.color.colors);
    },
    uid() {
      return this.$.uid;
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
