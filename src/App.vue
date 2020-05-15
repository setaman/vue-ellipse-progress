<template>
  <div id="app">
    <div class="ep-test-card" :style="{ maxHeight: size.height + 2000 + 'px' }">
      <div>
        <label for="progress">
          Progress
        </label>
        <input v-model="progress" max="100" min="-10" type="number" id="progress" />
        <button @click="updateProgress">Update</button>
        <label for="size">
          Size
        </label>
        <input v-model="size" type="number" id="size" />
        <label for="load">
          LOADING
          <input id="load" type="checkbox" v-model="loading" />
        </label>
        <label for="nodata">
          No DATA
          <input id="nodata" type="checkbox" v-model="noData" />
        </label>
        <label for="animation">
          Animation
          <input v-model="animation" id="animation" />
        </label>
        <label for="line">
          line
          <input v-model="line" id="line" />
        </label>
        <label for="determinate">
          Determinate
          <input id="determinate" type="checkbox" v-model="circles[0].determinate" />
          <input id="determinate2" type="checkbox" v-model="determinate" />
        </label>
      </div>
      <!--<div>
        <input type="checkbox" v-model="circles[0].loading" />
        <input type="checkbox" v-model="circles[1].loading" />
        <input type="checkbox" v-model="circles[2].loading" />
        <input type="checkbox" v-model="circles[3].loading" />
      </div>-->
      <vue-ellipse-progress
        :loading="loading"
        :no-data="noData"
        :progress="progress"
        animation="default 1500 1000"
        :angle="-90"
        :legend="false"
        :thickness="10"
        :empty-thickness="10"
      />
    </div>
  </div>
</template>
<script>
import VueEllipseProgress from "./components/VueEllipseProgress.vue";

const randomNumberInRange = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1)) + min;

export default {
  name: "app",
  components: { VueEllipseProgress },
  data: () => ({
    line: "round",
    circles: [
      { progress: 25, color: "red", thickness: 5 },
      { progress: 35, color: "blue", gap: 0, thickness: 5 },
      { progress: 55, color: "green" },
    ],
    determinate: false,
    loading: false,
    noData: false,
    progress: 45.5,
    timerProgress: 0,
    sec: 0,
    tasks_done: 125,
    size: 300,
    emptyColorFill: {
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
      radial: true,
    },
    animation: "rs 200 5000",
  }),
  computed: {
    tasksDonePercent() {
      return (this.tasks_done * 100) / 200;
    },
    circlesTest() {
      const data = [];
      // generate random test data
      for (let n = 0; n < 6; n++) {
        data.push({
          progress: 25,
          gap: randomNumberInRange(),
          thickness: randomNumberInRange(),
          determinate: this.determinate,
        });
      }
      // some special cases
      data.push({ progress: 50, color: "red", thickness: 5 });
      data.push({ progress: 50, gap: 5 });
      data.push({ progress: 50, gap: 0 });
      data.push({ progress: 50 });
      return data;
    },
  },
  methods: {
    updateProgress() {
      this.progress = parseFloat(Math.floor(Math.random() * 100).toFixed(2));
    },
    updateTasksDone() {
      this.tasks_done = Math.floor(Math.random() * 200).toFixed(0);
    },
    runTimer() {
      setInterval(() => {
        if (this.sec === 60) {
          this.sec = 0;
          this.timerProgress = (this.sec * 100) / 60;
          this.circles[0].progress = this.timerProgress;
          return;
        }
        this.sec++;
        this.timerProgress = (this.sec * 100) / 60;
        this.circles[0].progress = this.timerProgress;
      }, 1000);
    },
  },
  mounted() {
    this.runTimer();
  },
};
</script>

<style lang="scss">
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  padding: 20px;
  display: flex;
  align-items: center;
  min-height: 100vh;
  font-family: "Arial", serif;
  color: white;
  background-color: #0b1656;
}
.ep-test-card {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background-color: #273266;
  label {
    padding-bottom: 5px;
    display: block;
  }
  input {
    transition: 0.3s;
    border: none;
    color: white;
    border-radius: 2px;
    padding: 5px 10px;
    background-color: #0b1656;
    border-bottom: gray 2px solid;
    outline: none;
    &:focus {
      border-bottom: #009eff 2px solid;
    }
  }
  button {
    padding: 5px 10px;
    border: none;
    border-radius: 2px;
    margin-left: 10px;
    color: white;
    outline: none;
    cursor: pointer;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
    background-color: #0b1656;
  }
  h1 {
    font-weight: normal;
    letter-spacing: 0.2rem;
  }
  img {
    color: white;
    width: 200px;
  }
}
.legend-custom-style {
  font-size: 3rem;
  color: #009eff;
}
</style>
