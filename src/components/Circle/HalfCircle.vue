<template>
  <g
    class="ep-half-circle"
    :style="{
      transitionDuration: styles.transitionDuration,
      transitionTimingFunction: styles.transitionTimingFunction,
      transform: `rotate(${angle}deg)`,
    }"
  >
    <path
      :stroke-width="emptyThickness"
      :fill="computedColorFill"
      :stroke="computedEmptyColor"
      class="ep-half-circle--empty"
      :d="emptyPath"
      :stroke-linecap="options.line"
      :stroke-dasharray="emptyDasharray"
      :style="{
        transitionDuration: animationDuration,
        transitionTimingFunction: styles.transitionTimingFunction,
      }"
      :class="{ 'ep-circle--nodata': !dataIsAvailable }"
    >
    </path>
    <fade-in-transition>
      <g v-if="isLoading">
        <g :style="{ opacity: `${options.loading ? 1 : 0.45}` }">
          <path
            :stroke-width="thickness"
            class="ep-half-circle--loading animation__loading"
            :d="path"
            :fill="computedColorFill"
            :stroke="computedColor"
            :stroke-dasharray="circumference"
            :stroke-linecap="options.line"
            :style="{
              transitionTimingFunction: styles.transitionTimingFunction,
              transformOrigin: styles.transformOrigin,
              '--ep-loading-stroke-offset': styles['--ep-loading-stroke-offset'],
              '--ep-circumference': styles['--ep-circumference'],
              '--ep-negative-circumference': styles['--ep-negative-circumference'],
            }"
          >
          </path>
        </g>
      </g>
    </fade-in-transition>

    <path
      :stroke-width="thickness"
      class="ep-half-circle--progress ep-circle--progress"
      :class="animationClass"
      :d="path"
      :fill="computedColorFill"
      :stroke="computedColor"
      :stroke-dasharray="circumference"
      :stroke-linecap="options.line"
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
    circumference() {
      return (this.radius * 2 * Math.PI) / 2;
    },
    path() {
      return ` M ${this.position}, ${this.options.size / 2} a ${this.radius},${this.radius} 0 1,1 ${this.radius * 2},0`;
    },
    emptyPath() {
      return ` M ${this.emptyPosition}, ${this.options.size / 2} a ${this.emptyRadius},${this.emptyRadius} 0 1,1 ${
        this.emptyRadius * 2
      },0`;
    },
    position() {
      return this.options.size / 2 - this.radius;
    },
    emptyPosition() {
      return this.options.size / 2 - this.emptyRadius;
    },
  },
};
</script>

<style scoped lang="scss">
g.ep-half-circle {
  transform-origin: 50% 50%;
}
</style>
