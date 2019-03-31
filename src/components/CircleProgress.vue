<template>
  <!--<circle class="ep-circle&#45;&#45;empty">
  </circle>-->
  <circle class="ep-circle--progress"
    :r="getBaseRadius()"
          :cx="getPosition()"
          :cy="getPosition()"
          :stroke="color"
          :stroke-width="getThickness()"
          :stroke-dasharray="getCircumference()"
          :style="{strokeDashoffset: progressOffset}"
  >
  </circle>
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
    getPosition() {
      return this.getSize() / 2;
    },
    getCircumference() {
      return this.getBaseRadius() * 2 * Math.PI;
    },
  },
};
</script>

<style scoped>

</style>
