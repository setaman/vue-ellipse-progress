<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example10.vue"
  >
    <component
      :is="component"
      :data="circles"
      :gap="5"
      :thickness="1"
      animation="default 1000"
      v-bind="options"
      :loading="true"
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
  name: "Example10",
  components: { ExampleCard },
  props,
  data: () => ({
    circlesData: [
      {
        progress: randomNumberInRange(0, 20),
        gap: 5
      },
      {
        progress: randomNumberInRange(0, 20)
      },
      {
        progress: randomNumberInRange(0, 20)
      },
      {
        progress: randomNumberInRange(0, 20)
      },
      {
        progress: randomNumberInRange(0, 20),
      },
      {
        progress: randomNumberInRange(0, 20),
      }
    ],
    colors: ["rgb(51,54,177)", "rgb(105,36,255)", "rgb(104,54,243)", "rgb(64,44,180)"],
    options: {
      determinate: true,
      color: "#7579ff",
      "empty-color": "#324c7e",
      size: 180,
      thickness: 5,
      "line-mode": "out 5",
      "font-size": "1.5rem",
      "font-color": "white"
    }
  }),
  computed: {
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
    circles() {
      return this.circlesData;
    }
  },
  methods: {
    randomizeOptions() {
      const previousGap = this.circlesData[0].gap;

      let gap;
      let thickness;
      let opacity;
      if (previousGap === 5) {
        gap = 10;
        thickness = 2;
        opacity = 0.3;
      } else {
        gap = 5;
        thickness = 1;
        opacity = 0.05
      }

      for (let n = 0; n < 6; n++) {
        const color = this.colors[randomNumberInRange(0, 3)];
        this.circlesData.splice(n, 1, {
          progress: randomNumberInRange(0, 100),
          angle: 20 * n, // randomNumberInRange(0, 100),
          color: color,
          emptyColor: color.replace(")", `, ${opacity})`).replace("rgb", "rgba"),
          gap,
          thickness
        });
      }
    }
  },
  mounted() {
    Interval.addTask(this.randomizeOptions);
  }
};
</script>

<style scoped></style>
