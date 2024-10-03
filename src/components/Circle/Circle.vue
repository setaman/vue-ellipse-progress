<template>
  <g
    class="ep-circle"
    :style="{
      transitionDuration: styles.transitionDuration,
      transitionTimingFunction: styles.transitionTimingFunction,
      transform: `rotate(${angle}deg)`,
    }"
  >
    <circle
      v-if="options.emptyColorFill !== 'transparent'"
      class="ep-circle--empty__fill"
      :r="emptyFillRadius"
      :cx="position"
      :cy="position"
      :fill="emptyColorFill"
      :class="{ 'ep-circle--nodata': !dataIsAvailable }"
      :style="{
        transitionDuration: animationDuration,
        transitionTimingFunction: styles.transitionTimingFunction,
      }"
    >
    </circle>
    <circle
      class="ep-circle--empty"
      :r="emptyRadius"
      :cx="position"
      :cy="position"
      :stroke="emptyColor"
      :stroke-dasharray="emptyDasharray"
      fill="transparent"
      :class="{ 'ep-circle--nodata': !dataIsAvailable }"
      :style="{
        transitionDuration: animationDuration,
        transitionTimingFunction: styles.transitionTimingFunction,
      }"
      :stroke-width="options.emptyThickness"
    >
    </circle>
    <circle
      v-if="options.colorFill !== 'transparent'"
      class="ep-circle--progress__fill"
      :r="fillRadius"
      :cx="position"
      :cy="position"
      :fill="colorFill"
      :class="{ 'ep-circle--nodata': !dataIsAvailable }"
      :style="{ transition: styles.transition }"
    >
    </circle>
    <fade-in-transition>
      <g v-if="isLoading">
        <circle-loader :options="{ ...options, ...options.loader }" />
      </g>
    </fade-in-transition>
    <slot name="circle-progress" :attrs="slotAttrs">
      <circle
        ref="circleProgress"
        class="ep-circle--progress"
        :class="animationClass"
        :r="radius"
        :cx="position"
        :cy="position"
        fill="transparent"
        :stroke="color"
        :stroke-width="options.thickness"
        :stroke-linecap="options.line"
        :stroke-dasharray="circumference"
        :style="styles"
      >
      </circle>
    </slot>
  </g>
</template>

<script>
import CircleMixin from "./circleMixin";
import FadeInTransition from "../FadeInTransition.vue";
import CircleLoader from "./CircleLoader.vue";

export default {
  name: "CircleProgress",
  components: { CircleLoader, FadeInTransition },
  mixins: [CircleMixin],
  computed: {
    position() {
      return this.options.size / 2;
    },
    circumference() {
      return this.radius * 2 * Math.PI;
    },
    slotAttrs() {
      return {
        ...this.options,
        // progress circle
        position: this.position,
        radius: this.radius,
        circumference: this.circumference,
        strokeDashOffset: this.strokeDashOffset,
        class: "ep-circle--progress",
        animationClass: this.animationClass,
        // empty circle
        emptyDasharray: this.emptyDasharray,
        emptyColor: this.emptyColor,
        emptyRadius: this.emptyRadius,
        calculateProgressOffset: this.calculateProgressOffset,
        // all circle styles
        styles: this.styles,
        // base styles applicable to all paths
        baseStyles: {
          transition: this.styles.transition,
          transitionTimingFunction: this.styles.transitionTimingFunction,
          opacity: this.styles.opacity,
          "animation-duration": this.styles.animationDuration,
          transformOrigin: this.styles.transformOrigin,
        },
      };
    },
  },
};
</script>

<style scoped lang="scss">
.ep-circle {
  transform-origin: 50% 50%;
}
</style>
