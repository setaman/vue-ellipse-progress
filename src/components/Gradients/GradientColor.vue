<template>
  <component
    :is="gradientComponent"
    :id="`ep-${type}-gradient-${uid}`"
    x1="0%"
    y1="100%"
    x2="0%"
    y2="0%"
    area-hidden="true"
  >
    <stop
      v-for="(col, i) in color.colors"
      :key="i"
      :offset="`${col.offset}%`"
      :stop-color="`${col.color}`"
      :stop-opacity="`${isValidNumber(col.opacity) ? col.opacity : 1}`"
    />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { isValidNumber } from "@/utils.ts";
import type { Gradient } from "@/types.ts";

const props = defineProps<{
  color: Gradient;
  type: string;
  uid: string;
}>();

const gradientComponent = computed(() =>
  props.color.radial ? "radialGradient" : "linearGradient"
);
</script>
