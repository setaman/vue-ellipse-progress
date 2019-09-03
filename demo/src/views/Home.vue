<template>
  <v-container fluid grid-list-xl>
    <v-checkbox v-model="loading" label="loading"></v-checkbox>
    <v-checkbox v-model="noData" label="no data"></v-checkbox>
    <v-layout wrap row style="margin-top: 0px">
      <v-flex xs12>
        <v-layout text-xs-center wrap>
          <v-flex xs12 sm6 md4>
            <vue-ellipse-progress
              :progress="parseFloat(progress)"
              :color="color"
              :no-data="noData"
              :loading="loading"
              :emptyColor="emptyColor"
              :size="size"
              :thickness="5"
              :emptyThickness="6"
              :lineMode="{ mode: 'out', offset: 5 }"
              :legend="true"
              :animation="{ type: 'rs', duration: 700, delay: 1000 }"
              fontSize="3rem"
            >
            </vue-ellipse-progress>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <vue-ellipse-progress
              :progress="parseFloat(progress)"
              :no-data="noData"
              :color="color"
              :loading="loading"
              :emptyColor="emptyColor"
              :size="size"
              :thickness="5"
              :emptyThickness="6"
              :lineMode="{ mode: 'normal' }"
              :legend="true"
              :animation="{ type: 'bounce', duration: 700, delay: 1000 }"
              fontSize="3rem"
            >
              <span slot="legend-capture"> {{ loading ? "LOADING..." : "AMAZING PROGRESS" }} </span>
            </vue-ellipse-progress>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <vue-ellipse-progress
              :progress="parseFloat(tasksDonePercent)"
              :color="color"
              :loading="loading"
              :no-data="noData"
              :emptyColor="emptyColor"
              :size="size"
              :thickness="5"
              :emptyThickness="6"
              :lineMode="{ mode: 'in', offset: 10 }"
              :legend="true"
              :legend-value="tasksDone"
              :animation="{ type: 'loop', duration: 700, delay: 1000 }"
              fontSize="3rem"
              dash="5"
            >
              <span slot="legend-value">/200</span>
              <span slot="legend-capture">{{ loading ? "LOADING..." : "TASKS DONE" }}</span>
            </vue-ellipse-progress>
          </v-flex>
        </v-layout>
        <v-layout text-xs-center wrap>
          <v-flex xs12 sm6 md4>
            <vue-ellipse-progress
              :progress="parseFloat(progress)"
              :color="color"
              :colorFill="colorFill"
              :loading="loading"
              :no-data="noData"
              :emptyColor="emptyColor"
              :size="size"
              :thickness="5"
              :emptyThickness="6"
              :lineMode="{ mode: 'out', offset: 5 }"
              :legend="false"
              :animation="{ type: 'rs', duration: 700, delay: 1000 }"
              fontSize="3rem"
              half
            >
            </vue-ellipse-progress>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <vue-ellipse-progress
              id="timer-example"
              :progress="parseFloat(timerProgress)"
              :color="color"
              :loading="loading"
              :emptyColor="emptyColorTimer"
              :emptyColorFill="emptyColorFillWave"
              thickness="2%"
              emptyThickness="5%"
              :size="size"
              line="round"
              :dash="{ count: 60, spacing: 0.8 }"
              :lineMode="{ mode: 'in-overlap', offset: 10 }"
              :legend="true"
              :legendValue="sec"
              legendClass="legend-custom-style"
              :noData="noData"
              font-size="3rem"
              :animation="{ type: 'loop', duration: 700, delay: 1000 }"
            >
            </vue-ellipse-progress>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <vue-ellipse-progress
              :angle="90"
              :progress="parseFloat(progress)"
              :color="color"
              :loading="loading"
              :no-data="noData"
              :emptyColor="emptyColor"
              :size="size"
              :thickness="5"
              emptyThickness="2%"
              :lineMode="{ mode: 'in', offset: 10 }"
              :legend="false"
              :animation="{ type: 'rs', duration: 700, delay: 1000 }"
              fontSize="3rem"
              :dash="{ count: 60, spacing: 0.999 }"
              half
            >
            </vue-ellipse-progress>
          </v-flex>
        </v-layout>
        <v-layout text-xs-center wrap>
          <v-flex xs12 sm6 md4>
            <vue-ellipse-progress
              :progress="parseFloat(progress)"
              :color="color"
              :loading="loading"
              :no-data="noData"
              :emptyColor="emptyColor"
              :emptyColorFill="emptyColorFill"
              :size="size"
              :thickness="5"
              :emptyThickness="0"
              :lineMode="{ mode: 'out', offset: 5 }"
              :legend="false"
              :animation="{ type: 'rs', duration: 700, delay: 1000 }"
              fontSize="3rem"
            >
              <img slot="legend-capture" height="80px" src="@/assets/icon.svg" />
            </vue-ellipse-progress>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <vue-ellipse-progress
              :progress="parseFloat(progress)"
              :color="color"
              :loading="loading"
              :no-data="noData"
              :emptyColor="emptyColor"
              :size="size"
              :thickness="dynamicLineConfig.thickness"
              :emptyThickness="dynamicLineConfig.emptyThickness"
              :lineMode="{ mode: dynamicLineConfig.linemode, offset: dynamicLineConfig.offset }"
              :legend="true"
              :animation="{ type: 'rs', duration: 700, delay: 1000 }"
              fontSize="3rem"
            >
            </vue-ellipse-progress>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <vue-ellipse-progress
              :progress="parseFloat(ratingProgress)"
              :color="color"
              :loading="loading"
              :no-data="noData"
              :emptyColor="emptyColor"
              :size="size"
              :thickness="5"
              :emptyThickness="6"
              :lineMode="{ mode: 'out', offset: 5 }"
              legend
              :animation="{ type: 'rs', duration: 700, delay: 1000 }"
              :legendValue="rating"
              fontSize="3rem"
            >
              <span slot="legend-value">
                /5
              </span>
              <div slot="legend-capture">
                <p class="mb-0">24 REVIEWS</p>
                <v-rating small v-model="rating"></v-rating>
              </div>
            </vue-ellipse-progress>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const wait = (ms = 400) => new Promise(resolve => setTimeout(() => resolve(), ms));

