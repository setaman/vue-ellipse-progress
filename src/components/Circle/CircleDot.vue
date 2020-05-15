<template>
  <foreignObject
    class="ep-circle--progress__dot-container"
    :width="size"
    :height="size"
    :style="{ transform: `rotate(${rotation}deg)`, transition: animationDuration }"
  >
    <span class="ep-circle--progress__dot"> </span>
    <!--<span class="ep-circle&#45;&#45;progress__dot-container" >
    </span>-->
    <!--:style="{ transform: `translateX(${radius}px) rotate(${150}deg)` }"-->
  </foreignObject>
</template>

<script>
import { simplifiedProps } from "../interface";
import CircleMixin from "./circleMixin";

export default {
  props: { ...simplifiedProps, radius: Number },
  name: "CircleDot",
  mixins: [CircleMixin],
  computed: {
    rotation() {
      return this.angle * -1 + (parseFloat(this.progress) * 360) / 100;
    },
  },
};
</script>

<style scoped lang="scss">
$size: 10px;
.ep-circle--progress__dot-container {
  /*position: absolute;
  width: 1px;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;*/
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
