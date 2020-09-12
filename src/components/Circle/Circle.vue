<template>
  <g
    class="ep-circle"
    :style="{
      transitionDuration: styles.transitionDuration,
      transitionTimingFunction: styles.transitionTimingFunction,
      transform: `rotate(${computedAngle}deg)`,
    }"
  >
    <circle
      class="ep-circle--empty"
      :r="emptyRadius"
      :cx="position"
      :cy="position"
      :stroke="computedEmptyColor"
      :stroke-dasharray="emptyDasharray"
      :fill="computedEmptyColorFill"
      :class="{ 'ep-circle--nodata': !dataIsAvailable }"
      :style="{
        transitionDuration: styles.transitionDuration,
        transitionTimingFunction: styles.transitionTimingFunction,
      }"
      :stroke-width="computedEmptyThickness"
    >
    </circle>
    <fade-in-transition>
      <g v-if="showDeterminate">
        <g style="opacity: 1;">
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
  </g>
</template>

<script>
import CircleMixin from "./circleMixin";
import FadeInTransition from "../FadeInTransition.vue";

export default {
  name: "CircleProgress",
  components: { FadeInTransition },
  mixins: [CircleMixin],
  computed: {
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
.ep-circle {
  transform-origin: 50% 50%;
}
</style>
