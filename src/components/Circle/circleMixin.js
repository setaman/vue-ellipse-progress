import { isValidNumber } from "../../utils";
import { animationParser, dashParser, lineModeParser } from "../optionsParser";

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
      isInitialized: false
    };
  },
  computed: {
    progress() {
      return parseFloat(this.options.progress || 0);
    },
    /* Radius Calculation */
    radius() {
      const { offset } = this.parsedLineMode;

      if (this.multiple) {
        return this.normalLineModeRadius - this.previousCirclesThickness;
      }

      switch (this.parsedLineMode.mode) {
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
      const { offset } = this.parsedLineMode;

      if (this.multiple) {
        return this.normalLineModeRadius - this.previousCirclesThickness;
      }

      switch (this.parsedLineMode.mode) {
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
    parsedLineMode() {
      return lineModeParser(this.options.lineMode);
    },
    parsedAnimation() {
      return animationParser(this.options.animation);
    },
    parsedDash() {
      return dashParser(this.options.dash);
    },
    dataIsAvailable() {
      return isValidNumber(this.options.progress) && !this.options.noData;
    },
    animationClass() {
      return [
        `animation__${
          !this.options.loading && this.dataIsAvailable && this.isInitialized ? this.parsedAnimation.type : "none"
        }`,
        `${this.options.loading ? "animation__loading" : ""}`
      ];
    },
    /* Colors */
    color() {
      if (this.options.color.colors) {
        return `url(#ep-progress-gradient-${this.id})`;
      }
      return this.options.color;
    },
    emptyColor() {
      if (this.options.emptyColor.colors) {
        return `url(#ep-empty-gradient-${this.id})`;
      }
      return this.options.emptyColor;
    },
    colorFill() {
      if (this.options.colorFill.colors) {
        return `url(#ep-progress-fill-gradient-${this.id})`;
      }
      return this.options.colorFill || "transparent";
    },
    emptyColorFill() {
      if (this.options.emptyColorFill.colors) {
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
      return `${this.parsedAnimation.duration}ms`;
    },
    transformOrigin() {
      return "50% 50%";
    },
    emptyDasharray() {
      if (!this.parsedDash.count || !this.parsedDash.spacing) {
        return this.parsedDash;
      }
      return `${2 * Math.PI * this.emptyRadius * this.getDashPercent()},
              ${2 * Math.PI * this.emptyRadius * this.getDashSpacingPercent()}`.trim();
    },
    strokeDashOffset() {
      return this.dataIsAvailable && !this.options.loading && this.isInitialized
        ? this.progressOffset
        : this.circumference;
    },
    previousCirclesThickness() {
      if (this.index === 0) return 0;
      return this.options.data
        .filter((data, i) => i < this.index)
        .map(data => (data.thickness || this.thickness) + (data.gap || this.options.gap))
        .reduce((acc, current) => acc + current);
    },
    styles() {
      return {
        strokeDashoffset: this.strokeDashOffset,
        transition: this.animationDuration,
        transformOrigin: this.transformOrigin,
        "--ep-circumference": this.circumference,
        "--ep-negative-circumference": this.getNegativeCircumference(),
        "--ep-double-circumference": this.getDoubleCircumference(),
        "--ep-stroke-offset": this.progressOffset,
        "--ep-loop-stroke-offset": this.getLoopOffset(),
        "--ep-bounce-out-stroke-offset": this.getBounceOutOffset(),
        "--ep-bounce-in-stroke-offset": this.getBounceInOffset(),
        "--ep-reverse-stroke-offset": this.getReverseOffset(),
        "--ep-loading-stroke-offset": this.circumference * 0.2,
        "animation-duration": this.animationDuration
      };
    },
    showDeterminate() {
      return this.options.determinate && !this.options.loading && this.dataIsAvailable;
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
      return this.parsedDash.spacing / this.parsedDash.count;
    },
    getDashPercent() {
      return (1 - this.parsedDash.spacing) / this.parsedDash.count;
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
    }
  },
  async mounted() {
    if (!this.options.loading) {
      // await initial delay before applying animations and other props
      await wait(this.parsedAnimation.delay);
    }
    this.isInitialized = true;
  }
};
