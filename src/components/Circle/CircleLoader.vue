<template>
  <g class="ep-circle--loader__container" :style="{ opacity: `${options.loading ? 1 : 0.45}` }">
    <circle
      class="ep-circle--loader animation__loading"
      :r="radius"
      :cx="position"
      :cy="position"
      fill="transparent"
      :stroke="computedColor"
      :stroke-width="thickness"
      :stroke-linecap="options.line"
      :stroke-dasharray="circumference"
      :style="{
        transitionTimingFunction: styles.transitionTimingFunction,
        transformOrigin: styles.transformOrigin,
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
  },
};
</script>

<style scoped lang="scss"></style>
