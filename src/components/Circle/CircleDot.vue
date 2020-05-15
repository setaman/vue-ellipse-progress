<template>
  <foreignObject
    :x="dotContainerPosition * 2"
    :y="dotContainerPosition"
    class="ep-circle--progress__dot-container"
    :width="radius * 2"
    :height="radius * 2"
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
      return (this.size - (this.radius + 5) * 2) / 2;
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
  border: 1px red solid;
  transform-origin: center center;
  &.hidden {
    transition-duration: 0s;
  }
}
.ep-circle--progress__dot {
  transition-duration: 0.3s;
  box-sizing: border-box;
  display: inline-block;
  // border: 1px solid white;
  height: $size;
  width: $size;
  background-color: #0000ff;
  border-radius: $size / 2;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;

  &.hidden {
    transform: scale(0);
  }
}
</style>
