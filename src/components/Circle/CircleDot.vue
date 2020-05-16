<template>
  <foreignObject
    :x="dotContainerPosition"
    :y="dotContainerPosition"
    class="ep-circle--progress__dot-container"
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
    dotContainerStyle() {
      let rotation = 0;
      if (this.isInitialized && !this.loading && this.dataIsAvailable) {
        rotation = this.angle * -1 + (this.computedProgress * 360) / 100;
      } else {
        rotation = this.angle * -1;
      }

      return {
        transform: `rotate(${rotation}deg)`,
        transitionDuration: this.loading ? "0s" : this.animationDuration,
        transitionTimingFunction: "ease-in-out",
      };
    },
    dotStyle() {
      return {
        transitionDuration: this.loading ? "0s" : this.animationDuration,
        "--ep-dot-size": this.dotSize,
        height: `${this.dotSize}px`,
        width: `${this.dotSize}px`,
        borderRadius: `${this.dotSize / 2}px`,
      };
    },
    isHidden() {
      return this.loading || !this.dataIsAvailable;
    },
  },
};
</script>

<style scoped lang="scss">
$size: 10px;
.ep-circle--progress__dot-container {
  border: 0px red solid;
  transform-origin: center center;
  &.hidden {
    transition-duration: 0s;
  }
}
.ep-circle--progress__dot {
  transition-duration: 0.3s;
  box-sizing: border-box;
  display: inline-block;
  background-color: #ffffff;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;

  &.hidden {
    transform: scale(0);
  }
}
</style>
