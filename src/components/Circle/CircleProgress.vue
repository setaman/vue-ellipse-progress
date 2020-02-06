<template>
  <g class="ep-circle--container">
    <circle
      class="ep-circle--empty"
      :r="emptyRadius"
      :cx="position"
      :cy="position"
      :stroke="emptyColor"
      :stroke-dasharray="emptyDasharray"
      :fill="emptyColorFill"
      :style="{ transition: animationDuration }"
      :class="{ 'ep_circle--nodata': !dataIsAvailable }"
      :stroke-width="emptyThickness"
    >
    </circle>
    <circle
      class="ep-circle--progress"
      :class="animationClass"
      :r="radius"
      :cx="position"
      :cy="position"
      :fill="colorFill"
      :stroke="color"
      :stroke-width="thickness"
      :stroke-linecap="options.line"
      :stroke-dasharray="circumference"
      :style="{
        strokeDashoffset: dataIsAvailable && !options.loading && isInitialized ? progressOffset : circumference,
        transition: animationDuration,
        'transform-origin': transformOrigin
      }"
    >
    </circle>
  </g>
</template>

<script>
import CircleMixin from "./circleMixin";

export default {
  name: "CircleProgress",
  mixins: [CircleMixin],
  computed: {
    // only component specific props here, another props comes from the circleMixin
    progressOffset() {
      const offset = this.circumference - (this.progress / 100) * this.circumference;
      if (offset <= 0) {
        return 0;
      }
      return offset < this.circumference ? offset : this.circumference - 0.5;
    },
    position() {
      return this.size / 2;
    },
    circumference() {
      return this.radius * 2 * Math.PI;
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@import "~@/styles/animations.scss";
@import "~@/styles/animationsUsage.scss";
</style>
