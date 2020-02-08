<template>
  <g class="ep-half-circle--container">
    <path
      :stroke-width="emptyThickness"
      :fill="emptyColorFill"
      :stroke="emptyColor"
      class="ep-circle--empty"
      :d="emptyPath"
      :stroke-linecap="options.line"
      :stroke-dasharray="emptyDasharray"
      :style="{ transition: animationDuration }"
      :class="{ 'ep-circle--nodata': !dataIsAvailable }"
    >
    </path>
    <fade-in-transition>
      <g v-if="showDeterminate">
        <g style="opacity: 0.6;">
          <path
            :stroke-width="thickness"
            class="ep-half-circle--determinate animation__loading"
            :d="path"
            :fill="colorFill"
            :stroke="color"
            :stroke-dasharray="circumference"
            :stroke-linecap="options.line"
            :style="styles"
          >
          </path>
        </g>
      </g>
    </fade-in-transition>

    <path
      :stroke-width="thickness"
      class="ep-half-circle ep-circle--progress"
      :class="animationClass"
      :d="path"
      :fill="colorFill"
      :stroke="color"
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
    progressOffset() {
      const offset = this.circumference - (this.progress / 100) * this.circumference;
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
      return ` M ${this.emptyPosition}, ${this.size / 2} a ${this.emptyRadius},${this.emptyRadius} 0 1,1 ${this
        .emptyRadius * 2},0`;
    },
    position() {
      return this.size / 2 - this.radius;
    },
    emptyPosition() {
      return this.size / 2 - this.emptyRadius;
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@import "~@/styles/animations.scss";
@import "~@/styles/animationsUsage.scss";
</style>
