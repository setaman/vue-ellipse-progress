<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example6.vue"
  >
    <vue-ellipse-progress
      :progress="progress"
      :angle="90"
      color="#7579ff"
      empty-color="#324c7e"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      :legend="false"
      :lineMode="{ mode: 'out', offset: 5 }"
      :animation="{ type: 'rs', duration: 700, delay: 1000 }"
      fontSize="1.5rem"
      half
      :loading="loading"
      :no-data="noData"
    >
    </vue-ellipse-progress>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import randomNumberInRange from "@/utils/randomNumberInRange";
export default {
  name: "Example6",
  components: { ExampleCard },
  props: ["loading", "noData"],
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
