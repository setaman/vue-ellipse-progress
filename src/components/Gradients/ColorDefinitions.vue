<script setup lang="ts">
import GradientColor from "@/components/Gradients/GradientColor.vue";
import { computed } from "vue";
import type { Color, Gradient } from "@/types.ts";
import type { loaderParser } from "@/components/optionsParser.ts";

const props = defineProps<{
  color?: Color;
  colorFill?: Color;
  emptyColor?: Color;
  emptyColorFill?: Color;
  loader?: ReturnType<typeof loaderParser>;
  circleId: string;
}>();

const isColorGradient = computed(() => {
  return typeof props.color === "object" && Array.isArray(props.color.colors);
});
const isColorFillGradient = computed(() => {
  return typeof props.colorFill === "object" && Array.isArray(props.colorFill.colors);
});
const isEmptyColorGradient = computed(() => {
  return typeof props.emptyColor === "object" && Array.isArray(props.emptyColor.colors);
});
const isEmptyColorFillGradient = computed(() => {
  return typeof props.emptyColorFill === "object" && Array.isArray(props.emptyColorFill.colors);
});
const isLoaderColorGradient = computed(() => {
  return typeof props.loader?.color === "object" && Array.isArray(props.loader.color.colors);
});
</script>

<template>
  <defs>
    <gradient-color
      v-if="isColorGradient"
      :color="color as Gradient"
      type="progress"
      :uid="circleId"
    />
    <gradient-color
      v-if="isColorFillGradient"
      :color="colorFill as Gradient"
      type="progress-fill"
      :uid="circleId"
    />
    <gradient-color
      v-if="isEmptyColorGradient"
      :color="emptyColor as Gradient"
      type="empty"
      :uid="circleId"
    />
    <gradient-color
      v-if="isEmptyColorFillGradient"
      :color="emptyColorFill as Gradient"
      type="empty-fill"
      :uid="circleId"
    />
    <gradient-color
      v-if="isLoaderColorGradient"
      :color="loader?.color as Gradient"
      type="loader"
      :uid="circleId"
    />
  </defs>
</template>

<style scoped lang="scss"></style>
