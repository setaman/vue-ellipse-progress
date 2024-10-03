<template>
  <g class="ep-half-circle--loader__container" :style="{ opacity: opacity }">
    <path
      :stroke-width="options.thickness"
      class="ep-half-circle--loader animation__loading"
      :d="path"
      fill="transparent"
      :stroke="halfLoaderColor"
      :stroke-dasharray="circumference"
      :stroke-linecap="options.line"
      :style="{
        transitionTimingFunction: styles.transitionTimingFunction,
        transitionDuration: `${styles['animation-duration']}ms`,
        transformOrigin: styles.transformOrigin,
        animationDuration: animationDurationStyle,
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
    position() {
      return this.options.size / 2 - this.radius;
    },
    opacity() {
      return this.options.opacity && this.options.opacity >= 0 ? this.options.opacity : 0.55;
    },
    animationDuration() {
      return this.options.duration && this.options.duration >= 0 ? this.options.duration : 1000;
    },
    animationDurationStyle() {
      return `${this.animationDuration}ms`;
    },
    halfLoaderColor() {
      return Array.isArray(this.options.loader.color.colors)
        ? `url(#ep-loader-gradient-${this.options.uid})`
        : this.options.color;
    },
  },
};
</script>

<style scoped lang="scss">
g.ep-half-circle {
  transform-origin: 50% 50%;
}
</style>
