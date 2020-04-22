<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example12.vue"
  >
    <component
      :is="component"
      :data="circles"
      :gap="5"
      half
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
  name: "Example12",
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
      animation: "rs 700 1000",
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
          progress: progress + randomNumberInRange(0, 20)
        },
        {
          progress: progress + randomNumberInRange(0, 20),
          color: "RGB(218, 112, 214)",
          emptyColor: "RGBA(218, 112, 214, 0.2)"
        },
        {
          progress: progress + randomNumberInRange(0, 20),
          color: "RGB(0, 206, 209)",
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
