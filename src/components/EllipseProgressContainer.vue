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
      <svg
        class="ep-svg-container"
        :height="size"
        :width="size"
        xmlns="http://www.w3.org/2000/svg"
        :style="{ transform: `rotate(${startAngle}deg)` }"
      >
        <defs>
          <gradient v-if="color.gradient" :color="color" type="progress" :id="_uid" />
          <gradient v-if="colorFill.gradient" :color="colorFill" type="progress-fill" :id="_uid" />
          <gradient v-if="emptyColor.gradient" :color="emptyColor" type="empty" :id="_uid" />
          <gradient
            v-if="emptyColorFill.gradient"
            :color="emptyColorFill"
            type="empty-fill"
            :id="_uid"
          />
        </defs>
        <half-circle-progress v-if="half" :options="options" />
        <circle-progress v-else :options="options" />
      </svg>

      <div class="ep-legend--container" :style="{ maxWidth: `${size}px` }">
        <span
          v-if="legend"
          class="ep-legend--value"
          :class="{ 'ep-hidden': shouldHideLegendValue }"
          :style="{ fontSize: fontSize, color: fontColor }"
        >
          <CountUp
            :class="[legendClass]"
            ref="count"
            :endVal="legendVal"
            :delay="animation.delay"
            :options="counterOptions"
          ></CountUp>
          <slot name="legend-value"></slot>
        </span>
        <slot name="legend-capture"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import CountUp from "vue-countup-v2";
import CircleProgress from "./CircleProgress.vue";
import Gradient from "./Gradient.vue";
import HalfCircleProgress from "./HalfCircleProgress.vue";

export default {
  name: "EllipseProgressContainer",
  components: { HalfCircleProgress, Gradient, CircleProgress, CountUp },
  data: () => ({
    animated_legend_value: 0,
    raf_id: null,
    animation_step: 0
  }),
  props: {
    progress: {
      type: Number,
      required: true,
      validator: val => val >= 0 && val <= 100
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
      type: [Object],
      required: false,
      default: () => ({
        mode: "normal",
        offset: 0
      }),
      validator: value =>
        ["normal", "out", "out-over", "in", "in-over", "top", "bottom"].includes(value.mode)
    },
    color: {
      type: [String, Object],
      required: false,
      default: "#3f79ff"
    },
    emptyColor: {
      type: [String, Object],
      required: false,
      default: "#e6e9f0"
    },
    colorFill: {
      type: [String, Object],
      required: false,
      default: "transparent"
    },
    emptyColorFill: {
      type: [String, Object],
      required: false,
      default: "transparent"
    },
    fontSize: {
      type: String,
      required: false,
      default: "1rem"
    },
    fontColor: {
      type: String,
      required: false,
      default: "gray"
    },
    animation: {
      type: Object,
      required: false,
      default: () => ({
        type: "default",
        duration: 1000,
        delay: 300
      })
    },
    legend: {
      type: Boolean,
      required: false,
      default: true
    },
    legendValue: {
      type: Number,
      required: false
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
      type: [String, Object],
      required: false,
      default: "",
      validator: value => {
        if (!value || typeof value === "string") {
          return true;
        }

        if (typeof value === "object") {
          return value.count >= 0 && value.spacing >= 0;
        }
        return false;
      }
    },
    half: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    options() {
      return { ...this.$props, id: this._uid };
    },
    startAngle() {
      return /*this.loading ? "" : */this.angle || -90;
    },
    legendVal() {
      if (this.loading || this.noData) {
        return 0;
      }
      return this.legendValue && !Number.isNaN(this.legendValue) ? this.legendValue : this.progress;
    },
    shouldHideLegendValue() {
      return !this.dataIsAvailable || this.loading || this.noData;
    },
    dataIsAvailable() {
      return this.noData || !Number.isNaN(parseFloat(this.progress));
    },
    countDecimals() {
      if (this.legendVal % 1 === 0) return 0;
      return this.legendVal.toString().split(".")[1].length;
    },
    counterOptions() {
      return {
        duration: this.animation.duration / 1000,
        target: "span",
        decimalPlaces: this.countDecimals,
        decimal: "."
      };
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
  color: black;
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
