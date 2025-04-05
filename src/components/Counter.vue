<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type { Animation, CounterTick } from "@/types.ts";
import { isString } from "../utils.js";
import { animationParser } from "@/components/optionsParser.ts";

const props = defineProps<{
  value: string | number;
  animation?: Animation;
  loading?: boolean;
}>();

const start = ref(0);
const startTime = ref(0);
const elapsed = ref(0);
const currentValue = ref(0);
const raf = ref<number | null>(null);
const previousCountStepValue = ref(0);

const parsedAnimation = computed(() => animationParser(props.animation));
const end = computed(() => parseFloat(props.value.toString().replace(",", ".")));
const difference = computed(() => Math.abs(end.value - start.value));
const currentDifference = computed(() => Math.abs(end.value - currentValue.value));
const oneStepDifference = computed(() =>
  parsedAnimation.value.duration === 0
    ? difference.value
    : difference.value / parsedAnimation.value.duration
);
const delimiter = computed(() => (props.value.toString().includes(",") ? "," : "."));
const decimalsCount = computed(() => {
  if (!isString(props.value) && props.value % 1 === 0) return 0;
  return (props.value.toString().replace(/\s/g, "").split(delimiter.value)[1] || "").length;
});
const formattedValue = computed(() => {
  if (isString(props.value) && !props.value.includes("-")) {
    let [preFormat] = props.value.toString().replace(/\s/g, "").split(delimiter.value);
    preFormat = [...preFormat].fill("0").join("");
    const [pre, post] = currentValue.value
      .toFixed(decimalsCount.value)
      .replace(".", delimiter.value)
      .split(delimiter.value);
    return `${preFormat.slice(pre.length)}${pre}${post ? delimiter.value + post : ""}`;
  }
  return currentValue.value.toFixed(decimalsCount.value).replace(".", delimiter.value);
});
const countProgress = computed(
  () => (Math.abs(currentDifference.value - difference.value) * 100) / (difference.value || 1)
);
const counterTick = computed<CounterTick>(() => ({
  currentValue: parseFloat(formattedValue.value),
  countProgress: countProgress.value,
  currentFormattedValue: formattedValue.value,
  currentRawValue: currentValue.value,
  duration: parsedAnimation.value.duration,
  previousCountStepValue: previousCountStepValue.value,
  start: start.value,
  end: end.value,
  difference: difference.value,
  currentDifference: currentDifference.value,
  oneStepDifference: oneStepDifference.value,
  startTime: startTime.value,
  elapsed: elapsed.value,
}));

const reset = () => {
  startTime.value = 0;
  previousCountStepValue.value = 0;
  if (raf.value !== null) cancelAnimationFrame(raf.value);
};

const count = (timeStamp: number) => {
  if (!startTime.value) {
    startTime.value = timeStamp;
  }
  elapsed.value = timeStamp - startTime.value;
  if (end.value >= start.value) {
    countUp();
  } else {
    countDown();
  }
  if (elapsed.value < parsedAnimation.value.duration && difference.value > 0.1) {
    if (raf.value !== null) cancelAnimationFrame(raf.value);
    raf.value = requestAnimationFrame(count);
  }
  if (elapsed.value >= parsedAnimation.value.duration) {
    currentValue.value = end.value;
    reset();
  }
};

const countDown = () => {
  const decreaseValue = Math.min(oneStepDifference.value * (elapsed.value || 1), difference.value);
  currentValue.value -= decreaseValue - previousCountStepValue.value;
  previousCountStepValue.value = decreaseValue;
};

const countUp = () => {
  const increaseValue = Math.min(oneStepDifference.value * (elapsed.value || 1), difference.value);
  currentValue.value += increaseValue - previousCountStepValue.value;
  previousCountStepValue.value = increaseValue;
};

watch(
  () => props.value,
  () => {
    start.value = currentValue.value;
    reset();
    raf.value = requestAnimationFrame(count);
  }
);

onMounted(() => {
  if (!props.loading && parsedAnimation.value.duration) {
    setTimeout(() => {
      raf.value = requestAnimationFrame(count);
    }, parsedAnimation.value.delay);
  } else {
    raf.value = requestAnimationFrame(count);
  }
});
</script>

<template>
  <span class="ep-legend--value__counter">
    <slot :counterTick="counterTick"></slot>
  </span>
</template>
