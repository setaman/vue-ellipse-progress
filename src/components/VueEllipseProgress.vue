<template>
  <div
    class="ep-container"
    :style="{
      maxWidth: `${size}px`,
      maxHeight: `${size}px`,
      transition: `${animation.duration}ms ease-in-out`
    }"
  >
    <div class="ep-content">
      <svg class="ep-svg-container" :height="size" :width="size" xmlns="http://www.w3.org/2000/svg">
        <ep-circle-container
          v-for="(options, i) in circlesData"
          :key="i"
          v-bind="options"
          :multiple="isMultiple"
          :index="i"
        />
      </svg>

      <div class="ep-legend--container" :style="{ maxWidth: `${size}px` }">
        <span
          v-if="legend && !isMultiple"
          class="ep-legend--value"
          :class="[legendClass, { 'ep-hidden': shouldHideLegendValue }]"
          :style="{ fontSize: fontSize, color: fontColor }"
        >
          <CountUp ref="count" :endVal="legendVal" :delay="animation.delay" :options="counterOptions"></CountUp>
          <slot name="legend-value"></slot>
        </span>
        <slot name="legend-caption"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import CountUp from "vue-countup-v2";
import { getValueIfDefined, isValidNumber } from "../utils";
import EpCircleContainer from "./Circle/EpCircleContainer.vue";

export default {
  name: "VueEllipseProgressContainer",
  components: { EpCircleContainer, CountUp },
  data: () => ({}),
  props: {
    data: {
      type: Array,
      required: false,
      default: () => []
    },
    progress: {
      type: Number,
      require: true,
      validator: val => val >= 0 && val <= 100
    },
    legendValue: {
      type: Number,
      required: false
    },
    size: {
      type: Number,
      required: false,
      default: 200,
      validator: value => value >= 0
    },
    thickness: {
      type: [Number, String],
      required: false,
      default: "5%",
      validator: value => parseFloat(value) >= 0
    },
    emptyThickness: {
      type: [Number, String],
      required: false,
      default: "5%",
      validator: value => parseFloat(value) >= 0
    },
    line: {
      type: String,
      required: false,
      default: "round",
      validator: value => ["round", "butt", "square"].includes(value)
    },
    lineMode: {
      type: String,
      required: false,
      default: "normal",
      validator: value => ["normal", "out", "out-over", "in", "in-over", "top", "bottom"].includes(value.split(" ")[0])
    },
    color: {
      type: [String, Object],
      required: false,
      default: "#3f79ff",
      validator: value => {
        if (value && typeof value === "string") {
          return true;
        }
        if (typeof value === "object" && value.colors) {
          return value.colors.filter(config => config.color && config.offset).length > 0;
        }
        return false;
      }
    },
    emptyColor: {
      type: [String, Object],
      required: false,
      default: "#e6e9f0",
      validator: value => {
        if (value && typeof value === "string") {
          return true;
        }
        if (typeof value === "object" && value.colors) {
          return value.colors.filter(config => config.color && config.offset).length > 0;
        }
        return false;
      }
    },
    colorFill: {
      type: [String, Object],
      required: false,
      default: "transparent",
      validator: value => {
        if (value && typeof value === "string") {
          return true;
        }
        if (typeof value === "object" && value.colors) {
          return value.colors.filter(config => config.color && config.offset).length > 0;
        }
        return false;
      }
    },
    emptyColorFill: {
      type: [String, Object],
      required: false,
      default: "transparent",
      validator: value => {
        if (value && typeof value === "string") {
          return true;
        }
        if (typeof value === "object" && value.colors) {
          return value.colors.filter(config => config.color && config.offset).length > 0;
        }
        return false;
      }
    },
    fontSize: {
      type: String,
      required: false
    },
    fontColor: {
      type: String,
      required: false
    },
    animation: {
      type: String,
      required: false,
      default: "default 1000 400",
      validation: value => {
        const config = value.split(" ");
        const isValidType = ["default", "rs", "loop", "reverse", "bounce"].includes(config[0]);
        const isValidDuration = config[0] ? parseFloat(config[1]) > 0 : true;
        const isValidDelay = config[2] ? parseFloat(config[2]) > 0 : true;

        return isValidType && isValidDuration && isValidDelay;
      }
    },
    legend: {
      type: Boolean,
      required: false,
      default: true
    },
    legendClass: {
      type: String,
      required: false
    },
    angle: {
      type: [String, Number],
      required: false,
      default: -90
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    noData: {
      type: Boolean,
      required: false,
      default: false
    },
    dash: {
      type: String,
      required: false,
      default: "",
      validator: value => {
        if (value.startsWith("strict")) {
          const config = value.split(" ");
          return parseFloat(config[1]) >= 0 && parseFloat(config[2]) >= 0;
        }
        return true;
      }
    },
    half: {
      type: Boolean,
      required: false,
      default: false
    },
    gap: {
      type: Number,
      required: false,
      default: 0
    },
    determinate: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    startAngle() {
      return getValueIfDefined(this.angle) || -90;
    },
    legendVal() {
      if (this.loading || this.noData) {
        return 0;
      }
      const legendValue = getValueIfDefined(parseFloat(this.legendValue));
      const progressValue = getValueIfDefined(parseFloat(this.progress)) || 0;
      return isValidNumber(legendValue) ? legendValue : progressValue;
    },
    shouldHideLegendValue() {
      return !this.dataIsAvailable || this.loading || this.noData;
    },
    dataIsAvailable() {
      return isValidNumber(this.progress) && !this.noData;
    },
    countDecimals() {
      if (!this.dataIsAvailable || this.legendVal % 1 === 0) return 0;
      return this.legendVal.toString().split(".")[1].length;
    },
    counterOptions() {
      return {
        duration: (parseFloat(this.animation.split(" ")[1]) || 1000) / 1000,
        target: "span",
        decimalPlaces: this.countDecimals,
        decimal: "."
      };
    },
    isMultiple() {
      return this.data.length > 1;
    },
    circlesData() {
      if (this.isMultiple) {
        return this.data.map(data => ({
          ...this.$props,
          ...data,
          // TODO: why?
          emptyThickness: data.thickness || this.$props.thickness
        }));
      }
      return [this.$props];
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.ep-container {
  display: inline-block;
  overflow: hidden;
}

.ep-content {
  transition: inherit;
  max-width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.ep-legend--container {
  transition: inherit;
  position: absolute;
  text-align: center;
}
.ep-legend--value {
  transition: 0.3s;
  text-align: center;
  display: block;
  opacity: 1;
}
.ep-hidden {
  opacity: 0;
}
svg.ep-svg-container {
  transition: inherit;
  transform-origin: 50% 50%;
}
</style>
