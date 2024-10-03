<template>
  <div id="app">
    <div class="ep-test-card" :style="{ maxHeight: size.height + 2000 + 'px' }">
      <div>
        <label for="progress"> Progress </label>
        <input v-model.number="progress" max="100" min="-100" type="number" id="progress"/>
        <button @click="updateProgress">Update</button>
        <button @click="updateTasksDone">Update Tasks</button>
        <label for="size"> Size </label>
        <input v-model="size" type="number" id="size"/>
        <label for="load">
          LOADING
          <input id="load" type="checkbox" v-model="loading"/>
        </label>
        <label for="nodata">
          No DATA
          <input id="nodata" type="checkbox" v-model="noData"/>
        </label>
        <label for="animation">
          Animation
          <input v-model="animation" id="animation"/>
        </label>
        <label for="line">
          line
          <input v-model="line" id="line"/>
        </label>
        <label for="determinate">
          Determinate
          <input id="determinate" type="checkbox" v-model="determinate"/>
          <input id="determinate1" type="checkbox" v-model="circles[0].determinate"/>
          <input id="determinate2" type="checkbox" v-model="determinate"/>
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
        <ve-progress :progress="progress" animation="default 0 0" :legend="120" :legend-formatter="({ currentValue }) => `Formatted: ${currentValue}`">
        </ve-progress>

