<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example11.vue"
  >
    <component
      :is="component"
      :gap="5"
      :data="circles"
      :determinate="determinate"
      v-bind="options"
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
  name: "Example11",
  components: { ExampleCard },
  props,
  data: () => ({
    progress: 34,
    options: {
      determinate: true,
      color: "#7579ff",
      "empty-color": "#324c7e",
      size: 180,
      thickness: 5,
      "empty-thickness": 3,
      "line-mode": { mode: "out", offset: 5 },
      animation: { type: "rs", duration: 700, delay: 1000 },
      "font-size": "1.5rem",
      "font-color": "white"
    }
  }),
  computed: {
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
    circles() {
      const progress = this.progress;
      return [
        {
          progress: progress + randomNumberInRange(0, 20),
          thickness: 3
        },
        {
          progress: progress + randomNumberInRange(0, 20),
          thickness: 4,

          color: "RGB(218, 112, 214)",
          emptyColor: "RGBA(218, 112, 214, 0.2)"
        },
        {
          progress: progress + randomNumberInRange(0, 20),
          color: "RGB(0, 206, 209)",
          thickness: 5,
          emptyColor: "RGBA(0, 206, 209, 0.2)"
        }
      ];
    }
  },
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
