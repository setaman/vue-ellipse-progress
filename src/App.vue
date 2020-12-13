<template>
  <div id="app">
    <div class="ep-test-card" :style="{ maxHeight: size.height + 2000 + 'px' }">
      <div>
        <label for="progress"> Progress </label>
        <input v-model="progress" max="100" min="-100" type="number" id="progress" />
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
      </div>
      <!--<div>
        <input type="checkbox" v-model="circles[0].loading" />
        <input type="checkbox" v-model="circles[1].loading" />
        <input type="checkbox" v-model="circles[2].loading" />
        <input type="checkbox" v-model="circles[3].loading" />
      </div>-->
      <div style="border: 1px solid red; display: inline-block">
        <ve-progress
          :size="200"
          :progress="progress"
          :legendValue="1315.56"
          animation="rs 2000 500"
          :loading="loading"
          :reverse="true"
          :thickness="20"
          :empty-thickness="10"
          dot="10 red"
          :loader="{ thickness: 40, color: 'red' }"
          line-mode="bottom"
          :no-data="noData"
          :determinate="determinate"
        >
          <template v-slot:default="{ counterTick }">
            <span
              :style="` transition: 0.5s; font-weight: bold; font-size: 1.6rem; color: ${
                counterTick.currentValue < 600 ? 'red' : 'yellow'
              };`"
            >
              {{ formattedPrice(counterTick.currentValue) }}
            </span>
          </template>
        </ve-progress>
      </div>
      <ve-progress
        dot="20 green"
        :loading="loading"
        :size="200"
        :progress="progress"
        :legend-value="125.1"
        half
        line-mode="out 20"
        :no-data="noData"
        :determinate="determinate"
        :loader="{ thickness: 40, color: 'red' }"
      >
        <template v-slot:legend-caption>
          <p slot="legend-caption">TASKS DONE</p>
        </template>
      </ve-progress>
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
    animation: "rs 1000 500",
  }),
  computed: {
    tasksDonePercent() {
      return (this.tasksDone * 100) / 200;
    },
  },
  methods: {
    formattedPrice(value) {
      return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
    },
    customFormatter({ currentValue /* start, end, startTime, previousCountStepValue, elapsed, currentRawValue */ }) {
      this.price = new Intl.NumberFormat("fr-FR").format(currentValue);
      // console.log(this.price, currentValue, currentRawValue, previousCountStepValue, start, end, startTime, elapsed);
      return `My ${this.price} Format`;
      /* return `
        <span style="font-weight: bold; font-size: 1.6rem">${this.price.slice(0, this.price.indexOf(","))}</span>
        <span>${this.price.slice(this.price.indexOf(","), this.price.length)}</span>
      `; */
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
