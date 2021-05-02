<template>
  <span class="ep-legend--value__counter">
    <slot :counterTick="counterProps"></slot>
  </span>
</template>

<script>
export default {
  name: "Counter",
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    animation: {
      type: Object,
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
    elapsed: 0,
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
    currentDifference() {
      return Math.abs(this.end - this.currentValue);
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
      return this.animation.delay;
    },
    duration() {
      return this.animation.duration;
    },
    countProgress() {
      return (Math.abs(this.currentDifference - this.difference) * 100) / (this.difference || 1);
    },
    counterProps() {
      return {
        currentValue: parseFloat(this.formattedValue),
        countProgress: this.countProgress,
        currentFormattedValue: this.formattedValue,
        currentRawValue: this.currentValue,
        duration: this.duration,
        previousCountStepValue: this.previousCountStepValue,
        start: this.start,
        end: this.end,
        difference: this.difference,
        currentDifference: this.currentDifference,
        oneStepDifference: this.oneStepDifference,
        startTime: this.startTime,
        elapsed: this.elapsed,
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
      this.elapsed = timeStamp - this.startTime;
      if (this.end >= this.start) {
        this.countUp();
      } else {
        this.countDown();
      }
      if (this.elapsed < this.duration && this.difference > 0.1) {
        cancelAnimationFrame(this.raf);
        this.raf = requestAnimationFrame(this.count);
      }
      if (this.elapsed >= this.duration) {
        this.currentValue = this.end;
        this.reset();
      }
    },
    countDown() {
      const decreaseValue = Math.min(this.oneStepDifference * (this.elapsed || 1), this.difference);
      this.currentValue -= decreaseValue - this.previousCountStepValue;
      this.previousCountStepValue = decreaseValue;
    },
    countUp() {
      const increaseValue = Math.min(this.oneStepDifference * (this.elapsed || 1), this.difference);
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
