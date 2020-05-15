<template>
  <vue-ellipse-progress :color="color" :size="200" v-bind="$props"> </vue-ellipse-progress>
</template>

<script>
import EllipseProgressContainer from "vue-ellipse-progress/src/components/EllipseProgressContainer";
export default {
  name: "CircleWrapper",
  props: {
    ...EllipseProgressContainer.options.props,
  },
};
</script>

<style scoped></style>
