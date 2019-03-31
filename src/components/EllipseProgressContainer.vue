<template>
    <svg>

    </svg>
</template>

<script>
export default {
  name: 'EllipseProgressContainer',
  props: {
    progress: {
      type: Number,
      required: true,
      validator: val => val > -1 && val < 101,
    },
    size: {
      type: Number,
      required: false,
      default: 200,
      validator: value => value > -1,
    },
    thickness: {
      type: Number,
      required: false,
      validator: value => value > -1,
    },
    empty_thickness: {
      type: Number,
      required: false,
      validator: value => value > -1,
    },
    line: {
      type: String,
      required: false,
      default: 'round',
      validator: value => ['round', 'butt', 'square'].includes(value),
    },
    line_mode: {
      type: [Object],
      required: false,
      default: () => ({
        mode: 'normal',
        offset: 0,
      }),
      validator: value => ['normal', 'out', 'out_overlap', 'in', 'in_overlap'].includes(value.mode),
    },
    color: {
      type: [String, Object],
      required: false,
      default: '#3f79ff',
    },
    empty_color: {
      type: [String, Object],
      required: false,
      default: '#e6e9f0',
    },
    font_size: {
      type: String,
      required: false,
      default: 'relative',
    },
    font_color: {
      type: String,
      required: false,
      default: 'gray',
    },
  },
};
</script>

<style scoped lang="scss">

</style>
