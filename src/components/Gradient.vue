<template>
  <component
    :is="gradientComponent"
    :id="`ep-${type}-gradient-${id}`"
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
<script>
import { isValidNumber } from "@/utils";

export default {
  name: "Gradient",
  props: {
    color: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    isValidNumber(value) {
      return isValidNumber(value);
    },
  },
  computed: {
    gradientComponent() {
      return this.color.radial ? "radialGradient" : "linearGradient";
    },
  },
};
</script>
