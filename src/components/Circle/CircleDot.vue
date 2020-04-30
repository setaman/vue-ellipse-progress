<template>
  <foreignObject
    class="ep-circle--progress__dot-container"
    :width="size"
    :height="size"
    :style="{ transform: `rotate(${angle * -1}deg) rotateX(0deg)` }"
  >
    <span class="ep-circle--progress__dot"> </span>
    <!--<span class="ep-circle&#45;&#45;progress__dot-container" >
    </span>-->
    <!--:style="{ transform: `translateX(${radius}px) rotate(${150}deg)` }"-->
  </foreignObject>
</template>

<script>
import { simplifiedProps } from "../interface";

export default {
  props: { ...simplifiedProps, radius: Number },
  name: "CircleDot",
};
</script>

<style scoped>
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
  display: inline-block;
  height: 20px;
  width: 20px;
  background-color: #5c5cfa;
  border-radius: 10px;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;
}
</style>
