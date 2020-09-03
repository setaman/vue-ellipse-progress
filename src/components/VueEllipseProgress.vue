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
          :globalDot="dot"
        />
      </svg>

      <div class="ep-legend--container" :style="{ maxWidth: `${size}px` }">
        <div
          class="ep-legend--value"
          v-if="legend && !isMultiple"
          :class="[legendClass, { 'ep-hidden': shouldHideLegendValue }]"
          :style="{ fontSize: fontSize, color: fontColor }"
        >
          <counter
            :value="legendVal"
            :animation="animation"
            :loading="loading"
            :legend-formatter="legendFormatter"
            :counter-tick.sync="counterTick"
          >
            <template>
              <slot :counterTick="counterTick"></slot>
            </template>
          </counter>
          <slot name="legend-value"></slot>
        </div>
        <slot name="legend-caption"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { getNumberIfValid, isValidNumber } from "../utils";
import { props } from "./interface";
import CircleContainer from "./Circle/CircleContainer.vue";
import Counter from "./Counter.vue";

export default {
  name: "VueEllipseProgress",
  components: { Counter, CircleContainer },
  props: {
    ...props,
    legendFormatter: {
      type: Function,
      required: false,
    },
  },
  data: () => ({
    counterTick: {},
  }),
  computed: {
    legendVal() {
      if (this.loading || this.noData) {
        return 0;
      }
      return this.legendValue ? this.legendValue : getNumberIfValid(this.progress) || 0;
    },
    shouldHideLegendValue() {
      return !this.isDataAvailable || this.loading;
    },
    isDataAvailable() {
      return isValidNumber(this.progress) && !this.noData;
    },
    isMultiple() {
      return this.data.length > 1;
    },
    circlesData() {
      if (this.isMultiple) {
        return this.data.map((data) => ({
          ...this.$props,
          ...data,
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
