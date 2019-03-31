<template>
  <g>
    <circle class="ep-circle--empty"
            :r="getBaseRadius()"
            :cx="getPosition()"
            :cy="getPosition()"
            :stroke="emptyColor"
            :fill="emptyColorFill"
            :stroke-width="getEmptyThickness()">
    </circle>
    <circle class="ep-circle--progress"
            :r="getBaseRadius()"
            :cx="getPosition()"
            :cy="getPosition()"
            :fill="colorFill"
            :stroke="color"
            :stroke-width="getThickness()"
            :stroke-linecap="options.line"
            :stroke-dasharray="getCircumference()"
            :style="{strokeDashoffset: progressOffset}"
    >
    </circle>

  </g>
</template>

<script>
export default {
  name: 'CircleProgress',
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  computed: {
    progressOffset() {
      const circumference = this.getCircumference();
      const offset = circumference - this.getProgress() / 100 * circumference;
      if (offset <= 0) {
        return 0;
      }
      return offset < circumference ? offset : circumference + 1;
    },
    color() {
      if (this.options.color.gradient && this.options.color.gradient.colors.length > 0) {
        return `url(#ep-circle-progress-gradient-${this._uid})`;
      }
      return this.options.color;
    },
    emptyColor() {
      if (this.options.empty_color.gradient && this.options.empty_color.gradient.colors.length > 0) {
        return `url(#ep-circle-empty-gradient-${this._uid})`;
      }
      return this.options.empty_color;
    },
    colorFill() {
      if (this.options.color_fill.gradient && this.options.color_fill.gradient.colors.length > 0) {
        return `url(#circle-progress-fill-gradient-${this._uid})`;
      }
      return this.options.color_fill || 'transparent';
    },
    emptyColorFill() {
      if (this.options.empty_color_fill.gradient && this.options.empty_color_fill.gradient.colors.length > 0) {
        return `url(#circle-empty-fill-gradient-${this._uid})`;
      }
      return this.options.empty_color_fill || 'transparent';
    }
  },
  methods: {
    getBaseRadius() {
      return (this.getSize() / 2) - (this.getThickness() / 2);
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
      return this.getBaseRadius() * 2 * Math.PI;
    },
  },
};
</script>

<style scoped lang="scss">
  .ep-circle--empty, .ep-circle--progress {
    transition: 0.5s;
  }
</style>
