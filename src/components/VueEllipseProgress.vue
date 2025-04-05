<script setup lang="ts">
import {
  getNumberIfValid,
  isValidNumber,
  defaultCounterTick,
  type CircleProps,
  DEFAULT_SIZE,
  type PreviousCircle,
} from "@/utils.ts";
import CircleContainer from "./Circle/CircleContainer.vue";
import LegendCounter from "./LegendCounter.vue";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import type { VeProgressProps } from "@/types.ts";

const props = defineProps<VeProgressProps>();

const legendHeight = ref<number | undefined>(undefined);
// for better Vue 3 compatibility, sacrifice useTemplateRef
const legendRef = ref<HTMLElement | null>(null);

const size = computed(() => {
  return `${props.size || DEFAULT_SIZE}px`;
});
const computedLegend = computed(() => {
  if (props.loading || props.noData) {
    return 0;
  }
  return props.legend ? props.legend : getNumberIfValid(props.progress) || 0;
});

const isDataAvailable = computed(() => {
  return isValidNumber(props.progress) && !props.noData;
});
const shouldHideLegendValue = computed(() => {
  return !isDataAvailable.value || props.loading || props.hideLegend;
});
const isMultiple = computed(() => {
  return !!props.data?.length;
});
const isHTML = computed(() => {
  return /<[a-z/][\s\S]*>/i.test(
    ((props.legendFormatter && props.legendFormatter(defaultCounterTick)) || "").toString().trim()
  );
});
const circlesProps = computed<CircleProps[]>(() => {
  if (isMultiple.value) {
    const previousCircles: PreviousCircle[] = [];
    return props.data!.map((circleProps, i) => ({
      // merge global props with circle props
      ...props,
      ...circleProps,
      index: i,
      // for multiple circles, emptyThickness is not allowed
      emptyThickness: isValidNumber(circleProps.thickness)
        ? circleProps.thickness
        : props.thickness,
      data: undefined, // do not propagate data prop
      globalDot: props.dot,
      globalThickness: props.thickness,
      multipleCircles: true,
      // in the "multiple circles" mode, we need to keep track of previous circles
      // to correctly calculate the circumference of each circle
      previousCircles:
        i > 0
          ? [
              ...previousCircles,
              { dot: circleProps.dot, thickness: circleProps.thickness, gap: circleProps.gap },
            ]
          : [],
    }));
  }
  return [
    { ...props, index: 0, globalDot: props.dot, multipleCircles: false, previousCircles: [] },
  ];
});

const updateLegendHeight = () => {
  nextTick(() => {
    legendHeight.value = props.hideLegend ? 0 : (legendRef.value?.clientHeight ?? 0);
  });
};

watch(
  () => props.hideLegend,
  () => {
    updateLegendHeight();
  }
);
onMounted(() => {
  updateLegendHeight();
});
</script>

<template>
  <div
    class="ep-container"
    :style="{
      width: size,
      height: size,
    }"
  >
    <div class="ep-content">
      <circle-container v-for="(props, i) in circlesProps" v-bind="props" :key="i">
        <template #circle-progress="{ attrs }">
          <slot name="circle-progress" :attrs="attrs"></slot>
        </template>
      </circle-container>
      <div class="ep-legend--container" :style="{ maxWidth: size }">
        <div
          v-if="!isMultiple"
          class="ep-legend--value"
          :class="[legendClass, { 'ep-hidden': shouldHideLegendValue }]"
          :style="{ height: `${legendHeight}px`, fontSize, color: fontColor }"
          style="transition: 0.3s"
        >
          <div ref="legendRef">
            <legend-counter
              :value="computedLegend"
              :animation="circlesProps[0].animation"
              :loading="loading"
            >
              <template #default="{ counterTick }">
                <template v-if="legendFormatter">
                  <span v-if="isHTML" v-html="legendFormatter(counterTick)"></span>
                  <span v-else>{{ legendFormatter(counterTick) }}</span>
                </template>
                <slot v-else :counterTick="counterTick">
                  <span>{{ counterTick.currentFormattedValue }}</span>
                </slot>
              </template>
            </legend-counter>
            <slot name="legend"></slot>
          </div>
        </div>
        <slot name="legend-caption"></slot>
      </div>
    </div>
  </div>
</template>

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
