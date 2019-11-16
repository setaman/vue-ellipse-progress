<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example5.vue"
  >
    <vue-ellipse-progress
      id="timer-example"
      :progress="progress"
      color="#7579ff"
      empty-color="#324c7e"
      :emptyColorFill="emptyColorFill"
      thickness="2%"
      emptyThickness="5%"
      :size="180"
      :dash="{ count: 60, spacing: 0.8 }"
      :lineMode="{ mode: 'in-over', offset: 10 }"
      :legend="false"
      legendClass="legend-custom-style"
      fontSize="1.5rem"
      font-color="white"
      :animation="{ type: 'loop', duration: 1000, delay: 100 }"
    >
      <span slot="legend-capture">
        <span>{{ minPrefix }}{{ min }}</span>
        <span class="mx-2">:</span>
        <span>{{ secPrefix }}{{ sec }}</span>
      </span>
    </vue-ellipse-progress>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
export default {
  name: "Example5",
  components: { ExampleCard },
  data: () => ({
    progress: 0,
    sec: 0,
    min: 0,
    tasksDone: 125,
    emptyColor: {
      gradient: {
        radial: false,
        direction: "",
        colors: [
          {
            color: "#8ec5fc",
            offset: "0",
            opacity: "1"
          },
          {
            color: "#e0c3fc",
            offset: "100",
            opacity: "1"
          }
        ]
      }
    },
    emptyColorFill: {
      gradient: {
        radial: true,
        direction: "",
        colors: [
          {
            color: "#3260FC",
            offset: "50",
            opacity: "0.2"
          },
          {
            color: "#3260FC",
            offset: "50",
            opacity: "0.15"
          },
          {
            color: "#3260FC",
            offset: "70",
            opacity: "0.15"
          },
          {
            color: "#3260FC",
            offset: "70",
            opacity: "0.1"
          },
          {
            color: "#3260FC",
            offset: "90",
            opacity: "0.1"
          },
          {
            color: "transparent",
            offset: "90",
            opacity: "0.1"
          },
          {
            color: "transparent",
            offset: "95",
            opacity: "0.1"
          },
          {
            color: "transparent",
            offset: "95",
            opacity: "0.1"
          }
        ]
      }
    }
  }),
  computed: {
    tasksDonePercent() {
      return (this.tasksDone * 100) / 200;
    },
    minPrefix() {
      return this.min < 1 ? "0" : "";
    },
    secPrefix() {
      return this.sec < 10 ? "0" : "";
    }
  },
  methods: {
    runTimer() {
      if (this.sec === 60) {
        this.sec = 0;
        this.min++;
        this.progress = (this.sec * 100) / 60;
        return;
      }
      this.sec++;
      this.progress = (this.sec * 100) / 60;
    }
  },
  mounted() {
    Interval.addTask(this.runTimer);
  }
};
</script>

<style scoped></style>
