<template>
  <g
    class="ep-half-circle--container"
    :style="{ transition: `${animationDuration}`, transform: `rotate(${computedAngle}deg)` }"
  >
    <path
      :stroke-width="computedEmptyThickness"
      :fill="computedColorFill"
      :stroke="computedEmptyColor"
      class="ep-circle--empty"
      :d="emptyPath"
      :stroke-linecap="line"
      :stroke-dasharray="emptyDasharray"
      :style="{ transition: animationDuration }"
      :class="{ 'ep-circle--nodata': !dataIsAvailable }"
    >
    </path>
    <fade-in-transition>
      <g v-if="showDeterminate">
        <g style="opacity: 0.6;">
          <path
            :stroke-width="computedThickness"
            class="ep-half-circle--determinate animation__loading"
            :d="path"
            :fill="computedColorFill"
            :stroke="computedColor"
            :stroke-dasharray="circumference"
            :stroke-linecap="line"
            :style="styles"
          >
          </path>
        </g>
      </g>
    </fade-in-transition>

    <path
      :stroke-width="computedThickness"
      class="ep-half-circle ep-circle--progress"
      :class="animationClass"
      :d="path"
      :fill="computedColorFill"
      :stroke="computedColor"
      :stroke-dasharray="circumference"
      :stroke-linecap="line"
      :style="styles"
    >
    </path>
  </g>
</template>
<script>
import CircleMixin from "./circleMixin";
import FadeInTransition from "../FadeInTransition.vue";

export default {
  name: "HalfCircleProgress",
  components: { FadeInTransition },
  mixins: [CircleMixin],
  computed: {
    progressOffset() {
      const offset = this.circumference - (this.computedProgress / 100) * this.circumference;
      if (offset <= 0) {
        return 1;
      }
      return offset < this.circumference ? offset : this.circumference - 0.5;
    },
    circumference() {
      return (this.radius * 2 * Math.PI) / 2;
    },
    path() {
      return ` M ${this.position}, ${this.size / 2} a ${this.radius},${this.radius} 0 1,1 ${this.radius * 2},0`;
    },
    emptyPath() {
      return ` M ${this.emptyPosition}, ${this.size / 2} a ${this.emptyRadius},${this.emptyRadius} 0 1,1 ${
        this.emptyRadius * 2
      },0`;
    },
    position() {
      return this.size / 2 - this.radius;
    },
    emptyPosition() {
      return this.size / 2 - this.emptyRadius;
    },
  },
};
</script>

<style scoped lang="scss">
.ep-half-circle--container {
  transform-origin: 50% 50%;
}
</style>
