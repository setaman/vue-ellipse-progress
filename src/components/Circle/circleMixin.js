import { emptyRadius, radius } from "@/components/Circle/radiusCalculation";
import { isValidNumber } from "../../utils";

const wait = (ms = 400) => new Promise((resolve) => setTimeout(() => resolve(), ms));

export default {
  name: "CircleMixin",
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isInitialized: false,
  }),
  computed: {
    computedProgress() {
      return parseFloat(this.options.progress || 0);
    },

    progressOffset() {
      const offset = this.circumference - (this.computedProgress / 100) * this.circumference;
      if (Math.abs(this.circumference - offset) < 1) return this.circumference - 0.5;
      return offset;
    },

    lineMode() {
      return this.options.lineMode;
    },

    radius() {
      return radius(this.options);
    },
    fillRadius() {
      const { offset, position } = this.options.linePosition;
      if (position === "center") {
        return this.radius;
      }
      return position === "out" ? this.radius - offset - this.thickness / 2 : this.radius + this.thickness / 2;
    },
    emptyRadius() {
      return emptyRadius(this.options);
    },

    dataIsAvailable() {
      return isValidNumber(this.computedProgress) && !this.options.noData;
    },

    animationClass() {
      return [
        `animation__${
          !this.options.loading && this.dataIsAvailable && this.isInitialized ? this.animation.type : "none"
        }`,
      ];
    },
    animation() {
      return this.options.animation;
    },
    animationDuration() {
      return `${this.animation.duration}ms`;
    },

    computedColor() {
      return Array.isArray(this.options.color.colors)
        ? `url(#ep-progress-gradient-${this.options.id})`
        : this.options.color;
    },
    computedEmptyColor() {
      return Array.isArray(this.options.emptyColor.colors)
        ? `url(#ep-empty-gradient-${this.options.id})`
        : this.options.emptyColor;
    },
    computedColorFill() {
      return Array.isArray(this.options.colorFill.colors)
        ? `url(#ep-progress-fill-gradient-${this.options.id})`
        : this.options.colorFill;
    },
    computedEmptyColorFill() {
      return Array.isArray(this.options.emptyColorFill.colors)
        ? `url(#ep-empty-fill-gradient-${this.options.id})`
        : this.options.emptyColorFill;
    },

    thickness() {
      return this.options.thickness;
    },

    globalThickness() {
      return this.options.globalThickness;
    },
    emptyThickness() {
      return this.options.emptyThickness;
    },

    angle() {
      return isValidNumber(this.options.angle) ? this.options.angle : -90;
    },

    transformOrigin() {
      return "50% 50%";
    },

    dash() {
      return this.options.dot;
    },
    emptyDasharray() {
      if (!this.dash.count || !this.dash.spacing) {
        return this.dash;
      }
      return `${2 * Math.PI * this.emptyRadius * this.getDashPercent()},
              ${2 * Math.PI * this.emptyRadius * this.getDashSpacingPercent()}`.trim();
    },

    strokeDashOffset() {
      return this.dataIsAvailable && !this.options.loading && this.isInitialized
        ? this.progressOffset
        : this.circumference;
    },

    gap() {
      return this.options.gap;
    },

    globalGap() {
      return this.options.globalGap;
    },

    dotSize() {
      return this.options.dot.size;
    },
    dotColor() {
      return this.options.dot.color;
    },
    globalDotSize() {
      return this.globalDot.size;
    },

    styles() {
      return {
        transition: `${this.animationDuration}, opacity 0.3s`,
        strokeDashoffset: this.strokeDashOffset,
        transitionTimingFunction: "ease-in-out",
        transformOrigin: this.transformOrigin,
        opacity: this.options.loading || !this.dataIsAvailable ? 0 : 1,
        "--ep-circumference": this.circumference,
        "--ep-negative-circumference": this.getNegativeCircumference(),
        "--ep-double-circumference": this.getDoubleCircumference(),
        "--ep-stroke-offset": this.progressOffset,
        "--ep-loop-stroke-offset": this.getLoopOffset(),
        "--ep-bounce-out-stroke-offset": this.getBounceOutOffset(),
        "--ep-bounce-in-stroke-offset": this.getBounceInOffset(),
        "--ep-reverse-stroke-offset": this.getReverseOffset(),
        "--ep-loading-stroke-offset": this.circumference * 0.2,
        "animation-duration": this.animationDuration,
      };
    },

    isLoading() {
      return (this.options.determinate || this.options.loading) && this.dataIsAvailable;
    },
  },
  methods: {
    getDashSpacingPercent() {
      return this.dash.spacing / this.dash.count;
    },
    getDashPercent() {
      return (1 - this.dash.spacing) / this.dash.count;
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
  },
  async mounted() {
    if (!this.options.loading) {
      // await initial delay before applying animations
      await wait(this.animation.delay);
    }
    this.isInitialized = true;
  },
};
