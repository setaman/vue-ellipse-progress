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
        :gap="5"
        color-fill="rgba(17,34,51,0.0)"
        :data="circlesTest"
        :size="400"
        :thickness="5"
        empty-color="rgba(17,34,51,0.66)"
        :loading="loading"
        :no-data="noData"
      >
        <span slot="legend-value">/hui</span>
        <p slot="legend-caption" class="ma-0">This is caption slot</p>
      </vue-ellipse-progress>

      <!--<vue-ellipse-progress
        id="timer-example"
        :progress="parseFloat(timerProgress)"
        :determinate="determinate"
        :loading="loading"
        :emptyColorFill="emptyColorFill"
        thickness="2%"
        emptyThickness="5%"
        :size="size"
        line="round"
        dash="strict 60 0.95"
        lineMode="top"
        :legend="true"
        :legendValue="sec"
        legendClass="legend-custom-style"
        :noData="noData"
        animation="loop 700 300"
      >
      </vue-ellipse-progress>-->
      <vue-ellipse-progress
        :progress="50"
        :animation="animation"
        :loading="loading"
        emptyColor="red"
        line-mode="out"
        dash="strict 60 0.8"
        :no-data="noData"
        :line="line"
      >
      </vue-ellipse-progress>
      <vue-ellipse-progress
        id="half-example"
        :progress="88"
        :size="200"
        line-mode="in-over 10"
        half
        :thickness="20"
        :empty-thickness="10"
        :colorFill="emptyColorFill"
      >
        <span slot="legend-value"></span>
      </vue-ellipse-progress>
      <div>
        <label for="tasks">
          Tasks
        </label>
        <input v-model="tasks_done" max="200" min="0" type="number" id="tasks" />
        <button @click="updateTasksDone">Update Tasks</button>
      </div>
      <!--<vue-ellipse-progress
        :progress="parseFloat(tasksDonePercent)"
        :color="color"
        :emptyColor="emptyColor"
        :size="size"
        :thickness="21"
        angle=""
        :loading="false"
        :emptyThickness="20"
        :lineMode="{ mode: 'normal', offset: 10 }"
        :legendValue="tasks_done"
        fontColor="white"
        :animation="{ type: 'loop', duration: 1000 }"
        fontSize="4rem"
        :noData="noData"
      >
        <span slot="legend-value">/200</span>
        <p slot="legend-capture">GOOD JOB</p>
      </vue-ellipse-progress>
      <vue-ellipse-progress
        :progress="parseFloat(tasksDonePercent)"
        :color="color"
        :emptyColor="emptyColor"
        :size="size"
        :thickness="21"
        angle=""
        :loading="loading"
        :emptyThickness="20"
        :lineMode="{ mode: 'normal', offset: 10 }"
        :legendValue="tasks_done"
        fontColor="white"
        :animation="{ type: 'bounce', duration: 1000 }"
        fontSize="2rem"
      >
        <span slot="legend-value">/200</span>
        <p style="margin-bottom: 0" slot="legend-capture">GOOD JOB</p>
      </vue-ellipse-progress>-->
    </div>
  </div>
</template>
<script>
const randomNumberInRange = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1)) + min;

export default {
  name: "app",
  components: {},
  data: () => ({
    line: "round",
    circles: [
      { progress: 25, color: "red", gap: 25, thickness: 5 },
      { progress: 35, color: "blue", gap: 10, thickness: 5 },
      { progress: 55, color: "green" }
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
      ],
      radial: true
    },
    animation: "rs 200 5000"
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
          thickness: randomNumberInRange()
        });
      }
      // some special cases
      data.push({ progress: 50, color: "red", thickness: 5 });
      data.push({ progress: 50, gap: 5 });
      data.push({ progress: 50, gap: 0 });
      data.push({ progress: 50 });
      const globalThickness = 5;
      const globalGap = 5;
      for (let i = 0; i < data.length; i++) {
        const circleData = data[i];

        const circleGap = circleData.gap !== undefined ? circleData.gap : globalGap;
        const circleThickness = circleData.thickness !== undefined ? circleData.thickness : globalThickness;

        let previousCirclesThickness;

        let radius;
        const baseRadius = 400 / 2 - circleThickness / 2;
        if (i > 0) {
          const previousCirclesData = data.filter((props, index) => index < i);
          previousCirclesThickness = previousCirclesData
            .map(({ gap, thickness }) => {
              const g = gap !== undefined ? gap : globalGap;
              const t = thickness !== undefined ? thickness : globalThickness;
              return g + t;
            })
            .reduce((acc, current) => acc + current);

          radius = baseRadius - (previousCirclesThickness + circleGap);
        } else {
          radius = baseRadius;
        }
        console.log("#", i, "|", circleData.thickness, circleData.gap, previousCirclesThickness, radius);
      }
      return data;
    }
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
    }
  },
  mounted() {
    this.runTimer();
  }
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
