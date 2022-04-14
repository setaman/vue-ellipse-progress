<template>
  <div class="ep-svg-container" :class="{ 'ep-reverse': options.reverse }">
    <svg class="ep-svg" :height="options.size" :width="options.size" xmlns="http://www.w3.org/2000/svg">
      <g class="ep-circle--container">
        <defs>
          <gradient v-if="isColorGradient" :color="options.color" type="progress" :uid="uid" />
          <gradient v-if="isColorFillGradient" :color="options.colorFill" type="progress-fill" :uid="uid" />
          <gradient v-if="isEmptyColorGradient" :color="options.emptyColor" type="empty" :uid="uid" />
          <gradient v-if="isEmptyColorFillGradient" :color="options.emptyColorFill" type="empty-fill" :uid="uid" />
          <gradient v-if="isLoaderColorGradient" :color="options.loader.color" type="loader" :uid="uid" />
        </defs>
        <component :is="circleType" :options="computedOptions" />
      </g>
    </svg>
    <circle-dot v-if="options.dot.size" :options="computedOptions" />
  </div>
</template>

<script>
import Gradient from "../Gradient.vue";
import HalfCircleProgress from "./HalfCircle.vue";
import CircleProgress from "./Circle.vue";
import CircleDot from "./CircleDot.vue";

export default {
  name: "CircleContainer",
  components: { CircleDot, CircleProgress, HalfCircleProgress, Gradient },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  computed: {
    computedOptions() {
      return {
        ...this.options,
        uid: this.uid,
      };
    },
    circleType() {
      return this.options.half ? "half-circle-progress" : "circle-progress";
    },
    isColorGradient() {
      return Array.isArray(this.options.color.colors);
    },
    isColorFillGradient() {
      return Array.isArray(this.options.colorFill.colors);
    },
    isEmptyColorGradient() {
      return Array.isArray(this.options.emptyColor.colors);
    },
    isEmptyColorFillGradient() {
      return Array.isArray(this.options.emptyColorFill.colors);
    },
    isLoaderColorGradient() {
      return Array.isArray(this.options.loader.color.colors);
    },
    uid() {
      return this.$.uid;
    },
  },
};
</script>
<style lang="scss">
.ep-svg-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  &.ep-reverse {
    transform: scaleX(-1);
  }
}
g.ep-circle--container {
  transition: inherit;
  transform-origin: 50% 50%;
}

@mixin ep-progress--loading($offset, $circumference) {
  @keyframes ep-progress--loading {
    0% {
      stroke-dashoffset: $circumference;
    }
    50% {
      stroke-dashoffset: $offset;
    }
    100% {
      stroke-dashoffset: $circumference;
    }
  }
}

@mixin ep-half-progress--loading($circumference) {
  @keyframes ep-half-progress--loading {
    0% {
      opacity: 0.5;
      stroke-dashoffset: $circumference;
    }
    50% {
      opacity: 0.8;
      stroke-dashoffset: 0;
    }
    100% {
      opacity: 0.5;
      stroke-dashoffset: $circumference;
    }
  }
}

@mixin ep-progress--loading__rotation {
  @keyframes ep-progress--loading__rotation {
    100% {
      transform: rotate(360deg);
    }
  }
}

@mixin ep-progress--init__default($offset, $circumference) {
  @keyframes ep-progress--init__default {
    0% {
      stroke-dashoffset: $circumference;
    }
    100% {
      stroke-dashoffset: $offset;
    }
  }
}

@mixin ep-progress--init__rs($offset, $circumference) {
  @keyframes ep-progress--init__rs {
    0% {
      stroke-dashoffset: $circumference;
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: $offset;
    }
  }
}

@mixin ep-progress--init__reverse($offset, $circumference, $double_circumference) {
  @keyframes ep-progress--init__reverse {
    0% {
      stroke-dashoffset: $circumference;
    }
    50% {
      stroke-dashoffset: $double_circumference;
    }
    100% {
      stroke-dashoffset: $offset;
    }
  }
}

@mixin ep-progress--init__loop($offset, $circumference, $negative_circumference) {
  @keyframes ep-progress--init__loop {
    0% {
      stroke-dashoffset: $circumference;
    }
    33% {
      stroke-dashoffset: 0;
    }
    66% {
      stroke-dashoffset: $negative_circumference;
    }
    100% {
      stroke-dashoffset: $offset;
    }
  }
}

