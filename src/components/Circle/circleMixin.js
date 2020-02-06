import { isValidNumber } from "../../utils";

const wait = (ms = 400) => new Promise(resolve => setTimeout(() => resolve(), ms));

export default {
  name: "CircleMixin",
  props: {
    options: {
      type: Object,
      required: true
    },
    multiple: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: false
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isInitialized: false,
      delay: this.options.animation.delay,
      loading: this.options.loading,
      circle: null,
      gap: 0
    };
  },
  watch: {
    options: {
      handler() {
        this.setProperties();
      },
      deep: true
    }
  },
  computed: {
    progress() {
      return parseFloat(this.options.progress || 0);
    },
    /* Radius Calculation */
    radius() {
      const offset = Number(this.options.lineMode.offset || 0);

      if (this.multiple) {
        return this.normalLineModeRadius - this.previousCirclesThickness;
      }

      switch (this.options.lineMode.mode) {
        case "normal":
          return this.normalLineModeRadius;
        case "in":
          return this.baseRadius - (this.emptyThickness + offset);
        case "out-over":
          if (this.emptyThickness <= this.thickness) {
            return this.baseRadius;
          }
          return this.emptyRadius - this.emptyThickness / 2 + this.thickness / 2;
        case "bottom":
          return this.emptyRadius - this.emptyThickness / 2;
        case "top":
          return this.emptyRadius + this.emptyThickness / 2;
        default:
          return this.baseRadius;
      }
    },

    emptyRadius() {
      const offset = Number(this.options.lineMode.offset || 0);

      if (this.multiple) {
        return this.normalLineModeRadius - this.previousCirclesThickness;
      }

      switch (this.options.lineMode.mode) {
        case "normal":
          return this.normalLineModeRadius;
        case "out":
          return this.baseRadius - (this.thickness / 2 + this.emptyThickness / 2 + offset);
        case "out-over":
          if (this.emptyThickness <= this.thickness) {
            return this.baseRadius - this.thickness / 2 + this.emptyThickness / 2;
          }
          return this.emptyBaseRadius;
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

    // the radius of the progress circle without taking into account the lineMode, baseline for advanced radius
    // calculations depending on lineMode
    baseRadius() {
      return this.size / 2 - this.thickness / 2;
    },

    emptyBaseRadius() {
      return this.size / 2 - this.emptyThickness / 2;
    },

    // with lineMode.type = normal need to calculate which of the circles is bigger so the radius does not exceeds the
    // size property
    normalLineModeRadius() {
      if (this.thickness < this.emptyThickness) {
        return this.emptyBaseRadius;
      }
      return this.baseRadius;
    },
    dataIsAvailable() {
      return isValidNumber(this.options.progress) && !this.options.noData;
    },
    animationClass() {
      return [
        `animation__${
          !this.options.loading && this.dataIsAvailable && this.isInitialized
            ? this.options.animation.type || "default"
            : "none"
        }`,
        `${this.options.loading ? "animation__loading" : ""}`
      ];
    },
    /* Colors */
    color() {
      if (this.options.color.gradient && this.options.color.gradient.colors.length > 0) {
        return `url(#ep-progress-gradient-${this.id})`;
      }
      return this.options.color;
    },
    emptyColor() {
      if (this.options.emptyColor.gradient && this.options.emptyColor.gradient.colors.length > 0) {
        return `url(#ep-empty-gradient-${this.id})`;
      }
      return this.options.emptyColor;
    },
    colorFill() {
      if (this.options.colorFill.gradient && this.options.colorFill.gradient.colors.length > 0) {
        return `url(#ep-progress-fill-gradient-${this.id})`;
      }
      return this.options.colorFill || "transparent";
    },
    emptyColorFill() {
      if (this.options.emptyColorFill.gradient && this.options.emptyColorFill.gradient.colors.length > 0) {
        return `url(#ep-empty-fill-gradient-${this.id})`;
      }
      return this.options.emptyColorFill || "transparent";
    },
    size() {
      return this.options.size;
    },
    thickness() {
      return this.calculateThickness(this.options.thickness.toString());
    },
    emptyThickness() {
      return this.calculateThickness(this.options.emptyThickness.toString());
    },
    animationDuration() {
      return `${isValidNumber(this.options.animation.duration) ? this.options.animation.duration : 1000}ms`;
    },
    transformOrigin() {
      return "50% 50%";
    },
    emptyDasharray() {
      if (!this.options.dash.count || !this.options.dash.spacing) {
        return this.options.dash;
      }
      return `${2 * Math.PI * this.emptyRadius * this.getDashPercent()},
              ${2 * Math.PI * this.emptyRadius * this.getDashSpacingPercent()}`.trim();
    },
    previousCirclesThickness() {
      if (this.index === 0) return 0;
      return this.options.data
        .filter((data, i) => i < this.index)
        .map(data => (data.thickness || this.thickness) + (data.gap || this.options.gap))
        .reduce((acc, current) => acc + current);
    }
  },
  methods: {
    calculateThickness(thickness) {
      const percent = parseFloat(thickness);
      switch (true) {
        case thickness.includes("%"):
          return (percent * this.options.size) / 100;
        case thickness.includes("rem"): // TODO: Is it worth to implement?
          return (percent * this.options.size) / 100;
        default:
          return percent;
      }
    },
    getDashSpacingPercent() {
      return this.options.dash.spacing / this.options.dash.count;
    },
    getDashPercent() {
      return (1 - this.options.dash.spacing) / this.options.dash.count;
    },
    /* Animations helper Methods */
    getNegativeCircumference() {
      return this.circumference * -1;
    },
    getDoubleCircumference() {
      return this.circumference * 2;
    },
    getLoopOffset() {
      return this.getNegativeCircumference() - (this.circumference - this.progressOffset);
    },
    getReverseOffset() {
      return this.getDoubleCircumference() + this.progressOffset;
    },
    getBounceOutOffset() {
      return this.progressOffset < 100 ? 0 : this.progressOffset - 100;
    },
    getBounceInOffset() {
      return this.circumference - this.progressOffset < 100 ? this.progressOffset : this.progressOffset + 100;
    },
    setProperties() {
      this.circle.style.setProperty("--ep-circumference", this.circumference);
      this.circle.style.setProperty("--ep-negative-circumference", this.getNegativeCircumference());
      this.circle.style.setProperty("--ep-double-circumference", this.getDoubleCircumference());
      this.circle.style.setProperty("--ep-stroke-offset", this.progressOffset);
      this.circle.style.setProperty("--ep-loop-stroke-offset", this.getLoopOffset());
      this.circle.style.setProperty("--ep-bounce-out-stroke-offset", this.getBounceOutOffset());
      this.circle.style.setProperty("--ep-bounce-in-stroke-offset", this.getBounceInOffset());
      this.circle.style.setProperty("--ep-reverse-stroke-offset", this.getReverseOffset());
      this.circle.style.setProperty("--ep-loading-stroke-offset", this.circumference * 0.2);
      this.circle.style.setProperty("animation-duration", this.animationDuration);
    }
  },
  async mounted() {
    if (!this.options.loading) {
      // await initial delay before applying animations and other props
      await wait(this.delay);
    }
    this.circle = this.$el.getElementsByClassName("ep-circle--progress")[0];
    this.setProperties();
    this.isInitialized = true;
  }
};
