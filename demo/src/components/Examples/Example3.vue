<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example3.vue"
  >
    <component
      :is="component"
      :progress="tasksDonePercent"
      :determinate="determinate"
      color="#7579ff"
      empty-color="#324c7e"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      lineMode="in 10"
      :legend-value="tasksDone"
      animation="loop 700 1000"
      fontSize="1.5rem"
      font-color="white"
      dash="5"
      :loading="loading"
      :no-data="noData"
    >
      <span slot="legend-value"> / 200</span>
      <span slot="legend-caption">TASKS DONE</span>
    </component>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import randomNumberInRange from "@/utils/randomNumberInRange";
import props from "@/components/Examples/examplesProps";

export default {
  name: "Example3",
  components: { ExampleCard },
  props,
  data: () => ({
    tasksDone: 125,
  }),
  computed: {
    tasksDonePercent() {
      return (this.tasksDone * 100) / 200;
    },
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
  },
  methods: {
    randomizeOptions() {
      this.tasksDone = randomNumberInRange(0, 200);
    },
  },
  mounted() {
    Interval.addTask(this.randomizeOptions);
  },
};
</script>

<style scoped></style>
