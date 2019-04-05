<template>
  <g class="ep-circle--container">
    <circle class="ep-circle--empty"
            :r="emptyRadius"
            :cx="getPosition()"
            :cy="getPosition()"
            :stroke="emptyColor"
            :fill="emptyColorFill"
            :style="{transition: animationDuration}"
            :stroke-width="getEmptyThickness()">
    </circle>
    <circle class="ep-circle--progress"
            :r="radius"
            :cx="getPosition()"
            :cy="getPosition()"
            :fill="colorFill"
            :stroke="color"
            :stroke-width="getThickness()"
            :stroke-linecap="options.line"
            :stroke-dasharray="getCircumference()"
            :style="{strokeDashoffset: progressOffset, transition: animationDuration}"
    >
    </circle>

  </g>
</template>

<script>
export default {
  name: 'CircleProgress',
  data: () => ({
    is_mounted: false,
  }),
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  computed: {
    progressOffset() {
      const circumference = this.getCircumference();
      if (!this.is_mounted) {
        return circumference;
      }
      const offset = circumference - this.getProgress() / 100 * circumference;
      if (offset <= 0) {
        return 0;
      }
      return offset < circumference ? offset : circumference + 0.5;
    },
    animationDuration() {
      return `${this.options.animation.duration}ms`;
    },
    /* Colors */
    color() {
      if (this.options.color.gradient && this.options.color.gradient.colors.length > 0) {
        return `url(#ep-progress-gradient-${this.options.id})`;
      }
      return this.options.color;
    },
    emptyColor() {
      if (this.options.empty_color.gradient && this.options.empty_color.gradient.colors.length > 0) {
        return `url(#ep-empty-gradient-${this.options.id})`;
      }
      return this.options.empty_color;
    },
    colorFill() {
      if (this.options.color_fill.gradient && this.options.color_fill.gradient.colors.length > 0) {
        return `url(#ep-progress-fill-gradient-${this.options.id})`;
      }
      return this.options.color_fill || 'transparent';
    },
    emptyColorFill() {
      if (this.options.empty_color_fill.gradient && this.options.empty_color_fill.gradient.colors.length > 0) {
        return `url(#ep-empty-fill-gradient-${this.options.id})`;
      }
      return this.options.empty_color_fill || 'transparent';
    },
    /* Radius depending on line mode */
    radius() {
      const offset = Number(this.options.line_mode.offset || 0);

      switch (this.options.line_mode.mode) {
        case 'normal':
          return this.getNormalRadius();
        case 'in':
          return this.getBaseRadius() - (this.getEmptyThickness() + offset);
        case 'in_overlap':
          return this.getBaseRadius();
        case 'bottom':
          return this.emptyRadius - (this.getEmptyThickness() / 2);
        case 'top':
          return this.emptyRadius + (this.getEmptyThickness() / 2);
        default:
          return this.getBaseRadius();
      }
    },
    emptyRadius() {
      const offset = Number(this.options.line_mode.offset || 0);

      switch (this.options.line_mode.mode) {
        case 'normal':
          return this.getNormalRadius();
        case 'out':
          return this.getBaseRadius() - ((this.getThickness() / 2) + (this.getEmptyThickness() / 2) + offset);
        case 'out_overlap':
          return this.getBaseRadius() - ((this.getThickness() / 2) - (this.getEmptyThickness() / 2));
        case 'bottom':
          if (this.getEmptyThickness() < (this.getThickness() / 2)) {
            return this.getEmptyBaseRadius() - (this.getThickness() / 2 - this.getEmptyThickness());
          }
          return this.getEmptyBaseRadius();
        case 'top':
          return this.getEmptyBaseRadius() - (this.getThickness() / 2);
        default:
          return this.getEmptyBaseRadius();
      }
    },
  },
  methods: {
    getBaseRadius() {
      return (this.getSize() / 2) - (this.getThickness() / 2);
    },
    getEmptyBaseRadius() {
      return (this.getSize() / 2) - (this.getEmptyThickness() / 2);
    },
    getNormalRadius() {
      if (this.getThickness() < this.getEmptyThickness()) {
        return this.getEmptyBaseRadius();
      }
      return this.getBaseRadius();
    },
    getSize() {
      return this.options.size;
    },
    getProgress() {
      return parseFloat(this.options.progress);
    },
    getThickness() {
      return this.options.thickness;
    },
    getEmptyThickness() {
      return this.options.empty_thickness;
    },
    getPosition() {
      return this.getSize() / 2;
    },
    getCircumference() {
      return this.radius * 2 * Math.PI;
    },
  },
  mounted() {
    //setTimeout(() => this.is_mounted = true, this.options.animation.duration);
  },
};
</script>

<style scoped lang="scss">
  @import "~@/animations.scss";

  .ep-circle--empty, .ep-circle--progress {
    --ep-stroke-offset: 500;
    --ep-circumference: 1200;
  }

  .ep-circle--progress {
    &.animation__normal {
      animation: ep-progress--init__normal 2s ease-in-out forwards;
    }
    &.animation__normal {
      animation: ep-progress--init__rs 2s ease-in-out forwards;
    }
  }

  @include ep-progress--init__normal(var(--ep-stroke-offset), var(--ep-circumference));
  @include ep-progress--init__rs(var(--ep-stroke-offset), var(--ep-circumference));
</style>
