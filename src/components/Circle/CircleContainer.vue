<template>
  <div class="ep-svg-container" :class="{ 'ep-reverse': options.reverse }">
    <svg class="ep-svg" :height="options.size" :width="options.size" xmlns="http://www.w3.org/2000/svg">
      <g class="ep-circle--container">
        <defs>
          <gradient v-if="isColorGradient" :color="options.color" type="progress" :id="options.id" />
          <gradient v-if="isColorFillGradient" :color="options.colorFill" type="progress-fill" :id="options.id" />
          <gradient v-if="isEmptyColorGradient" :color="options.emptyColor" type="empty" :id="options.id" />
          <gradient
            v-if="isEmptyColorFillGradient"
            :color="options.emptyColorFill"
            type="empty-fill"
            :id="options.id"
          />
        </defs>
        <component :is="circleType" :options="options" :id="options.id" />
      </g>
    </svg>
    <circle-dot v-if="options.dot" :options="options" :id="options.id" />
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
