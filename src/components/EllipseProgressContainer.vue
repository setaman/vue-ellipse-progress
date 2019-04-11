<template>
  <div class="ep-container" :style="{maxWidth: `${size}px`, maxHeight: `${size}px`,
                            transition: `${animation.duration}ms ease-in-out`}">
    <div class="ep-content">
      <svg class="ep-svg-container"
           :height="size" :width="size"
           xmlns="http://www.w3.org/2000/svg"
           :style="{transform: `rotate(${angle || -90}deg)`}">
        <defs>
          <gradient v-if="color.gradient" :color="color" type="progress" :id="_uid"/>
          <gradient v-if="color_fill.gradient" :color="color_fill" type="progress-fill" :id="_uid"/>
          <gradient v-if="empty_color.gradient" :color="empty_color" type="empty" :id="_uid"/>
          <gradient v-if="empty_color_fill.gradient" :color="empty_color_fill" type="empty-fill" :id="_uid"/>
        </defs>
        <circle-progress :options="options"/>
      </svg>

      <div class="ep-legend--container" :style="{maxWidth: `${size}px`}">
        <span v-if="legend" class="ep-legend--value" :style="{fontSize: font_size, color: font_color}">{{legendValue}}
          <slot name="legend_value"></slot>
        </span>
        <slot name="legend_capture"></slot>
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
  data: () => ({
    animated_legend_value: 0,
    raf_id: null,
    animation_step: 0,
  }),
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
        type: 'default',
        duration: 1000,
      }),
    },
    legend: {
      type: Boolean,
      required: false,
      default: true,
    },
    legend_value: {
      type: Number,
      required: false,
      default() {
        return this.progress;
      },
    },
    angle: {
      type: [String, Number],
      required: false,
      default: -90,
    },
  },
  computed: {
    options() {
      return { ...this.$props, id: this._uid };
    },
    legendValue() {
      return Number.parseFloat(this.animated_legend_value.toFixed(this.countDecimals())) || 0;
    },
  },
  watch: {
    legend_value(updated, old) {
      cancelAnimationFrame(this.raf_id);
      this.animateLegendValue(old, updated);
    },
  },
  methods: {
    animateLegendValue(old = 0, updated = this.legend_value) {
      if (!this.legend) { return; }
      if (!this.legend_value) {
        updated = 0;
      }

      this.animation_step = this.legendAnimationStep(Math.abs(updated - this.animated_legend_value));

      if (this.raf_id) { cancelAnimationFrame(this.raf_id); }

      if (updated > old) {
        this.raf_id = requestAnimationFrame(this.countUp);
      } else if (updated < old) {
        this.raf_id = requestAnimationFrame(this.countDown);
      }
    },
    legendAnimationStep(difference) {
      return difference / ((this.animation.duration / 1000) * 60);
    },
    countUp() {
      this.animated_legend_value += this.animation_step;
      if (this.animated_legend_value < this.legend_value) {
        requestAnimationFrame(this.countUp);
      } else {
        cancelAnimationFrame(this.raf_id);
        this.animated_legend_value = this.toNumber(this.legend_value);
      }
    },
    countDown() {
      this.animated_legend_value -= this.animation_step;
      if (this.animated_legend_value > this.legend_value) {
        requestAnimationFrame(this.countDown);
      } else {
        cancelAnimationFrame(this.raf_id);
        this.animated_legend_value = this.toNumber(this.legend_value);
      }
    },
    countDecimals() {
      if ((this.legend_value % 1) === 0) return 0;
      return this.legend_value.toString().split('.')[1].length;
    },
    toNumber(value) {
      return Number.parseFloat(value);
    },
  },
  mounted() {
    this.raf_id = this.animateLegendValue();
  },
};
</script>

<style scoped lang="scss">

  .ep-container {
    display: inline-block;
    //overflow: hidden;
  }

  .ep-content {
    transition: inherit;
    max-width: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .ep-legend--container {
    transition: inherit;
    position: absolute;
    text-align: center;
  }
  .ep-legend--value {
    transition: inherit;
    text-align: center;
    display: block;
    color: black;
  }
  svg.ep-svg-container {
    transition: inherit;
    //transform: rotate(-90deg);
    //transform-origin: 50% 50%;
  }

</style>
