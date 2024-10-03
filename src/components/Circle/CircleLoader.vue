<template>
  <g class="ep-circle--loader__container" :style="{ opacity: opacity }">
    <circle
      class="ep-circle--loader animation__loading"
      :r="radius"
      :cx="position"
      :cy="position"
      fill="transparent"
      :stroke="loaderColor"
      :stroke-width="options.thickness"
      :stroke-linecap="options.line"
      :stroke-dasharray="circumference"
      :style="{
        transition: 'all',
        transitionTimingFunction: styles.transitionTimingFunction,
        transitionDuration: `${styles['animation-duration']}ms`,
        transformOrigin: styles.transformOrigin,
        animationDuration: animationDurationStyle,
        '--ep-loading-stroke-offset': styles['--ep-loading-stroke-offset'],
        '--ep-circumference': styles['--ep-circumference'],
      }"
    >
    </circle>
  </g>
</template>

<script>
import CircleMixin from "./circleMixin";

export default {
  name: "CircleLoader",
  mixins: [CircleMixin],
  computed: {
    position() {
      return this.options.size / 2;
    },
    circumference() {
      return this.radius * 2 * Math.PI;
    },
    opacity() {
      return this.options.opacity && this.options.opacity >= 0 ? this.options.opacity : 0.55;
    },
    animationDuration() {
      return this.options.duration && this.options.duration >= 0 ? this.options.duration : 1000;
    },
    animationDurationStyle() {
      return `${this.animationDuration * 2}ms, ${this.animationDuration}ms`;
    },
    loaderColor() {
      return Array.isArray(this.options.loader.color.colors)
        ? `url(#ep-loader-gradient-${this.options.uid})`
        : this.options.color;
    },
  },
};
</script>

<style scoped lang="scss"></style>
