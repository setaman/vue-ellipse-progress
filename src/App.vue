<template>
  <div id="app">
    <div class="ep-test-card" :style="{maxHeight: size + 2000 + 'px'}">
      <div>
        <label for="progress">
          Progress
        </label>
        <input v-model="progress" max="100" min="0" type="number" id="progress"/>
        <button @click="updateProgress">Update</button>
        <label for="size">
          Size
        </label>
        <input v-model="size" type="number" id="size"/>
      </div>
      <vue-ellipse-progress :progress="parseFloat(progress)"
                            :color="color"
                            :empty_color="empty_color"
                            :size="parseInt(size)"
                            :thickness="21"
                            :empty_thickness="20"
                            :line_mode="{mode: 'normal', offset: 10}"
                            :legend="false"
                            font_size="5rem">
        <img slot="legend" src="@/assets/icon.svg">
      </vue-ellipse-progress>
      <div>
        <label for="tasks">
          Tasks
        </label>
        <input v-model="tasks_done" max="200" min="0" type="number" id="tasks"/>
      </div>
      <vue-ellipse-progress :progress="parseFloat(tasksDonePercent)"
                            :color="color"
                            :empty_color="empty_color"
                            :size="size"
                            :thickness="21"
                            :empty_thickness="20"
                            :line_mode="{mode: 'normal', offset: 10}"
                            :legend="true"
                            :legend_value="tasks_done"
                            :animation="{type:'', duration: 500}"
                            font_size="3rem">
        <span slot="legend_value">/200</span>
        <p slot="legend">GOOD JOB</p>
      </vue-ellipse-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data: () => ({
    tasks_done: 125,
    progress: 46,
    size: 400,
    color: {
      gradient: {
        radial: false,
        direction: '',
        colors: [
          {
            color: '#6546f7',
            offset: '0',
            opacity: '1',
          },
          {
            color: '#6849ff',
            offset: '100',
            opacity: '1',
          },
        ],
      },
    },
    color_fill: {
      gradient: {
        radial: false,
        direction: '',
        colors: [
          {
            color: '#572883',
            offset: '00',
            opacity: '0.1',
          },
          {
            color: '#fc4982',
            offset: '100',
            opacity: '0.1',
          },
        ],
      },
    },
    empty_color: {
      gradient: {
        radial: false,
        direction: '',
        colors: [
          {
            color: '#050a27',
            offset: '0',
            opacity: '1',
          },
          {
            color: '#050a27',
            offset: '100',
            opacity: '1',
          },
        ],
      },
    },
    empty_color_fill: {
      gradient: {
        radial: false,
        direction: '',
        colors: [
          {
            color: '#0062fc',
            offset: '0',
            opacity: '1',
          },
          {
            color: 'transparent',
            offset: '100',
            opacity: '0.1',
          },
        ],
      },
    },
  }),
  computed: {
    tasksDonePercent() {
      return this.tasks_done * 100 / 200;
    },
  },
  methods: {
    updateProgress() {
      this.progress = parseFloat((Math.floor(Math.random() * 100).toFixed(2)));
    },
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
  font-family: 'Arial',serif ;
  color: white;
  background-color: #050a27;
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
