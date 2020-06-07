<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example13.vue"
  >
    <component
      :is="component"
      :dot="{
        size: 46,
        backgroundColor: 'white',
        width: '2px',
      }"
      id="timer-example"
      :progress="progress"
      :determinate="determinate"
      line="butt"
      :color="emptyColor"
      empty-color="#324c7e"
      :emptyColorFill="emptyColorFill"
      thickness="46"
      emptyThickness="8"
      :size="180"
      dash="strict 60 0.8"
      lineMode="in -8"
      :legend="false"
      legendClass="legend-custom-style"
      fontSize="1.5rem"
      font-color="white"
      animation="loop 1000 100"
      :loading="loading"
      :no-data="noData"
    >
      <span slot="legend-caption">
        <span>{{ minPrefix }}{{ min }}</span>
        <span class="mx-2">:</span>
        <span>{{ secPrefix }}{{ sec }}</span>
      </span>
    </component>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import props from "@/components/Examples/examplesProps";

export default {
  name: "Example13",
  components: { ExampleCard },
  props,
  data: () => ({
    progress: 0,
    sec: 0,
    min: 0,
    tasksDone: 125,
    emptyColor: {
      radial: true,
      colors: [
        {
          color: "#3260FC",
          offset: "50",
          opacity: "0.15",
        },
        {
          color: "#3260FC",
          offset: "70",
          opacity: "0.15",
        },
        {
          color: "#3260FC",
          offset: "70",
          opacity: "0.1",
        },
        {
          color: "#3260FC",
          offset: "90",
          opacity: "1",
        },
        {
          color: "#3260FC",
          offset: "60",
          opacity: "1",
        },
        {
          color: "#3260FC",
          offset: "0",
          opacity: "0",
        },
      ],
    },
    emptyColorFill: {
      radial: true,
      colors: [
        {
          color: "#3260FC",
          offset: "50",
          opacity: "0.2",
        },
        {
          color: "#3260FC",
          offset: "50",
          opacity: "0.15",
        },
        {
          color: "#3260FC",
          offset: "70",
          opacity: "0.15",
        },
        {
          color: "#3260FC",
          offset: "70",
          opacity: "0.1",
        },
        {
          color: "#3260FC",
          offset: "90",
          opacity: "0.1",
        },
        {
          color: "transparent",
          offset: "90",
          opacity: "0.1",
        },
        {
          color: "transparent",
          offset: "95",
          opacity: "0.1",
        },
        {
          color: "transparent",
          offset: "95",
          opacity: "0.1",
        },
      ],
    },
  }),
  computed: {
    tasksDonePercent() {
      return (this.tasksDone * 100) / 200;
    },
    minPrefix() {
      return this.min < 10 ? "0" : "";
    },
    secPrefix() {
      return this.sec < 10 ? "0" : "";
    },
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
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
    },
  },
  mounted() {
    Interval.addTask(this.runTimer);
  },
};
</script>

<style scoped></style>
