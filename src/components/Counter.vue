<template>
  <span>{{ formattedValue }}</span>
</template>

<script>
export default {
  name: "Counter",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    start: 0,
    startTime: 0,
    currentValue: 0,
    raf: null,
    previousCountValue: 0,
    duration: 1000,
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
      return this.difference / this.duration;
    },
    delimiter() {
      const coma = this.value.toString().search(",");
      return coma >= 0 ? "," : ".";
    },
    formattedValue() {
      return this.currentValue.toFixed(this.countDecimals);
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
      if (elapsed > this.duration) {
        this.currentValue = this.end;
        this.reset();
      }
    },
    countDown(elapsed) {
      const decreaseValue = Math.min(this.oneStepDifference * elapsed, this.difference);
      this.currentValue -= decreaseValue - this.previousCountValue;
      this.previousCountValue = decreaseValue;
    },
    countUp(elapsed) {
      const increaseValue = Math.min(this.oneStepDifference * elapsed, this.difference);
      this.currentValue += increaseValue - this.previousCountValue;
      this.previousCountValue = increaseValue;
    },
    reset() {
      this.startTime = 0;
      this.previousCountValue = 0;
      cancelAnimationFrame(this.raf);
    },
  },
  mounted() {
    this.raf = requestAnimationFrame(this.count);
  },
};
</script>

<style scoped></style>
