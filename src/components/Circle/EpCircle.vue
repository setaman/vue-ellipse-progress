<template>
  <g class="ep-circle">
    <defs>
      <gradient v-if="options.color.gradient" :color="options.color" type="progress" :id="_uid" />
      <gradient v-if="options.colorFill.gradient" :color="options.colorFill" type="progress-fill" :id="_uid" />
      <gradient v-if="options.emptyColor.gradient" :color="options.emptyColor" type="empty" :id="_uid" />
      <gradient v-if="options.emptyColorFill.gradient" :color="options.emptyColorFill" type="empty-fill" :id="_uid" />
    </defs>
    <half-circle-progress v-if="options.half" :options="options" />
    <circle-progress v-else :options="options" />
  </g>
</template>

<script>
import Gradient from "../Gradient.vue";
import HalfCircleProgress from "../HalfCircleProgress.vue";
import CircleProgress from "../CircleProgress.vue";

export default {
  name: "EpCircle",
  components: { CircleProgress, HalfCircleProgress, Gradient },
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    id() {
      return this._uid;
    }
  }
};
</script>
<style scoped></style>
