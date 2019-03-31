<template>
  <g>
    <circle class="ep-circle--empty"
            :r="emptyRadius"
            :cx="getPosition()"
            :cy="getPosition()"
            :stroke="emptyColor"
            :fill="emptyColorFill"
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
    /* Colors */
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
          return this.emptyRadius - (this.getEmptyThickness() / 2 + offset);
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
          return this.getBaseRadius() - ((this.getThickness() / 2) + (this.getEmptyThickness() / 2));
        case 'out_overlap':
          return this.getBaseRadius() - ((this.getThickness() / 2) - (this.getEmptyThickness() / 2));
        case 'bottom':
          if (this.getEmptyThickness() < (this.getThickness() / 2)) {
            return this.getEmptyBaseRadius() - (this.getThickness() / 2 - this.getEmptyThickness());
          }
          return this.getEmptyBaseRadius();
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
