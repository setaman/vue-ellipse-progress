<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example8.vue"
  >
    <component
      :is="component"
      :progress="progress"
      :determinate="determinate"
      color="#7579ff"
      empty-color="#324c7e"
      :size="180"
      :thickness="thickness"
      :emptyThickness="emptyThickness"
      :lineMode="lineMode"
      animation="rs 700 1000"
      fontSize="1.5rem"
      font-color="white"
      :loading="loading"
      :no-data="noData"
      :dot="dot"
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
  name: "Example8",
  components: { ExampleCard },
  props,
  data: () => ({
    progress: 45,
    lineModes: ["normal", "in", "in-over", "out", "out-over", "top", "bottom"],
    thickness: 3,
    emptyThickness: 3,
    dot: { size: 1, width: "1px" },
    lineMode: "normal 0",
  }),
  computed: {
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
  },
  methods: {
    randomizeOptions() {
      const mode = this.lineModes[
        randomNumberInRange(0, this.lineModes.length - 1)
      ];
      const offset = randomNumberInRange(0, 15);
      this.lineMode = `${mode} ${offset}`.trim();
      this.progress = randomNumberInRange(0, 100);
      this.thickness = randomNumberInRange(1, 10);
      this.emptyThickness = randomNumberInRange(1, 10);
      this.dot.size = randomNumberInRange(1, 20);
      this.dot.width = `${randomNumberInRange(1, 10)}px`;
    },
  },
  mounted() {
    Interval.addTask(this.randomizeOptions);
  },
};
</script>

<style scoped></style>
