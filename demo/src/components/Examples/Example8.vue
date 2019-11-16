<template>
  <example-card>
    <vue-ellipse-progress
      :progress="progress"
      color="#7579ff"
      empty-color="#324c7e"
      :size="180"
      :thickness="thickness"
      :emptyThickness="emptyThickness"
      :lineMode="lineMode"
      :animation="{ type: 'rs', duration: 700, delay: 1000 }"
      fontSize="1.5rem"
      font-color="white"
    >
    </vue-ellipse-progress>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import randomNumberInRange from "@/utils/randomNumberInRange";
export default {
  name: "Example8",
  components: { ExampleCard },
  data: () => ({
    progress: 45,
    lineModes: ["normal", "in", "in-over", "out", "out-over", "top", "bottom"],
    thickness: 3,
    emptyThickness: 3,
    lineMode: {
      mode: "normal",
      offset: 0
    }
  }),
  methods: {
    randomizeOptions() {
      this.lineMode = {
        mode: this.lineModes[randomNumberInRange(0, this.lineModes.length - 1)],
        offset: randomNumberInRange(0, 15)
      };
      this.progress = randomNumberInRange(0, 100);
      this.thickness = randomNumberInRange(1, 10);
      this.emptyThickness = randomNumberInRange(1, 10);
    }
  },
  mounted() {
    Interval.addTask(this.randomizeOptions);
    Interval.run();
  }
};
</script>

<style scoped></style>
