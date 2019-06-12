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
      const { circumference } = this;
      const offset = circumference - (this.progress / 100) * circumference;
      if (offset <= 0) {
        return 1;
      }
      return offset < circumference ? offset : circumference + 1;
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
    radius() {
      const offset = Number(this.options.line_mode.offset || 0);

      switch (this.options.line_mode.mode) {
        case "normal":
          return this.normalLineModeRadius;
        case "in":
          return this.baseRadius - (this.emptyThickness + offset);
        case "in-overlap":
          return this.baseRadius;
        case "bottom":
          return this.emptyRadius - this.emptyThickness / 2;
        case "top":
          return this.emptyRadius + this.emptyThickness / 2;
        default:
          return this.baseRadius;
      }
    },

    emptyRadius() {
      const offset = Number(this.options.line_mode.offset || 0);

      switch (this.options.line_mode.mode) {
        case "normal":
          return this.normalLineModeRadius;
        case "out":
          return this.baseRadius - (this.thickness / 2 + this.emptyThickness / 2 + offset);
        case "out-overlap":
          return this.baseRadius - (this.thickness / 2 - this.emptyThickness / 2);
        case "bottom":
          if (this.emptyThickness < this.thickness / 2) {
            return this.emptyBaseRadius - (this.thickness / 2 - this.emptyThickness);
          }
          return this.emptyBaseRadius;
        case "top":
          return this.emptyBaseRadius - this.thickness / 2;
        default:
          return this.emptyBaseRadius;
      }
    },

    baseRadius() {
      return this.size / 2 - this.thickness / 2;
    },
    emptyBaseRadius() {
      return this.size / 2 - this.emptyThickness / 2;
    },
    normalLineModeRadius() {
      if (this.thickness < this.emptyThickness) {
        return this.emptyBaseRadius;
      }
      return this.baseRadius;
    },
    position() {
      return this.size / 2 - this.radius;
    },
    emptyPosition() {
      return this.size / 2 - this.emptyRadius;
    },
    size() {
      return this.options.size;
    },
    thickness() {
      return this.calculateThickness(this.options.thickness.toString());
    },
    emptyThickness() {
      return this.calculateThickness(this.options.empty_thickness.toString());
    },
    animationDuration() {
      return `${this.options.animation.duration || 1000}ms`;
    },
    transformOrigin() {
      return "50% 50%";
    },
    /* Colors */
    color() {
      if (this.options.color.gradient && this.options.color.gradient.colors.length > 0) {
        return `url(#ep-progress-gradient-${this.options.id})`;
      }
      return this.options.color;
    },
    emptyColor() {
      if (
        this.options.empty_color.gradient &&
        this.options.empty_color.gradient.colors.length > 0
      ) {
        return `url(#ep-empty-gradient-${this.options.id})`;
      }
      return this.options.empty_color;
    },
    colorFill() {
      if (this.options.color_fill.gradient && this.options.color_fill.gradient.colors.length > 0) {
        return `url(#ep-progress-fill-gradient-${this.options.id})`;
      }
      return this.options.color_fill || "transparent";
    },
    emptyColorFill() {
      if (
        this.options.empty_color_fill.gradient &&
        this.options.empty_color_fill.gradient.colors.length > 0
      ) {
        return `url(#ep-empty-fill-gradient-${this.options.id})`;
      }
      return this.options.empty_color_fill || "transparent";
    },
    emptyDasharray() {
      if (!this.options.dash.count || !this.options.dash.spacing) {
        return this.options.dash;
      }
      return `${2 * Math.PI * this.emptyRadius * this.getDashPercent()},
              ${2 * Math.PI * this.emptyRadius * this.getDashSpacingPercent()}`.trim();
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
