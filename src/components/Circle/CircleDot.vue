<template>
  <foreignObject class="ep-circle--progress__dot-container" :width="size" :height="size" :style="dotContainerStyle">
    <span class="ep-circle--progress__dot"> </span>
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
    dotContainerStyle() {
      let rotation = 0;
      if (this.isInitialized && !this.loading && this.dataIsAvailable) {
        rotation = this.angle * -1 + (this.computedProgress * 360) / 100;
      } else {
        rotation = this.angle * -1;
      }

      return {
        transform: `rotate(${rotation}deg)`,
        transitionDuration: this.animationDuration,
        transitionTimingFunction: "ease-in-out",
      };
    },
  },
};
</script>

<style scoped lang="scss">
$size: 10px;
.ep-circle--progress__dot-container {
  transform-origin: center center;
}
.ep-circle--progress__dot {
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
}
</style>
