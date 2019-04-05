<template>
  <div class="ep-container" :style="{maxWidth: `${size}px`, maxHeight: `${size}px`,
                            transition: `${animation.duration}ms ease-in-out`}">
    <div class="ep-content">
      <svg class="ep-svg-container" :height="size" :width="size" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <gradient v-if="color.gradient" :color="color" type="progress" :id="_uid"/>
          <gradient v-if="color_fill.gradient" :color="color_fill" type="progress-fill" :id="_uid"/>
          <gradient v-if="empty_color.gradient" :color="empty_color" type="empty" :id="_uid"/>
          <gradient v-if="empty_color_fill.gradient" :color="empty_color_fill" type="empty-fill" :id="_uid"/>
        </defs>
        <circle-progress :options="options"/>
      </svg>

      <div class="ep-legend-container" :style="{maxWidth: `${size}px`}">
        <span v-if="legend" class="ep-legend" :style="{fontSize: font_size, color: font_color}">{{progress}}%</span>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import CircleProgress from '@/components/CircleProgress.vue';
import Gradient from '@/components/Gradient.vue';

export default {
  name: 'EllipseProgressContainer',
  components: { Gradient, CircleProgress },
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
      default: 5,
      validator: value => value > -1,
    },
    empty_thickness: {
      type: Number,
      required: false,
      default: 5,
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
      validator: value => ['normal', 'out', 'out_overlap', 'in', 'in_overlap', 'top', 'bottom'].includes(value.mode),
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
    color_fill: {
      type: [String, Object],
      required: false,
      default: 'transparent',
    },
    empty_color_fill: {
      type: [String, Object],
      required: false,
      default: 'transparent',
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
    animation: {
      type: Object,
      required: false,
      default: () => ({
        type: '',
        duration: 500,
      }),
    },
    legend: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    options() {
      return { ...this.$props, id: this._uid };
    },
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
  }

  .ep-legend-container {
    transition: inherit;
    position: absolute;
    text-align: center;
  }
  .ep-legend {
    transition: inherit;
    text-align: center;
    display: block;
    color: black;
  }
  svg.ep-svg-container {
    transition: inherit;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }

</style>
