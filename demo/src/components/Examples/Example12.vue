<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example11.vue"
  >
    <component
      :is="component"
      :data="circles"
      :determinate="determinate"
      animation="default 1000"
      v-bind="options"
      :loading="loading"
      half
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
    circlesData: [
      {
        progress: randomNumberInRange(0, 20),
      },
      {
        progress: randomNumberInRange(0, 20),
      },
      {
        progress: randomNumberInRange(0, 20),
      },
      {
        progress: randomNumberInRange(0, 20),
      },
      {
        progress: randomNumberInRange(0, 20),
      },
      {
        progress: randomNumberInRange(0, 20),
      },
    ],
    colors: [
      "rgb(117,121,255)",
      "rgb(147, 112, 219)",
      "rgb(104,54,243)",
      "rgb(106, 90, 205)",
    ],
    options: {
      determinate: true,
      color: "#7579ff",
      "empty-color": "#324c7e",
      size: 180,
      thickness: 5,
      "line-mode": "out 5",
      "font-size": "1.5rem",
      "font-color": "white",
    },
  }),
  computed: {
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
    circles() {
      return this.circlesData;
    },
  },
  methods: {
    randomizeOptions() {
      const gap = randomNumberInRange(2, 10);
      const thickness = randomNumberInRange(1, 3);

      let updatedData = [];

      for (let n = 0; n < 6; n++) {
        updatedData.push({
          progress: randomNumberInRange(0, 100),
          angle: 20 * n, // randomNumberInRange(0, 100),
          color: this.colors[randomNumberInRange(0, 3)],
          gap,
          thickness,
        });
      }
      this.circlesData = updatedData;
    },
  },
  mounted() {
    Interval.addTask(this.randomizeOptions);
  },
};
</script>

<style scoped></style>
