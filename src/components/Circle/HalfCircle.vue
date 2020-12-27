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
      v-if="options.emptyColorFill !== 'transparent'"
      :fill="computedEmptyColorFill"
      :d="emptyFillPath"
      :style="{
        transition: styles.transition,
      }"
      :class="{ 'ep-circle--nodata': !dataIsAvailable }"
    >
    </path>
    <path
      :stroke-width="emptyThickness"
      fill="transparent"
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
    <path
      v-if="options.colorFill !== 'transparent'"
      class="ep-half-circle--progress__fill"
      :d="fillPath"
      :fill="computedColorFill"
      :style="{ transition: styles.transition }"
    >
    </path>
    <fade-in-transition>
      <g v-if="isLoading">
        <half-circle-loader :options="options.loader" />
      </g>
    </fade-in-transition>
    <path
      :stroke-width="thickness"
      class="ep-half-circle--progress ep-circle--progress"
      :class="animationClass"
      :d="path"
      fill="transparent"
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
import HalfCircleLoader from "./HalfCircleLoader.vue";

export default {
  name: "HalfCircleProgress",
  components: { HalfCircleLoader, FadeInTransition },
  mixins: [CircleMixin],
  computed: {
    circumference() {
      return (this.radius * 2 * Math.PI) / 2;
    },
    path() {
      return this.getPath(this.radius);
    },
    fillPath() {
      return this.getPath(this.fillRadius);
    },
    emptyPath() {
      return this.getPath(this.emptyRadius);
    },
    emptyFillPath() {
      return this.getPath(this.emptyFillRadius);
    },
  },
  methods: {
    getPosition(radius) {
      return this.options.size / 2 - radius;
    },
    getPath(radius) {
      return ` M ${this.getPosition(radius)}, ${this.options.size / 2} a ${radius},${radius} 0 1,1 ${radius * 2},0`;
    },
  },
};
</script>

<style scoped lang="scss">
g.ep-half-circle {
  transform-origin: 50% 50%;
}
</style>
