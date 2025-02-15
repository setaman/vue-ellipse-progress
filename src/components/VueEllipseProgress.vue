<script setup lang="ts">
import { getNumberIfValid, isValidNumber, defaultCounterTick } from "@/utils.ts";
import CircleContainer from "./Circle/CircleContainer.vue";
import Counter from "./Counter.vue";
import { parseOptions, type PropsParserOptions } from "@/components/optionsParser";
import { computed, nextTick, onMounted, ref, watchEffect } from "vue";
import type { VeProgressProps } from "@/types.ts";

const props = defineProps<VeProgressProps>();

const legendHeight = ref<number | undefined>(undefined);
// for better Vue 3 compatibility, sacrifice useTemplateRef
const legendRef = ref<HTMLElement | null>(null);

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
  return (props.data?.length ?? 0) > 1;
});
const isHTML = computed(() => {
  return /<[a-z/][\s\S]*>/i.test(
    ((props.legendFormatter && props.legendFormatter(defaultCounterTick)) || "").toString().trim()
  );
});
const circlesProps = computed(() => {
  if (isMultiple.value) {
    return props.data!.map((circleProps) => ({
      ...props,
      ...circleProps,
      multiple: true,
      // for multiple circles, emptyThickness is not allowed
      emptyThickness: isValidNumber(circleProps.thickness)
        ? circleProps.thickness
        : props.thickness,
      data: undefined, // do not pass data prop
    }));
  }
  return [props];
});
const normalizedCircles = computed(() => {
  const normalizedCircles = [];
  const previousCircles = [];
  for (let i = 0; i < circlesProps.value.length; i++) {
    const cProps = circlesProps.value[i];
    const options: PropsParserOptions = {
      globalDot: cProps.dot,
      globalThickness: cProps.thickness,
      multipleCircles: isMultiple.value,
    };
    const parsedOptions = parseOptions(
      {
        index: i,
        ...cProps,
        //globalGap: props.gap,
        //globalThickness: props.thickness,
        //previousCircles: [...previousCircles],
      },
      options
    );
    normalizedCircles.push(parsedOptions);
    const { gap, thickness, dot } = normalizedCircles[i];
    previousCircles.push({ gap, thickness, dot });
  }
  return normalizedCircles;
});

const updateLegendHeight = () => {
  nextTick(() => {
    legendHeight.value = props.hideLegend ? 0 : (legendRef.value?.clientHeight ?? 0);
  });
};

watchEffect(() => {
  updateLegendHeight();
});
onMounted(() => {
  updateLegendHeight();
});
</script>

<template>
  <div
    class="ep-container"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
  >
    <div class="ep-content">
      <circle-container v-for="(options, i) in normalizedCircles" :key="i" :options="options">
        <template #circle-progress="{ attrs }">
          <slot name="circle-progress" :attrs="attrs"></slot>
        </template>
      </circle-container>
      <div class="ep-legend--container" :style="{ maxWidth: `${size}px` }">
        <div
          v-if="!isMultiple"
          class="ep-legend--value"
          :class="[legendClass, { 'ep-hidden': shouldHideLegendValue }]"
          :style="{ height: `${legendHeight}px`, fontSize, color: fontColor }"
          style="transition: 0.3s"
        >
          <div ref="legend">
            <counter
              :value="computedLegend"
              :animation="normalizedCircles[0].animation"
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
            </counter>
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
