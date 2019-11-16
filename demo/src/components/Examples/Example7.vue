<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example7.vue"
  >
    <vue-ellipse-progress
      :progress="progress"
      color="#7579ff"
      empty-color="transparent"
      :empty-color-fill="emptyColorFill"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      :lineMode="{ mode: 'out', offset: 5 }"
      :legend="false"
      :animation="{ type: 'rs', duration: 700, delay: 1000 }"
      fontSize="1.5rem"
    >
      <img slot="legend-capture" height="80px" src="@/assets/upload.svg" />
    </vue-ellipse-progress>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import randomNumberInRange from "@/utils/randomNumberInRange";
export default {
  name: "Example7",
  components: { ExampleCard },
  data: () => ({
    progress: 34,
    emptyColorFill: {
      gradient: {
        radial: false,
        direction: "",
        colors: [
          {
            color: "#754fc1",
            offset: "0",
            opacity: "0.3"
          },
          {
            color: "#366bfc",
            offset: "100",
            opacity: "0.3"
          }
        ]
      }
    }
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