@mixin ep-progress--init__bounce($offset, $in_offset, $out_offset, $circumference) {
  @keyframes ep-progress--init__bounce {
    0% {
      animation-timing-function: linear;
      stroke-dashoffset: $circumference;
    }
    33% {
      stroke-dashoffset: $out_offset;
    }
    66% {
      stroke-dashoffset: $in_offset;
    }
    100% {
      stroke-dashoffset: $offset;
    }
  }
}

@mixin ep-dot--init__rs($dotStart, $dotEnd, $dot360) {
  @keyframes ep-dot--init__rs {
    0% {
      transform: rotate($dotStart);
    }
    50% {
      transform: rotate($dot360);
    }
    100% {
      transform: rotate($dotEnd);
    }
  }
}

@keyframes ep-dot--init__loop {
  0% {
    transform: rotate(var(--ep-dot-start));
  }
  33% {
    transform: rotate(var(--ep-dot-360));
  }
  66% {
    transform: rotate(var(--ep-dot-360));
  }
  100% {
    transform: rotate(var(--ep-dot-loop-end));
  }
}

@keyframes ep-dot--init__reverse {
  0% {
    transform: rotate(var(--ep-dot-360));
  }
  50% {
    transform: rotate(var(--ep-dot-360));
  }
  100% {
    transform: rotate(var(--ep-dot-end));
  }
}

@keyframes ep-dot--init__bounce {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes ep-dot--init__disabled {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.ep-circle--progress {
  animation-timing-function: ease-in-out;
  &.animation__default {
    animation-name: ep-progress--init__default;
  }
  &.animation__rs {
    animation-name: ep-progress--init__rs;
  }
  &.animation__bounce {
    animation-name: ep-progress--init__bounce;
  }
  &.animation__reverse {
    animation-name: ep-progress--init__reverse;
  }
  &.animation__loop {
    animation-name: ep-progress--init__loop;
  }
}

.ep-circle--loader {
  &.animation__loading {
    animation-name: ep-progress--loading, ep-progress--loading__rotation;
    animation-iteration-count: infinite !important;
    animation-duration: 2s, 1s;
    animation-timing-function: ease-in-out, linear;
  }
}

.ep-half-circle--loader {
  &.animation__loading {
    animation-name: ep-half-progress--loading;
    animation-iteration-count: infinite !important;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
  }
}

.ep-half-circle--empty,
.ep-half-circle--empty__fill,
.ep-circle--empty,
.ep-circle--empty__fill {
  &.ep-circle--nodata {
    opacity: 0.5;
  }
}

.ep-circle--progress__dot-container {
  animation-timing-function: ease-in-out;
  &.animation__rs {
    animation-name: ep-dot--init__rs;
  }
  &.animation__bounce {
    animation-fill-mode: forwards;
    animation-name: ep-dot--init__disabled;
  }
  &.animation__reverse {
    animation-name: ep-dot--init__reverse;
  }
  &.animation__loop {
    animation-name: ep-dot--init__loop;
  }
  &.ep-half-circle-progress__dot {
    &.animation__bounce {
      animation-fill-mode: forwards;
      animation-name: ep-dot--init__disabled;
    }
    &.animation__loop {
      animation-fill-mode: forwards;
      animation-name: ep-dot--init__disabled;
    }
  }
}

@include ep-progress--init__default(var(--ep-stroke-offset), var(--ep-circumference));
@include ep-progress--init__rs(var(--ep-stroke-offset), var(--ep-circumference));
@include ep-progress--init__bounce(
  var(--ep-stroke-offset),
  var(--ep-bounce-in-stroke-offset),
  var(--ep-bounce-out-stroke-offset),
  var(--ep-circumference)
);
@include ep-progress--init__reverse(
  var(--ep-reverse-stroke-offset),
  var(--ep-circumference),
  var(--ep-double-circumference)
);
@include ep-progress--init__loop(
  var(--ep-loop-stroke-offset),
  var(--ep-circumference),
  var(--ep-negative-circumference)
);
@include ep-progress--loading(var(--ep-loading-stroke-offset), var(--ep-circumference));
@include ep-half-progress--loading(var(--ep-circumference));
@include ep-progress--loading__rotation();
@include ep-dot--init__rs(var(--ep-dot-start), var(--ep-dot-end), var(--ep-dot-360));
</style>
