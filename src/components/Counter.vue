<template>
  <span class="ep-legend--value__counter">
    <slot :counterTick="counterProps"> </slot>
    <span v-if="!$scopedSlots.default">{{ formattedValue }}</span>
  </span>
</template>

<script>
import { animationParser } from "./optionsParser";

export default {
  name: "Counter",
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    animation: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    start: 0,
    startTime: 0,
    currentValue: 0,
    raf: null,
    previousCountStepValue: 0,
  }),
  watch: {
    value() {
      this.start = this.currentValue;
      this.reset();
      this.raf = requestAnimationFrame(this.count);
    },
  },
  computed: {
    end() {
      return parseFloat(this.value.toString().replace(",", "."));
    },
    difference() {
      return Math.abs(this.end - this.start);
    },
    oneStepDifference() {
      return this.duration === 0 ? this.difference : this.difference / this.duration;
    },
    delimiter() {
      return this.value.toString().search(",") >= 0 ? "," : ".";
    },
    formattedValue() {
      return this.currentValue.toFixed(this.countDecimals()).replace(".", this.delimiter);
    },
    delay() {
      return animationParser(this.animation).delay;
    },
    duration() {
      return animationParser(this.animation).duration;
    },
    counterProps() {
      return {
        currentValue: parseFloat(this.formattedValue),
        currentFormattedValue: this.formattedValue,
        currentRawValue: this.currentValue,
        duration: this.duration,
        previousCountStepValue: this.previousCountStepValue,
        start: this.start,
        end: this.end,
        difference: this.difference,
        oneStepDifference: this.oneStepDifference,
        startTime: this.startTime,
        elapsed: 0,
      };
    },
  },
  methods: {
    countDecimals() {
      if (this.value % 1 === 0) return 0;
      return this.value.toString().split(this.delimiter)[1].length;
    },
    count(timeStamp) {
      if (!this.startTime) {
        this.startTime = timeStamp;
      }
      const elapsed = timeStamp - this.startTime;
      if (this.end >= this.start) {
        this.countUp(elapsed);
      } else {
        this.countDown(elapsed);
      }
      if (elapsed < this.duration && this.difference > 0.1) {
        cancelAnimationFrame(this.raf);
        this.raf = requestAnimationFrame(this.count);
      }
      if (elapsed >= this.duration) {
        this.currentValue = this.end;
        this.reset();
      }
    },
    countDown(elapsed) {
      const decreaseValue = Math.min(this.oneStepDifference * (elapsed || 1), this.difference);
      this.currentValue -= decreaseValue - this.previousCountStepValue;
      this.previousCountStepValue = decreaseValue;
    },
    countUp(elapsed) {
      const increaseValue = Math.min(this.oneStepDifference * (elapsed || 1), this.difference);
      this.currentValue += increaseValue - this.previousCountStepValue;
      this.previousCountStepValue = increaseValue;
    },
    reset() {
      this.startTime = 0;
      this.previousCountStepValue = 0;
      cancelAnimationFrame(this.raf);
    },
  },
  mounted() {
    if (!this.loading) {
      setTimeout(() => {
        this.raf = requestAnimationFrame(this.count);
      }, this.delay);
    } else {
      this.raf = requestAnimationFrame(this.count);
    }
  },
};
</script>
