<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example7.vue"
  >
    <component
      :is="component"
      :progress="progress"
      :determinate="determinate"
      color="#7579ff"
      empty-color="transparent"
      :empty-color-fill="emptyColorFill"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      lineMode="out 5"
      :legend="false"
      animation="rs 700 1000"
      fontSize="1.5rem"
      :loading="loading"
      :no-data="noData"
    >
      <img slot="legend-caption" height="80px" src="@/assets/upload.png" />
    </component>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import randomNumberInRange from "@/utils/randomNumberInRange";
import props from "@/components/Examples/examplesProps";

export default {
  name: "Example7",
  components: { ExampleCard },
  props,
  data: () => ({
    progress: 34,
    emptyColorFill: {
      radial: false,
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
  }),
  computed: {
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
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
