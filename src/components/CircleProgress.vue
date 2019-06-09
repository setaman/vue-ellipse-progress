<template>
  <g class="ep-circle--container">
    <circle class="ep-circle--empty"
      :r="emptyRadius"
      :cx="getPosition()"
      :cy="getPosition()"
      :stroke="emptyColor"
      :stroke-dasharray="emptyDasharray"
      :fill="emptyColorFill"
      :style="{transition: animationDuration}"
      :class="{'ep_circle--nodata': options.noData}"
      :stroke-width="getEmptyThickness()">
    </circle>
    <circle
      class="ep-circle--progress"
      :class="animationClass"
      :r="radius"
      :cx="getPosition()"
      :cy="getPosition()"
      :fill="colorFill"
      :stroke="color"
      :stroke-width="getThickness()"
      :stroke-linecap="options.line"
      :stroke-dasharray="getCircumference()"
      :style="{strokeDashoffset: (dataIsAvailable && is_initialized && !options.loading) ? progressOffset
              : getCircumference(),
              transition: animationDuration,
              'animation-delay': `${delay}ms`,
              'transform-origin': transformOrigin}"
    >
    </circle>
  </g>
</template>

<script>
const wait = (ms = 400) => new Promise(resolve => setTimeout(() => resolve(), ms));
export default {
  name: 'CircleProgress',
  data() {
    return {
      is_initialized: false,
      delay: this.options.animation.delay || 400,
      loading: this.options.loading,
      circle: null,
    };
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  watch: {
    options: {
      handler() {
        this.setProperties();
      },
      deep: true,
    },
  },
  computed: {
    progressOffset() {
      const circumference = this.getCircumference();
      const offset = circumference - this.getProgress() / 100 * circumference;
      if (offset <= 0) {
        return 0;
      }
      return offset < circumference ? offset : circumference + 0.5;
    },
    animationDuration() {
      return `${this.options.animation.duration || 1000}ms`;
    },
    transformOrigin() {
      return '50% 50%';
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
    dataIsAvailable() {
      return this.options.noData ? false : !Number.isNaN(parseFloat(this.options.progress));
    },
    animationClass() {
      return [`animation__${!this.options.loading && this.dataIsAvailable ? this.options.animation.type || 'default' : 'none'}`,
        `${this.options.loading ? 'animation__loading' : ''}`];
    },
    emptyDasharray() {
      if (!this.options.dash.count || !this.options.dash.spacing) {
        return this.options.dash;
      }
      return `${2 * Math.PI * this.emptyRadius * this.getDashPercent()},
              ${2 * Math.PI * this.emptyRadius * this.getDashSpacingPercent()}`.trim();
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
      return parseFloat(this.options.progress || 0);
    },
    getThickness() {
      return this.calculateThickness(this.options.thickness.toString());
    },
    getEmptyThickness() {
      return this.calculateThickness(this.options.empty_thickness.toString());
    },
    calculateThickness(thickness) {
      const percent = parseFloat(thickness);
      switch (true) {
        case thickness.includes('%'):
          return percent * this.options.size / 100;
        case thickness.includes('rem'): // TODO: Is it worth to implement?
          return percent * this.options.size / 100;
        default:
          return percent;
      }
    },
    getPosition() {
      return this.getSize() / 2;
    },
    getCircumference() {
      return this.radius * 2 * Math.PI;
    },
    getDashSpacingPercent() {
      return this.options.dash.spacing / this.options.dash.count;
    },
    getDashPercent() {
      return (1 - this.options.dash.spacing) / this.options.dash.count;
    },
    /* Animations helper Methods */
    getNegativeCircumference() {
      return this.getCircumference() * -1;
    },
    getDoubleCircumference() {
      return this.getCircumference() * 2;
    },
    getLoopOffset() {
      return this.getNegativeCircumference() - (this.getCircumference() - this.progressOffset);
    },
    getReverseOffset() {
      return this.getDoubleCircumference() + this.progressOffset;
    },
    getBounceOutOffset() {
      return (this.progressOffset < 100) ? 0 : this.progressOffset - 100;
    },
    getBounceInOffset() {
      return (this.getCircumference() - this.progressOffset < 100) ? this.progressOffset
        : this.progressOffset + 100;
    },
    async setAnimationDelay() {
      if (this.loading) {
        this.delay = 0;
        return;
      }
      await wait(this.delay + (this.options.animation.duration || 1000));
      this.delay = 0;
    },
    setProperties() {
      this.circle.style.setProperty('--ep-circumference', this.getCircumference());
      this.circle.style.setProperty('--ep-negative-circumference', this.getNegativeCircumference());
      this.circle.style.setProperty('--ep-double-circumference', this.getDoubleCircumference());
      this.circle.style.setProperty('--ep-stroke-offset', this.progressOffset);
      this.circle.style.setProperty('--ep-loop-stroke-offset', this.getLoopOffset());
      this.circle.style.setProperty('--ep-bounce-out-stroke-offset', this.getBounceOutOffset());
      this.circle.style.setProperty('--ep-bounce-in-stroke-offset', this.getBounceInOffset());
      this.circle.style.setProperty('--ep-reverse-stroke-offset', this.getReverseOffset());
      this.circle.style.setProperty('--ep-loading-stroke-offset', this.getCircumference() * 0.2);
      this.circle.style.setProperty('animation-duration', this.animationDuration);
    },
  },
  mounted() {
    this.setAnimationDelay();
    if (this.loading) {
      this.is_initialized = true;
    } else {
      setTimeout(() => { this.is_initialized = true; }, this.options.animation.delay + 100 || 400);
    }
    this.circle = this.$el.getElementsByClassName('ep-circle--progress')[0];
    this.setProperties();
  },
};
</script>

<style scoped lang="scss">
  @import "~@/animations.scss";

  .ep-circle--progress {
    //transform-origin: 50% 50%;
    &.animation__default {
      animation-timing-function: ease-in-out;
      animation-name: ep-progress--init__default;
    }
    &.animation__rs {
      animation-timing-function: ease-out;
      animation-name: ep-progress--init__rs;
    }
    &.animation__bounce {
      animation-timing-function: ease-out;
      animation-name: ep-progress--init__bounce;
    }
    &.animation__reverse {
      animation-timing-function: ease-out;
      animation-name: ep-progress--init__reverse;
    }
    &.animation__loop {
      animation-timing-function: ease-out;
      animation-name: ep-progress--init__loop;
    }
    &.animation__loading {
      animation-name: ep-progress--loading, ep-progress--loading__rotation;
      animation-iteration-count: infinite !important;
      animation-duration: 2s, 1s !important;
      animation-timing-function: ease-in-out, linear;
    }
  }
  .ep-circle--empty {
    &.ep_circle--nodata {
      opacity: 0.5;
    }
  }
  @include ep-progress--init__default(var(--ep-stroke-offset), var(--ep-circumference));
  @include ep-progress--init__rs(var(--ep-stroke-offset), var(--ep-circumference));
  @include ep-progress--init__bounce(var(--ep-stroke-offset), var(--ep-bounce-in-stroke-offset), var(--ep-bounce-out-stroke-offset), var(--ep-circumference));
  @include ep-progress--init__reverse(var(--ep-reverse-stroke-offset), var(--ep-circumference), var(--ep-double-circumference));
  @include ep-progress--init__loop(var(--ep-loop-stroke-offset), var(--ep-circumference), var(--ep-negative-circumference));
  @include ep-progress--loading(var(--ep-loading-stroke-offset), var(--ep-circumference));
  @include ep-progress--loading__rotation();
</style>
