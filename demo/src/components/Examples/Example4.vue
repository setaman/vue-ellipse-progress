<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example4.vue"
  >
    <component
      :is="component"
      :progress="progress"
      :determinate="determinate"
      color="#7579ff"
      empty-color="#324c7e"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      :legend="false"
      lineMode="out 5"
      animation="rs 700 1000"
      fontSize="1.5rem"
      half
      :dot="{
        size: 5,
        width: '20px',
        backgroundColor: 'DEEPSKYBLUE',
        transitionDuration: '1000ms',
      }"
      :loading="loading"
      :no-data="noData"
    >
    </component>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import randomNumberInRange from "@/utils/randomNumberInRange";
import props from "@/components/Examples/examplesProps";

export default {
  name: "Example4",
  components: { ExampleCard },
  props,
  data: () => ({
    progress: 34,
  }),
  methods: {
    randomizeOptions() {
      this.progress = randomNumberInRange(0, 100);
    },
  },
  computed: {
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
  },
  mounted() {
    Interval.addTask(this.randomizeOptions);
  },
};
</script>

<style scoped></style>