export default {
  components: {},
  name: "Home",
  data: () => ({
    rating: 3,
    lineModes: ["normal", "in", "in-over", "out", "out-over", "top", "bottom"],
    loading: true,
    noData: false,
    progress: 95,
    dynamicLineConfig: {
      linemode: "normal",
      offset: 0,
      thickness: 5,
      emptyThickness: 5,
      dashCount: 0
    },
    timerProgress: 0,
    sec: 0,
    tasksDone: 125,
    size: 250,
    color: {
      gradient: {
        radial: false,
        direction: "",
        colors: [
          {
            color: "#198dea",
            offset: "0",
            opacity: "1"
          },
          {
            color: "#198dea",
            offset: "100",
            opacity: "1"
          }
        ]
      }
    },
    colorFill: {
      gradient: {
        radial: false,
        direction: "",
        colors: [
          {
            color: "#ffd1ff",
            offset: "0",
            opacity: "0.0"
          },
          {
            color: "#fad0c4",
            offset: "50",
            opacity: "0"
          }
        ]
      }
    },
    emptyColor: {
      gradient: {
        radial: false,
        direction: "",
        colors: [
          {
            color: "#8ec5fc",
            offset: "0",
            opacity: "0.3"
          },
          {
            color: "#e0c3fc",
            offset: "100",
            opacity: "0.3"
          }
        ]
      }
    },
    emptyColorFill: {
      gradient: {
        radial: false,
        direction: "",
        colors: [
          {
            color: "#8ec5fc",
            offset: "0",
            opacity: "0.3"
          },
          {
            color: "#e0c3fc",
            offset: "100",
            opacity: "0.3"
          }
        ]
      }
    },
    emptyColorTimer: {
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
    emptyColorFillWave: {
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
    ratingProgress() {
      return (this.rating * 100) / 5;
    },
    tasksDonePercent() {
      return (this.tasksDone * 100) / 200;
    }
  },
  methods: {
    runTimer() {
      setInterval(() => {
        if (this.sec === 5) {
          this.sec = 0;
          this.timerProgress = (this.sec * 100) / 5;
          return;
        }
        this.sec++;
        this.timerProgress = (this.sec * 100) / 5;
      }, 1000);
    },
    updateValues() {
      setInterval(() => {
        this.progress = this.randomNumberInRange();
        this.rating = this.randomNumberInRange(1, 5);
        this.tasksDone = this.randomNumberInRange(0, 200);
        this.dynamicLineConfig = {
          linemode: this.lineModes[this.randomNumberInRange(0, 6)],
          offset: this.randomNumberInRange(0, 20),
          thickness: this.randomNumberInRange(2, 20),
          dashCount: this.randomNumberInRange(0, 100)
        };
        this.dynamicLineConfig.emptyThickness = this.randomNumberInRange(
          0,
          this.dynamicLineConfig.linemode.includes("out") ? this.dynamicLineConfig.thickness : 20
        );
      }, 1000);
    },
    randomNumberInRange(min = 0, max = 100) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  async mounted() {
    await wait(3000);
    this.loading = false;
    this.runTimer();
    this.updateValues();
  }
};
</script>
