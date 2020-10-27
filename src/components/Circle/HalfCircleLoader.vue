<template>
  <g :style="{ opacity: options.opacity }">
    <path
      :stroke-width="thickness"
      class="ep-half-circle--loader animation__loading"
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
</template>
<script>
import CircleMixin from "./circleMixin";

export default {
  name: "HalfCircleLoader",
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
