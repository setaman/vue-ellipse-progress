<template>
  <g class="ep-circle--container">
    <circle
      class="ep-circle--empty"
      :r="emptyRadius"
      :cx="position"
      :cy="position"
      :stroke="computedEmptyColor"
      :stroke-dasharray="emptyDasharray"
      :fill="computedEmptyColorFill"
      :style="{ transition: animationDuration }"
      :class="{ 'ep_circle--nodata': !dataIsAvailable }"
      :stroke-width="computedEmptyThickness"
    >
    </circle>
    <fade-in-transition>
      <g v-if="showDeterminate">
        <g style="opacity: 0.45;">
          <circle
            class="ep-circle--determinate animation__loading"
            :r="radius"
            :cx="position"
            :cy="position"
            fill="transparent"
            :stroke="computedColor"
            :stroke-width="computedThickness"
            :stroke-linecap="line"
            :stroke-dasharray="circumference"
            :style="styles"
          >
          </circle>
        </g>
      </g>
    </fade-in-transition>
    <circle
      class="ep-circle--progress"
      :class="animationClass"
      :r="radius"
      :cx="position"
      :cy="position"
      :fill="computedColorFill"
      :stroke="computedColor"
      :stroke-width="computedThickness"
      :stroke-linecap="line"
      :stroke-dasharray="circumference"
      :style="styles"
    >
    </circle>
    <circle-dot v-bind="$props" :radius="radius"/>
  </g>
</template>

<script>
import CircleMixin from "./circleMixin";
import FadeInTransition from "../FadeInTransition.vue";
import CircleDot from "./CircleDot.vue";

export default {
  name: "CircleProgress",
  components: { CircleDot, FadeInTransition },
  mixins: [CircleMixin],
  computed: {
    progressOffset() {
      const offset = this.circumference - (this.computedProgress / 100) * this.circumference;
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
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/styles/animations.scss";
@import "~@/styles/animationsUsage.scss";
</style>
