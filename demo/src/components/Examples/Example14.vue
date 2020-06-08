<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example14.vue"
  >
    <component
      :is="component"
      :data="circles"
      :gap="5"
      :angle="-90"
      animation="default 1000"
      :loading="false"
      :dot="thickness"
      :thickness="thickness"
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
  name: "Example14",
  components: { ExampleCard },
  props,
  data: () => ({
    angleOffset: 90,
    thickness: 3,
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
        progress: this.progress * (index || 1),
        dot: `3 ${this.colors[index]}`,
        angle: this.angleOffset + 15 * index,
        color: {
          radial: false,
          colors: [
            {
              color: this.colors[index],
              offset: 0,
              opacity: 0.5,
            },
            {
              color: this.colors[index],
              offset: 40,
              opacity: 0.5,
            },
          ],
        },
      }));
    },
  },
  methods: {
    randomizeOptions() {
      for (let i = 0; i < this.circlesData.length; i++) {
        this.$set(this.circlesData, i, { dot: 20 });
      }
      if (this.progress === 0) {
        this.progress = 10;
      } else {
        this.progress = 0;
      }
    },
  },
  mounted() {
    Interval.addTask(this.randomizeOptions);
  },
};
</script>

<style scoped></style>
