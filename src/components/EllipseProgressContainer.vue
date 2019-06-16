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
          <gradient
            v-if="color_fill.gradient"
            :color="color_fill"
            type="progress-fill"
            :id="_uid"
          />
          <gradient v-if="empty_color.gradient" :color="empty_color" type="empty" :id="_uid" />
          <gradient
            v-if="empty_color_fill.gradient"
            :color="empty_color_fill"
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
          :class="{ hidden: shouldHideLegendValue }"
          :style="{ fontSize: font_size, color: font_color }"
        >
          <CountUp
            ref="count"
            :endVal="legendValue"
            :delay="animation.delay"
            :options="countOptions"
          ></CountUp>
          <slot name="legend_value"></slot>
        </span>
        <slot name="legend_capture"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import CircleProgress from "@/components/CircleProgress.vue";
import Gradient from "@/components/Gradient.vue";
import CountUp from "vue-countup-v2";
import HalfCircleProgress from "@/components/HalfCircleProgress.vue";

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
      validator: val => val > -1 && val < 101
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
      validator: value => parseFloat(value) > -1
    },
    empty_thickness: {
      type: [Number, String],
      required: false,
      default: "5%",
      validator: value => parseFloat(value) > -1
    },
    line: {
      type: String,
      required: false,
      default: "round",
      validator: value => ["round", "butt", "square"].includes(value)
    },
    line_mode: {
      type: [Object],
      required: false,
      default: () => ({
        mode: "normal",
        offset: 0
      }),
      validator: value =>
        ["normal", "out", "out-overlap", "in", "in-overlap", "top", "bottom"].includes(value.mode)
    },
    color: {
      type: [String, Object],
      required: false,
      default: "#3f79ff"
    },
    empty_color: {
      type: [String, Object],
      required: false,
      default: "#e6e9f0"
    },
    color_fill: {
      type: [String, Object],
      required: false,
      default: "transparent"
    },
    empty_color_fill: {
      type: [String, Object],
      required: false,
      default: "transparent"
    },
    font_size: {
      type: String,
      required: false,
      default: "relative"
    },
    font_color: {
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
    legend_value: {
      type: Number,
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
        /* if (typeof value === 'string') {
          return RegExp(/^[1-9]\d*$/g).test(value);
        } */
        if (!value || typeof value === "string") {
          return true;
        }

        if (typeof value === "object") {
          return value.count > -1 && value.spacing > -1;
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
      return this.loading ? "" : this.angle || -90;
    },
    legendValue() {
      if (this.loading || this.noData) {
        return 0;
      }
      return !Number.isNaN(this.legend_value) ? this.legend_value : this.progress;
    },
    shouldHideLegendValue() {
      return !this.dataIsAvailable || this.loading || this.noData;
    },
    dataIsAvailable() {
      return this.noData ? false : !Number.isNaN(parseFloat(this.progress));
    },
    countDecimals() {
      if (this.legendValue % 1 === 0) return 0;
      return this.legendValue.toString().split(".")[1].length;
    },
    countOptions() {
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
.hidden {
  opacity: 0;
}
svg.ep-svg-container {
  transition: inherit;
  transform-origin: 50% 50%;
}
</style>
