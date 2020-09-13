<template>
  <div class="ep-circle--progress__dot-container" :class="dotContainerClasses" :style="dotContainerStyle">
    <div>
      <span class="ep-circle--progress__dot" :class="{ 'ep-hidden': isHidden }" :style="dotStyle"> </span>
    </div>
  </div>
</template>

<script>
import { simplifiedProps } from "../interface";
import CircleMixin from "./circleMixin";

export default {
  props: { ...simplifiedProps },
  name: "CircleDot",
  mixins: [CircleMixin],
  computed: {
    dotContainerSize() {
      return this.radius * 2 + this.dotSize;
    },
    dotContainerRotation() {
      if (this.isInitialized && !this.loading && this.dataIsAvailable) {
        return this.dotEnd;
      }
      return this.dotStart;
    },
    dotContainerFullRotationDeg() {
      return this.half ? 180 : 360;
    },
    dotContainerStyle() {
      return {
        width: `${this.dotContainerSize}px`,
        height: `${this.dotContainerSize}px`,
        transform: `rotate(${this.dotContainerRotation}deg)`,
        transitionDuration: this.loading || !this.dataIsAvailable ? "0s" : this.animationDuration,
        transitionTimingFunction: "ease-in-out",
        "animation-duration": this.animationDuration,
        "--ep-dot-start": `${this.dotStart}deg`,
        "--ep-dot-end": `${this.dotEnd}deg`,
        "--ep-dot-360": `${this.dotStart + this.dotContainerFullRotationDeg}deg`,
        ...this.dotContainerAnimationStyle,
      };
    },
    dotContainerClasses() {
      return [this.animationClass, !this.half || "ep-half-circle-progress__dot"];
    },
    dotContainerAnimationStyle() {
      const styles = {
        loop: {
          opacity: this.half ? 0 : 1,
          "--ep-dot-loop-end": `${this.dotStart + this.dotContainerFullRotationDeg + this.dotEnd}deg`,
        },
        bounce: {
          opacity: 0,
          "animation-duration": `${this.parsedAnimation.duration + 500}ms`,
        },
      };
      return styles[this.parsedAnimation.type];
    },
    dotStyle() {
      return {
        borderRadius: `${this.dotSize / 2}px`,
        width: `${this.dotSize}px`,
        backgroundColor: this.dotColor,
        ...this.dot,
        transitionDuration: this.loading || !this.dataIsAvailable ? "0s" : this.animationDuration,
        height: `${this.dotSize}px`,
      };
    },
    dotStart() {
      return this.half ? this.angle - 90 : this.angle + 90;
    },
    dotEnd() {
      const progress = this.calculateProgress();
      return this.dotStart + (progress * this.dotContainerFullRotationDeg) / 100;
    },
    isHidden() {
      return !this.isInitialized || this.loading || !this.dataIsAvailable;
    },
  },
  methods: {
    calculateProgress() {
      if (this.half) {
        return this.computedProgress < 0 ? this.computedProgress - 100 : this.computedProgress;
      }
      return this.computedProgress;
    },
  },
};
</script>

<style scoped lang="scss">
.ep-circle--progress__dot-container {
  position: absolute;
  transform-origin: center center;
  &.hidden {
    transition-duration: 0s;
  }
  & > div {
    position: relative;
  }
}
.ep-circle--progress__dot {
  transition-duration: 0.2s;
  box-sizing: border-box;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;

  &.ep-hidden {
    transform: scale(0);
  }
}
</style>
