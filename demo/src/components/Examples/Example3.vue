<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example3.vue"
  >
    <vue-ellipse-progress
      :progress="tasksDonePercent"
      color="#7579ff"
      empty-color="#324c7e"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      :lineMode="{ mode: 'in', offset: 10 }"
      :legend-value="tasksDone"
      :animation="{ type: 'loop', duration: 700, delay: 1000 }"
      fontSize="1.5rem"
      font-color="white"
      dash="5"
      :loading="loading"
      :no-data="noData"
    >
      <span slot="legend-value">/200</span>
      <span slot="legend-capture">TASKS DONE</span>
    </vue-ellipse-progress>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import randomNumberInRange from "@/utils/randomNumberInRange";
export default {
  name: "Example3",
  components: { ExampleCard },
  props: ["loading", "noData"],
  data: () => ({
    tasksDone: 125
  }),
  computed: {
    tasksDonePercent() {
      return (this.tasksDone * 100) / 200;
    }
  },
  methods: {
    randomizeOptions() {
      this.tasksDone = randomNumberInRange(0, 200);
    }
  },
  mounted() {
    Interval.addTask(this.randomizeOptions);
  }
};
</script>

<style scoped></style>
