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
        <circle-container
          v-for="(options, i) in circlesData"
          :key="i"
          v-bind="options"
          :multiple="isMultiple"
          :index="i"
          :globalThickness="thickness"
          :globalGap="gap"
        />
      </svg>

      <div class="ep-legend--container" :style="{ maxWidth: `${size}px` }">
        <span
          v-if="legend && !isMultiple"
          class="ep-legend--value"
          :class="[legendClass, { 'ep-hidden': shouldHideLegendValue }]"
          :style="{ fontSize: fontSize, color: fontColor }"
        >
          <CountUp ref="count" :endVal="legendVal" :delay="counterOptions.delay" :options="counterOptions"></CountUp>
          <slot name="legend-value"></slot>
        </span>
        <slot name="legend-caption"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import CountUp from "vue-countup-v2";
import { getNumberIfValid, isValidNumber } from "../utils";
import { props } from "./interface";
import CircleContainer from "./Circle/CircleContainer.vue";

export default {
  name: "VueEllipseProgress",
  components: { CircleContainer, CountUp },
  data: () => ({}),
  props,
  computed: {
    legendVal() {
      if (this.loading || this.noData) {
        return 0;
      }
      const legendValue = getNumberIfValid(this.legendValue);
      const progressValue = getNumberIfValid(this.progress) || 0;
      return isValidNumber(legendValue) ? legendValue : progressValue;
    },
    shouldHideLegendValue() {
      return !this.isDataAvailable || this.loading;
    },
    isDataAvailable() {
      return isValidNumber(this.progress) && !this.noData;
    },
    countDecimals() {
      if (!this.isDataAvailable || this.legendVal % 1 === 0) return 0;
      return this.legendVal.toString().split(".")[1].length;
    },
    counterOptions() {
      const durationValue = this.animation.split(" ")[1];
      const delayValue = this.animation.split(" ")[2];
      const duration = (isValidNumber(durationValue) ? durationValue : 1000) / 1000;
      const delay = isValidNumber(delayValue) ? delayValue : 400;
      return {
        delay: parseFloat(delay),
        duration,
        target: "span",
        decimalPlaces: this.countDecimals,
        decimal: ".",
      };
    },
    isMultiple() {
      return this.data.length > 1;
    },
    circlesData() {
      if (this.isMultiple) {
        return this.data.map((data) => ({
          ...this.$props,
          ...data,
          // currently the thickness for both lines must be equal
          emptyThickness: isValidNumber(data.thickness) ? data.thickness : this.$props.thickness,
        }));
      }
      return [this.$props];
    },
  },
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
