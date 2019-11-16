<template>
  <example-card>
    <vue-ellipse-progress
      id="timer-example"
      :progress="parseFloat(timerProgress)"
      color="#7579ff"
      empty-color="#324c7e"
      :emptyColorFill="emptyColorFill"
      thickness="2%"
      emptyThickness="5%"
      :size="180"
      :dash="{ count: 60, spacing: 0.8 }"
      :lineMode="{ mode: 'in-over', offset: 10 }"
      :legendValue="sec"
      legendClass="legend-custom-style"
      fontSize="1.5rem"
      font-color="white"
      :animation="{ type: 'loop', duration: 1000, delay: 100 }"
    >
    </vue-ellipse-progress>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
export default {
  name: "Example5",
  components: { ExampleCard },
  data: () => ({
    rating: 3,
    timerProgress: 0,
    sec: 0,
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
    }
  },
  methods: {
    runTimer() {
      setInterval(() => {
        if (this.sec === 60) {
          this.sec = 0;
          this.timerProgress = (this.sec * 100) / 60;
          return;
        }
        this.sec++;
        this.timerProgress = (this.sec * 100) / 60;
      }, 1000);
    }
  },
  mounted() {
    this.runTimer();
  }
};
</script>

<style scoped></style>
