<template>
  <div id="app">
    <div class="ep-test-card" :style="{ maxHeight: size + 2000 + 'px' }">
      <!--<div>
        <label for="progress">
          Progress
        </label>
        <input v-model="progress" max="100" min="0" type="number" id="progress" />
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
      </div>
      <vue-ellipse-progress
        :progress="parseFloat(progress)"
        :color="color"
        :loading="loading"
        :empty_color="empty_color"
        :size="Number(size)"
        :empty_thickness="5"
        :line_mode="{ mode: 'in', offset: 10 }"
        :legend="false"
        :animation="{ type: 'rs', duration: 700 }"
        dash="10 10"
        font_size="5rem"
      >
        <img slot="legend_capture" src="@/assets/icon.svg" />
      </vue-ellipse-progress>
      <vue-ellipse-progress
        id="timer-example"
        :progress="parseFloat(timerProgress)"
        :color="color"
        :loading="loading"
        :empty_color="empty_color"
        :empty_color_fill="empty_color_fill"
        thickness="2%"
        empty_thickness="5%"
        :size="Number(size)"
        line="round"
        :dash="{ count: 60, spacing: 0.95 }"
        :line_mode="{ mode: 'in-overlap', offset: 10 }"
        :legend="true"
        :legend_value="sec"
        legendClass="legend-custom-style"
        :noData="noData"
        :animation="{ type: 'reverse', duration: 700, delay: 300 }"
        font_size="4rem"
        font_color="white"
      >
        <span slot="legend_value">sec</span>
      </vue-ellipse-progress>-->
      <vue-ellipse-progress
        id="half-example"
        :progress="parseFloat(timerProgress)"
        :color="color"
        :loading="loading"
        :empty_color="empty_color"
        :empty_color_fill="empty_color_fill"
        thickness="10"
        empty_thickness="20"
        :size="Number(size)"
        line="round"
        :dash="{ count: 60, spacing: 0.95 }"
        :line_mode="{ mode: 'normal', offset: 0 }"
        :legend="true"
        :legend_value="sec"
        legendClass="legend-custom-style"
        :noData="noData"
        :animation="{ type: 'reverse', duration: 700, delay: 300 }"
        font_size="4rem"
        font_color="white"
        angle="0"
        half
      >
        <span slot="legend_value">sec</span>
      </vue-ellipse-progress>
      <!--<div>
        <label for="tasks">
          Tasks
        </label>
        <input v-model="tasks_done" max="200" min="0" type="number" id="tasks" />
        <button @click="updateTasksDone">Update Tasks</button>
      </div>
      <vue-ellipse-progress
        :progress="parseFloat(tasksDonePercent)"
        :color="color"
        :empty_color="empty_color"
        :size="size"
        :thickness="21"
        angle=""
        :loading="false"
        :empty_thickness="20"
        :line_mode="{ mode: 'normal', offset: 10 }"
        :legend_value="tasks_done"
        font_color="white"
        :animation="{ type: 'loop', duration: 1000 }"
        font_size="4rem"
        :noData="noData"
      >
        <span slot="legend_value">/200</span>
        <p slot="legend_capture">GOOD JOB</p>
      </vue-ellipse-progress>
      <vue-ellipse-progress
        :progress="parseFloat(tasksDonePercent)"
        :color="color"
        :empty_color="empty_color"
        :size="size"
        :thickness="21"
        angle=""
        :loading="loading"
        :empty_thickness="20"
        :line_mode="{ mode: 'normal', offset: 10 }"
        :legend_value="tasks_done"
        font_color="white"
        :animation="{ type: 'bounce', duration: 1000 }"
        font_size="2rem"
      >
        <span slot="legend_value">/200</span>
        <p style="margin-bottom: 0" slot="legend_capture">GOOD JOB</p>
      </vue-ellipse-progress>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data: () => ({
    loading: false,
    noData: false,
    progress: 45.5,
    timerProgress: 0,
    sec: 0,
    tasks_done: 125,
    size: 400,
    color: {
      gradient: {
        radial: true,
        direction: "",
        colors: [
          {
            color: "#3260FC",
            offset: "0",
            opacity: "0"
          },
          {
            color: "#3260FC",
            offset: "100",
            opacity: "1"
          }
        ]
      }
    },
    color_fill: {
      gradient: {
        radial: true,
        direction: "",
        colors: [
          {
            color: "#3260FC",
            offset: "40",
            opacity: "1"
          },
          {
            color: "transparent",
            offset: "80",
            opacity: "0.1"
          },
          {
            color: "transparent",
            offset: "95",
            opacity: "0.1"
          },
          {
            color: "#3260FC",
            offset: "95",
            opacity: "0.1"
          }
        ]
      }
    },
    empty_color: {
      gradient: {
        radial: false,
        direction: "",
        colors: [
          {
            color: "#050a27",
            offset: "0",
            opacity: "0.3"
          },
          {
            color: "#050a27",
            offset: "100",
            opacity: "0.3"
          }
        ]
      }
    },
    empty_color_fill: {
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
      return (this.tasks_done * 100) / 200;
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
          return;
        }
        this.sec++;
        this.timerProgress = (this.sec * 100) / 60;
      }, 1000);
    }
  },
  mounted() {
    // this.runTimer();
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
</style>
