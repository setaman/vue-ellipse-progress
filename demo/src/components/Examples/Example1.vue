<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example1.vue"
  >
    <vue-ellipse-progress
      v-if="!test"
      :progress="progress"
      color="#7579ff"
      empty-color="#324c7e"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      :line-mode="{ mode: 'out', offset: 5 }"
      :animation="{ type: 'rs', duration: 700, delay: 1000 }"
      font-size="1.5rem"
      font-color="white"
      :loading="loading"
      :no-data="noData"
    >
    </vue-ellipse-progress>
    <vue-ellipse-progress-test :progress="50"></vue-ellipse-progress-test>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import randomNumberInRange from "@/utils/randomNumberInRange";

export default {
  name: "Example1",
  components: { ExampleCard },
  props: ["loading", "noData", "test"],
  data: () => ({
    progress: 34
  }),
  methods: {
    randomizeOptions() {
      this.progress = randomNumberInRange(0, 100);
    }
  },
  mounted() {
    Interval.addTask(this.randomizeOptions);
  }
};
</script>

<style scoped></style>
