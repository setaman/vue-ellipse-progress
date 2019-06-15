<template>
  <g class="ep-half-circle--container">
    <path
      style="stroke-linecap: round"
      :stroke-width="emptyThickness"
      :fill="emptyColorFill"
      :stroke="emptyColor"
      class="ep-circle--empty"
      :d="emptyPath"
      :stroke-dasharray="emptyDasharray"
      :style="{ transition: animationDuration }"
      :class="{ 'ep-circle--nodata': options.noData }"
    >
    </path>
    <path
      style="stroke-linecap: round"
      :stroke-width="thickness"
      class="ep-half-circle ep-circle--progress"
      :class="animationClass"
      :d="path"
      :fill="colorFill"
      :stroke="color"
      :stroke-dasharray="circumference"
      :style="{
        strokeDashoffset:
          dataIsAvailable && isInitialized && !options.loading ? progressOffset : circumference,
        transition: animationDuration,
        'animation-delay': `${delay}ms`,
        'transform-origin': transformOrigin
      }"
    >
    </path>
  </g>
</template>
<script>
import CircleMixin from "@/components/circleMixin";

export default {
  name: "HalfCircleProgress",
  mixins: [CircleMixin],
  props: {
    options: {
      type: Object,
      required: true
    }
  },
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
    progress() {
      return parseFloat(this.options.progress || 0);
    },
    path() {
      return ` M ${this.position}, ${this.size / 2} a ${this.radius},${this.radius} 0 1,1 ${this
        .radius * 2},0`;
    },
    emptyPath() {
      return ` M ${this.emptyPosition}, ${this.size / 2} a ${this.emptyRadius},${
        this.emptyRadius
      } 0 1,1 ${this.emptyRadius * 2},0`;
    },
    position() {
      return this.size / 2 - this.radius;
    },
    emptyPosition() {
      return this.size / 2 - this.emptyRadius;
    }
  },
  methods: {
    calculateThickness(thickness) {
      const percent = parseFloat(thickness);
      switch (true) {
        case thickness.includes("%"):
          return (percent * this.size) / 100;
        default:
          return percent;
      }
    },
    getDashSpacingPercent() {
      return this.options.dash.spacing / this.options.dash.count;
    },
    getDashPercent() {
      return (1 - this.options.dash.spacing) / this.options.dash.count;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/styles/animations.scss";
@import "~@/styles/animationsUsage.scss";
</style>
