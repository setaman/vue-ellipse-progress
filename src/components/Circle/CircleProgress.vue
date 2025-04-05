<script setup lang="ts">
import { useCircle } from "./useCircle";
import FadeInTransition from "../FadeInTransition.vue";
import CircleLoader from "./CircleLoader.vue";
import type { CircleProps } from "@/utils.ts";

const props = defineProps<CircleProps>();

const {
  circumference,
  radius,
  emptyRadius,
  fillRadius,
  dataIsAvailable,
  emptyDasharray,
  animationDuration,
  styles,
  emptyFillRadius,
  position,
  isLoading,
  animationClass,
  color,
  colorFill,
  emptyColor,
  emptyColorFill,
  line,
  thickness,
  emptyThickness,
  loader,
} = useCircle(props);
</script>

<template>
  {{ radius }}
  <g
    class="ep-circle"
    :style="{
      transitionDuration: styles.transitionDuration,
      transitionTimingFunction: styles.transitionTimingFunction,
      transform: `rotate(${angle}deg)`,
    }"
  >
    <circle
      v-if="emptyColorFill !== 'transparent'"
      class="ep-circle--empty__fill"
      :r="emptyFillRadius"
      :cx="position"
      :cy="position"
      :fill="emptyColorFill"
      :class="{ 'ep-circle--nodata': !dataIsAvailable }"
      :style="{
        transitionDuration: animationDuration,
        transitionTimingFunction: styles.transitionTimingFunction,
      }"
    >
    </circle>
    <circle
      class="ep-circle--empty"
      :r="emptyRadius"
      :cx="position"
      :cy="position"
      :stroke="emptyColor"
      :stroke-dasharray="emptyDasharray"
      fill="transparent"
      :class="{ 'ep-circle--nodata': !dataIsAvailable }"
      :style="{
        transitionDuration: animationDuration,
        transitionTimingFunction: styles.transitionTimingFunction,
      }"
      :stroke-width="emptyThickness"
    >
    </circle>
    <circle
      v-if="colorFill !== 'transparent'"
      class="ep-circle--progress__fill"
      :r="fillRadius"
      :cx="position"
      :cy="position"
      :fill="colorFill"
      :class="{ 'ep-circle--nodata': !dataIsAvailable }"
      :style="{ transition: styles.transition }"
    >
    </circle>
    <fade-in-transition>
      <g v-if="isLoading">
        <circle-loader :options="loader" />
      </g>
    </fade-in-transition>
    <slot name="circle-progress" :attrs="{}">
      <circle
        ref="circleProgress"
        class="ep-circle--progress"
        :class="animationClass"
        :r="radius"
        :cx="position"
        :cy="position"
        fill="transparent"
        :stroke="color"
        :stroke-width="thickness"
        :stroke-linecap="line"
        :stroke-dasharray="circumference"
        :style="styles"
      >
      </circle>
    </slot>
  </g>
</template>

<style scoped lang="scss">
.ep-circle {
  transform-origin: 50% 50%;
}
</style>
