<template>
  <div id="app">
    <div class="test-card">
      <ellipse-progress-container :progress="parseFloat(progress)"
                                  :color="color"
                                  :color_fill="color"
                                  :size="500"
                                  :thickness="10"
                                  :empty_thickness="10"
                                  :line_mode="{mode: 'in', offset: 20}"
                                  font_size="5rem"/>
      <label for="progress">
        Progress
        <input v-model="progress" type="number" id="progress"/>
      </label>
    </div>
  </div>
</template>

<script>

import EllipseProgressContainer from '@/components/EllipseProgressContainer.vue';

export default {
  name: 'app',
  components: { EllipseProgressContainer },
  data: () => ({
    progress: 35,
    color: {
      gradient: {
        radial: false,
        direction: '',
        colors: [
          {
            color: '#572883',
            offset: '00',
            opacity: '0.8',
          },
          {
            color: '#3260FC',
            offset: '100',
            opacity: '0.5',
          },
        ],
      },
    },
  }),
};
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }
#app {
  height: 100vh;
  border: 2px red solid;
  color: black;
  background-color: #050a27;
}
</style>
