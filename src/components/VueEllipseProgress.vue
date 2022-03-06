<template>
  <div
    class="ep-container"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
  >
    <div class="ep-content">
      <circle-container v-for="(options, i) in normalizedCircles" :key="i" :options="options" />
      <div class="ep-legend--container" :style="{ maxWidth: `${size}px` }">
        <div
          v-if="!isMultiple"
          class="ep-legend--value"
          :class="[legendClass, { 'ep-hidden': shouldHideLegendValue }]"
          :style="{ height: `${legendHeight}px`, fontSize, color: fontColor }"
          style="transition: 0.3s"
        >
          <div ref="legend">
            <counter :value="computedLegend" :animation="normalizedCircles[0].animation" :loading="loading">
              <template #default="{ counterTick }">
                <template v-if="legendFormatter">
                  <span v-if="isHTML" v-html="legendFormatter(counterTick)"></span>
                  <span v-else>{{ legendFormatter(counterTick) }}</span>
                </template>
                <slot v-else :counterTick="counterTick">
                  <span>{{ counterTick.currentFormattedValue }}</span>
                </slot>
              </template>
            </counter>
            <slot name="legend"></slot>
          </div>
        </div>
        <slot name="legend-caption"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { getNumberIfValid, isValidNumber, defaultCounterTick } from "../utils";
import props from "./interface";
import CircleContainer from "./Circle/CircleContainer.vue";
import Counter from "./Counter.vue";
import { parseOptions } from "./optionsParser";

export default {
  name: "VueEllipseProgress",
  components: { Counter, CircleContainer },
  props,
  data: () => ({
    legendHeight: null,
  }),
  watch: {
    hideLegend() {
      this.updateLegendHeight();
    },
  },
  computed: {
    computedLegend() {
      if (this.loading || this.noData) {
        return 0;
      }
      return this.legend ? this.legend : getNumberIfValid(this.progress) || 0;
    },
    shouldHideLegendValue() {
      return !this.isDataAvailable || this.loading || this.hideLegend;
    },
    isDataAvailable() {
      return isValidNumber(this.progress) && !this.noData;
    },
    isMultiple() {
      return this.data.length > 1;
    },
    isHTML() {
      return /<[a-z/][\s\S]*>/i.test(
        ((this.legendFormatter && this.legendFormatter(defaultCounterTick)) || "").toString().trim()
      );
    },
    circlesData() {
      if (this.isMultiple) {
        return this.data.map((options) => ({
          ...this.$props,
          ...options,
          multiple: true,
          emptyThickness: isValidNumber(options.thickness) ? options.thickness : this.$props.thickness,
          data: undefined, // do not pass data prop
        }));
      }
      return [this.$props];
    },
    normalizedCircles() {
      const normalizedCircles = [];
      const previousCircles = [];
      for (let i = 0; i < this.circlesData.length; i++) {
        const options = this.circlesData[i];
        const parsedOptions = parseOptions({
          index: i,
          ...options,
          globalDot: this.dot,
          globalGap: this.gap,
          globalThickness: this.thickness,
          previousCircles: [...previousCircles],
        });
        normalizedCircles.push(parsedOptions);
        const { gap, thickness, dot } = normalizedCircles[i];
        previousCircles.push({ gap, thickness, dot });
      }
      return normalizedCircles;
    },
  },
  methods: {
    updateLegendHeight() {
      this.$nextTick(() => {
        this.legendHeight = this.hideLegend ? 0 : this.$refs.legend?.clientHeight ?? 0;
      });
    },
  },
  mounted() {
    this.updateLegendHeight();
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
  height: 100%;
  width: 100%;
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

svg.ep-svg {
  transition: inherit;
  transform-origin: 50% 50%;
}
</style>
