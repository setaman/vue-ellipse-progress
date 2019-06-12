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
      return ` M ${this.position}, ${this.size / 2} a ${this.radius},${this.radius} 0 1,1 ${this.radius * 2},0`;
    },
    emptyPath() {
      return ` M ${this.position}, ${this.size / 2} a ${this.radius},${this.radius} 0 1,1 ${this.emptyRadius * 2},0`;
    },
    radius() {
      const offset = Number(this.options.line_mode.offset || 0);

      switch (this.options.line_mode.mode) {
        case "normal":
          return this.normalRadius;
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
          return this.normalRadius;
        case "out":
          return this.baseRadius - (this.thickness / 2 + this.emptyThickness / 2 + offset);
        case "out-overlap":
          return this.baseRadius - (this.thickness / 2 - this.emptyBaseRadius / 2);
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
    normalRadius() {
      if (this.thickness < this.emptyThickness) {
        return this.emptyBaseRadius;
      }
      return this.baseRadius;
    },
    position() {
      console.log(this.getThicknessOfBiggestCircle());
      return this.getThicknessOfBiggestCircle() / 2;
    },
    emptyPosition() {
      return this.size - this.emptyRadius;
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
    getThicknessOfBiggestCircle() {
      // the biggest circle is that with the biggest radius
      if (this.getFullRadius() < this.getFullEmptyRadius()) {
        return this.emptyThickness;
      }
      return this.thickness;
    },
    getFullRadius() {
      return this.radius + this.thickness;
    },
    getFullEmptyRadius() {
      return this.emptyRadius + this.emptyThickness;
    },
    calculateThickness(thickness) {
      const percent = parseFloat(thickness);
      switch (true) {
        case thickness.includes("%"):
          return (percent * this.size) / 100;
        case thickness.includes("rem"): // TODO: Is it worth to implement?
          return (percent * this.size) / 100;
        default:
          return percent;
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
