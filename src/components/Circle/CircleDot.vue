<template>
  <foreignObject
    :x="dotContainerPosition"
    :y="dotContainerPosition"
    class="ep-circle--progress__dot-container"
    :class="animationClass"
    :width="dotContainerSize"
    :height="dotContainerSize"
    :style="dotContainerStyle"
  >
    <span class="ep-circle--progress__dot" :class="{ hidden: isHidden }" :style="dotStyle"> </span>
  </foreignObject>
</template>

<script>
import { simplifiedProps } from "../interface";
import CircleMixin from "./circleMixin";

export default {
  props: { ...simplifiedProps },
  name: "CircleDot",
  mixins: [CircleMixin],
  computed: {
    dotContainerPosition() {
      return (this.size - this.radius * 2 - this.dotSize) / 2;
    },
    dotContainerSize() {
      return this.radius * 2 + this.dotSize;
    },
    dotContainerRotation() {
      let rotation = this.angle + 90;
      if (this.isInitialized && !this.loading && this.dataIsAvailable) {
        rotation += (this.computedProgress * 360) / 100;
      }
      return rotation;
    },
    dotContainerStyle() {
      return {
        transform: `rotate(${this.dotContainerRotation}deg)`,
        transitionDuration: this.loading ? "0s" : this.animationDuration,
        transitionTimingFunction: "ease-in-out",
        "--ep-dot-size": this.dotSize,
        "--ep-dot-start": `${this.dotStart}deg`,
        "--ep-dot-360": `${this.dotStart + 360}deg`,
        "--ep-dot-end": `${this.dotEnd}deg`,
      };
    },
    dotStyle() {
      return {
        borderRadius: `${this.dotSize / 2}px`,
        width: `${this.dotSize}px`,
        backgroundColor: this.dotColor,
        ...this.dot,
        transitionDuration: this.loading ? "0s" : this.animationDuration,
        height: `${this.dotSize}px`,
      };
    },
    dotStart() {
      return this.angle + 90;
    },
    dotEnd() {
      return this.dotStart + (this.computedProgress * 360) / 100;
    },
    isHidden() {
      return this.loading || !this.dataIsAvailable;
    },
  },
};
</script>

<style scoped lang="scss">
.ep-circle--progress__dot-container {
  border: 0px solid green;
  transform-origin: center center;
  &.hidden {
    transition-duration: 0s;
  }
}
.ep-circle--progress__dot {
  transition-duration: 0.3s;
  box-sizing: border-box;
  display: inline-block;
  background-color: #ff0000;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;

  &.hidden {
    transform: scale(0);
  }
}
</style>
