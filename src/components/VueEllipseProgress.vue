<template>
  <div
    class="ep-container"
    :style="{
      maxWidth: `${size}px`,
      maxHeight: `${size}px`,
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
import props from "./interface";
import EpCircleContainer from "./Circle/EpCircleContainer.vue";

export default {
  name: "VueEllipseProgressContainer",
  components: { EpCircleContainer, CountUp },
  data: () => ({}),
  props,
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