<!--        <ve-progress :progress="progress" animation="bounce 3000 300" :legend-formatter="customFormatter"
                     :loading="loading">
          <template #legend>
            <span id="my-slot">Hello Circle</span>
          </template>
        </ve-progress>

        <ve-progress :progress="progress" color="red" line-mode="in 10" animation="bounce 3000 300" :loading="loading">
          <template #circle-progress="{ attrs }">
            <text x="20" y="35" class="small">Hey</text>
            <ellipse
              :cx="attrs.position"
              :cy="attrs.position"
              :rx="attrs.radius"
              :ry="attrs.radius"
              :stroke-dasharray="attrs.circumference"
              :stroke-dashoffset="attrs.strokeDashOffset"
              :stroke-width="attrs.thickness"
              :stroke="attrs.color"
              :stroke-linecap="attrs.line"
              :class="[attrs.class, attrs.animationClass]"
              fill="transparent"
              :style="attrs.styles"
            />
            &lt;!&ndash;              <line
              ref="polygon"
              :stroke-dashoffset="attrs.strokeDashOffset / 4"
              :stroke-dasharray="lineLength"
              id="lineAC"
              x1="0"
              y1="0"
              :x2="attrs.radius"
              :y2="attrs.radius"
              stroke="blue"
              stroke-width="4"
              fill="none"
            />&ndash;&gt;
          </template>
          <template #legend>
            <span id="my-slot">Hello custom Circle</span>
          </template>
        </ve-progress>

        <ve-progress half :progress="progress" line-mode="in" :empty-thickness="0" animation="bounce 3000 300"
                     :loading="loading">
          <template #circle-progress="{ attrs }">
            <polygon
              ref="polygon"
              :stroke-dashoffset="attrs.strokeDashOffset"
              :stroke-dasharray="582.4922485351562"
              points="10,10 190,100 10,190"
              style="fill: lime; stroke: purple; stroke-width: 3"
              :style="attrs.styles"
            />
          </template>
          <template #legend>
            <span id="my-slot">Hello custom Circle</span>
          </template>
        </ve-progress>

        <ve-progress :size="400" :progress="progress" animation="bounce 3000 300" :loading="loading">
          <template #circle-progress="{ attrs }">
            <svg xmlns="http://www.w3.org/2000/svg" :width="attrs.size" :height="attrs.size" fill="none" viewBox="0 0 53 53"
                 version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs">
              <path ref="customPath" fill="url(&quot;#SvgjsLinearGradient1660&quot;)"
                    :stroke-width="1.5"
                    :stroke="attrs.color"
                    :stroke-dashoffset="attrs.calculateProgressOffset(163.32911682128906)"
                    :stroke-dasharray="163.32911682128906"
                    :stroke-linecap="attrs.line"
                    :style="attrs.baseStyles"
                    d="M52.1 26.5c0 3.2-4.3 5.6-5.5 8.4-1.2 2.9.1 7.6-2.1 9.8-2.2 2.2-6.9.9-9.8 2.1-2.8 1.2-5.2 5.5-8.4 5.5s-5.6-4.3-8.4-5.5c-2.9-1.2-7.6.1-9.8-2.1-2.2-2.2-.9-6.9-2.1-9.8C4.8 32.1.5 29.7.5 26.5s4.3-5.6 5.5-8.4c1.2-2.9-.1-7.6 2.1-9.8 2.2-2.2 6.9-.9 9.8-2.1C20.7 5 23.1.7 26.3.7s5.6 4.3 8.4 5.5c2.9 1.2 7.6-.1 9.8 2.1 2.2 2.2.9 6.9 2.1 9.8 1.2 2.8 5.5 5.2 5.5 8.4Z"></path>
              <defs>
                <linearGradient gradientTransform="rotate(45 0.5 0.5)" id="SvgjsLinearGradient1660">
                  <stop stop-opacity=" 1" stop-color="rgba(105, 234, 203)" offset="0"></stop>
                  <stop stop-opacity=" 1" stop-color="rgba(234, 204, 248)" offset="0.48"></stop>
                  <stop stop-opacity=" 1" stop-color="rgba(102, 84, 241)" offset="1"></stop>
                </linearGradient>
              </defs>
            </svg>
          </template>
          <template #legend>
            <span id="my-slot">Hello custom Circle</span>
          </template>
        </ve-progress>

        <ve-progress :angle="0" :progress="progress" animation="bounce 3000 300" :loading="loading">
          <template #circle-progress="{ attrs }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -28 512 512" width="200" height="200">
              <path
                :stroke-width="20"
                :stroke="attrs.color"
                :stroke-dashoffset="attrs.calculateProgressOffset(1557.796875)"
                :stroke-dasharray="1557.796875"
                :style="attrs.baseStyles"
                ref="customPath"
                d="M471.383 44.578C444.879 15.832 408.512 0 368.973 0c-29.555 0-56.621 9.344-80.45 27.77C276.5 37.07 265.605 48.45 256 61.73c-9.602-13.277-20.5-24.66-32.527-33.96C199.648 9.344 172.582 0 143.027 0c-39.539 0-75.91 15.832-102.414 44.578C14.426 72.988 0 111.801 0 153.871c0 43.3 16.137 82.938 50.781 124.742 30.992 37.395 75.535 75.356 127.117 119.313 17.614 15.012 37.579 32.027 58.309 50.152A30.023 30.023 0 0 0 256 455.516a30.03 30.03 0 0 0 19.785-7.43c20.73-18.129 40.707-35.152 58.328-50.172 51.575-43.95 96.117-81.906 127.11-119.305C495.867 236.81 512 197.172 512 153.867c0-42.066-14.426-80.879-40.617-109.289zm0 0"
                fill="url(&quot;#SvgjsLinearGradient1040&quot;)"></path>
              <defs>
                <linearGradient id="SvgjsLinearGradient1040">
                  <stop stop-color="#f7f7f7" offset="0"></stop>
                  <stop stop-color="#83c3ff" offset="1"></stop>
                </linearGradient>
              </defs>
            </svg>
          </template>
          <template #legend>
            <span id="my-slot">Hello custom Circle</span>
          </template>
        </ve-progress>

        <ve-progress :angle="0" :progress="progress" color="pink" empty-color="transparent" animation="bounce 3000 300"
                     :loading="loading">
          <template #circle-progress="{ attrs }">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="none" viewBox="0 0 50 50"
                 version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs">
              <path :stroke-width="2"
                    :stroke="attrs.color"
                    :stroke-dashoffset="attrs.calculateProgressOffset(269.0625)"
                    :stroke-dasharray="269.0625"
                    ref="customPath"
                    fill="rgba(255, 251, 0, 1)"
                    :style="attrs.baseStyles"
                    d="M52.6 26.5c0-2.6-2.1-4.8-4.8-4.8h-3.7l3.2-1.9c2.3-1.3 3.1-4.2 1.7-6.5-1.3-2.3-4.2-3.1-6.5-1.7l-3.2 1.9 1.9-3.2c1.3-2.3.5-5.2-1.7-6.5-2.3-1.3-5.2-.5-6.5 1.7l-1.9 3.2V5c0-2.6-2.1-4.8-4.8-4.8-2.6 0-4.8 2.1-4.8 4.8v3.7l-1.9-3.2c-1.3-2.3-4.2-3.1-6.5-1.7-2.3 1.3-3.1 4.2-1.7 6.5l1.9 3.2-3.2-1.9c-2.3-1.3-5.2-.5-6.5 1.7-1.3 2.3-.5 5.2 1.7 6.5l3.2 1.9H4.8c-2.6 0-4.8 2.1-4.8 4.8 0 2.6 2.1 4.8 4.8 4.8h3.7l-3.2 1.9c-2.3 1.3-3.1 4.2-1.7 6.5 1.3 2.3 4.2 3.1 6.5 1.7l3.2-1.9-1.9 3.2c-1.3 2.3-.5 5.2 1.7 6.5 2.3 1.3 5.2.5 6.5-1.7l1.9-3.2V48c0 2.6 2.1 4.8 4.8 4.8 2.6 0 4.8-2.1 4.8-4.8v-3.7l1.9 3.2c1.3 2.3 4.2 3.1 6.5 1.7 2.3-1.3 3.1-4.2 1.7-6.5l-1.9-3.2 3.2 1.9c2.3 1.3 5.2.5 6.5-1.7 1.3-2.3.5-5.2-1.7-6.5l-3.2-1.9h3.7c2.7 0 4.8-2.1 4.8-4.8Z"></path>
            </svg>
          </template>
          <template #legend>
            <span id="my-slot">Hello custom Circle</span>
          </template>
        </ve-progress>-->
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
      {
        progress: 50,
        color: "red"
      },
      {
        progress: 50,
        color: "yellow" /* half: true, angle: -90, dot: "10 green" */
      },
      {
        progress: 50,
        color: "blue",
        reverse: false
      }
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
    gradient: {
      colors: [
        {
          color: "red",
          offset: "0",
          opacity: "1"
        },
        {
          color: "blue",
          offset: "100",
          opacity: "1"
        }
      ],
      radial: false
    },
    animation: "rs 1000 500",
    lineMode: "center",
    lineModes: ["center", "in", "in-over", "out", "out-over", "bottom", "top"]
  }),
  computed: {
    tasksDonePercent() {
      return (this.tasksDone * 100) / 200;
    }
  },
  methods: {
    logStuff(stuff) {
      console.log(stuff);
    },
    formattedPrice(value) {
      console.log(value);
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
      }).format(value);
    },
    customFormatter(c) {
      // console.log(c);
      const f = "0000";
      const f2 = "00";
      const cv = (c.currentRawValue || 0.0).toFixed(2)
        .toString()
        .split(".");
      const pre = `${f.slice(cv[0]?.length)}${cv[0]}`;
      const post = `${f2.slice((cv[1] ?? []).length)}${cv[1] ?? []}`;
      return `
        <span>
          <span style="font-size: 2rem; font-weight: bold">${[...pre].map((v) => v)
        .join(" ")}</span> .
          <span>${[...post].map((v) => v)
        .join(" ")}</span>
        </span>
      `;
    },
    updateProgress() {
      this.progress = parseFloat(Math.floor(Math.random() * 100)
        .toFixed(2));
    },
    updateTasksDone() {
      this.tasksDone = parseFloat((Math.random() * 200).toFixed(0));
      this.tasksDoneValue = this.tasksDone.toString()
        .replace(".", ",");
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
    // this.runTimer();
    console.log("=>customPath", this.$refs.customPath?.getTotalLength());
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
