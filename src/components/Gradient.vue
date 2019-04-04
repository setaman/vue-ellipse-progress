<template>
  <linearGradient v-if="!color.gradient.radial"
                  :id="`ep-${type}-gradient-${id}`"
                  x1="0%" y1="100%" x2="0%" y2="0%"
                  area-hidden="true">
    <stop v-for="(col, i) in color.gradient.colors" :key="i"
          :offset="`${col.offset}%`" :stop-color="`${col.color}`" :stop-opacity="`${col.opacity}`"/>
  </linearGradient>
  <radialGradient v-else
                  :id="`ep-${type}-gradient-${id}`"
                  x1="0%" y1="0%" x2="100%" y2="0%"
                  area-hidden="true">
    <stop v-for="(col, i) in color.gradient.colors" :key="i"
          :offset="`${col.offset}%`" :stop-color="`${col.color}`" :stop-opacity="`${col.opacity}`"/>
  </radialGradient>
</template>

<script>
export default {
  name: 'Gradient',
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
};
</script>

<style scoped>

</style>
