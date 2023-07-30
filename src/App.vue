<template>
  <div id="app">
    <div class="ep-test-card" :style="{ maxHeight: size.height + 2000 + 'px' }">
      <div>
        <label for="progress"> Progress </label>
        <input v-model.number="progress" max="100" min="-100" type="number" id="progress" />
        <button @click="updateProgress">Update</button>
        <button @click="updateTasksDone">Update Tasks</button>
        <label for="size"> Size </label>
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
          <input id="determinate" type="checkbox" v-model="determinate" />
          <input id="determinate1" type="checkbox" v-model="circles[0].determinate" />
          <input id="determinate2" type="checkbox" v-model="determinate" />
        </label>
        <label for="line-mode">
          Line mode
          <select id="line-mode" v-model="lineMode">
            <option v-for="option in lineModes" :key="option" :value="option">{{ option }}</option>
          </select>
        </label>
      </div>
      <!--<div>
        <input type="checkbox" v-model="circles[0].loading" />
        <input type="checkbox" v-model="circles[1].loading" />
        <input type="checkbox" v-model="circles[2].loading" />
        <input type="checkbox" v-model="circles[3].loading" />
      </div>-->
      <div style="border: 1px solid red; display: inline-block">
        <ve-progress :progress="progress" animation="bounce 3000 300" :legend-formatter="customFormatter" :loading="loading" half >
          <template #legend>
            <span id="my-slot">Hello Circle</span>
          </template>
        </ve-progress>
<!--        <ve-progress
          :progress="progress"
          :determinate="determinate"
          :size="size"
          :line-mode="lineMode"
          :loading="loading"
          animation="default 1500 1000"
          :data="[{progress: 10}, {progress: 10}]"
          :hide-legend="false"
          legend="-123.100"
          font-size="2rem"
        >
          <template #legend>
            <img style="width: 50px; height: 50px" src="../public/vue_ellipse.png" />
          </template>
          <template #legend-caption>
            <p>hello</p>
          </template>
        </ve-progress>-->
      </div>
    </div>
  </div>
</template>
<script>
// import { VeProgress } from "@/plugin";

export default {
  name: "app",
  // components: { VeProgress },
  data: () => ({
    line: "round",
    price: "",
    circles: [
      { progress: 50, color: "red" },
      { progress: 50, color: "yellow" /* half: true, angle: -90, dot: "10 green" */ },
      { progress: 50, color: "blue", reverse: false },
    ],
    determinate: false,
    loading: false,
    noData: false,
    progress: 50,
    timerProgress: 0,
    sec: 0,
    tasksDone: 125,
    tasksDoneValue: 0,
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
    gradient: {
      colors: [
        {
          color: "red",
          offset: "0",
          opacity: "1",
        },
        {
          color: "blue",
          offset: "100",
          opacity: "1",
        },
      ],
      radial: false,
    },
    animation: "rs 1000 500",
    lineMode: "center",
    lineModes: ["center", "in", "in-over", "out", "out-over", "bottom", "top"],
  }),
  computed: {
    tasksDonePercent() {
      return (this.tasksDone * 100) / 200;
    },
  },
  methods: {
    logStuff(stuff) {
      console.log(stuff);
    },
    formattedPrice(value) {
      console.log(value);
      return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
    },
    customFormatter(c) {
      // console.log(c);
      const f = "0000";
      const f2 = "00";
      const cv = (c.currentRawValue || 0.0).toFixed(2).toString().split(".");
      const pre = `${f.slice(cv[0]?.length)}${cv[0]}`;
      const post = `${f2.slice((cv[1] ?? []).length)}${cv[1] ?? []}`;
      return `
        <span>
          <span style="font-size: 2rem; font-weight: bold">${[...pre].map((v) => v).join(" ")}</span> .
          <span>${[...post].map((v) => v).join(" ")}</span>
        </span>
      `;
    },
    updateProgress() {
      this.progress = parseFloat(Math.floor(Math.random() * 100).toFixed(2));
    },
    updateTasksDone() {
      this.tasksDone = parseFloat((Math.random() * 200).toFixed(0));
      this.tasksDoneValue = this.tasksDone.toString().replace(".", ",");
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
    // this.runTimer();
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
