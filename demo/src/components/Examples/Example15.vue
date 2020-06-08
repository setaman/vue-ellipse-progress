<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example15.vue"
  >
    <component
      :is="component"
      :data="circles"
      :angle="-90"
      animation="default 1500"
      :loading="false"
      :gap="-4"
      :thickness="4"
      empty-color="transparent"
      :size="180"
      :no-data="noData"
    >
    </component>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import props from "@/components/Examples/examplesProps";

export default {
  name: "Example15",
  components: { ExampleCard },
  props,
  data: () => ({
    thickness: 3,
    angleOffset: 90,
    progress: 0,
    circlesData: [
      {
        progress: 0,
      },
      {
        progress: 0,
      },
      {
        progress: 0,
      },
      {
        progress: 0,
      },
      {
        progress: 0,
      },
      {
        progress: 0,
      },
      {
        progress: 0,
      },
      {
        progress: 0,
      },
      {
        progress: 0,
      },
      {
        progress: 0,
      },
    ],
    colors: [
      "rgb(51,54,177)",
      "rgb(105,36,255)",
      "rgb(104,54,243)",
      "rgb(64,44,180)",
      "rgb(51,54,177)",
      "rgb(105,36,255)",
      "rgb(104,54,243)",
      "rgb(64,44,180)",
      "rgb(51,54,177)",
      "rgb(105,36,255)",
    ],
  }),
  computed: {
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
    circles() {
      return this.circlesData.map((data, index) => ({
        ...data,
        progress: this.progress * (index + 1),
        dot: `4 ${this.colors[index]}`,
        color: "transparent",
      }));
    },
  },
  methods: {
    randomizeOptions() {
      if (this.progress === 0) {
        this.progress = 10;
      } else {
        this.progress = 0;
      }
    },
  },
  mounted() {
    Interval.addTask(this.randomizeOptions, 1500);
  },
};
</script>

<style scoped></style>
