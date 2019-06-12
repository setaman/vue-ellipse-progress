<template>
  <g class="ep-half-circle--container">
    <path
      style="stroke-linecap: round"
      fill="none"
      stroke="red"
      :stroke-width="emptyThickness"
      class="ep-half-circle--empty"
      :d="emptyPath"
    >
    </path>
    <path
      style="stroke-linecap: round"
      fill="none"
      stroke="#00fa9d"
      :stroke-width="thickness"
      class="ep-half-circle--progress"
      :d="path"
    >
    </path>
  </g>
</template>

<script>
export default {
  name: "HalfCircleProgress",
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
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
    progress() {
      return parseFloat(this.options.progress || 0);
    },
    thickness() {
      return this.calculateThickness(this.options.thickness.toString());
    },
    emptyThickness() {
      return this.calculateThickness(this.options.empty_thickness.toString());
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
    }
  }
};
</script>

<style scoped lang="scss"></style>
