<template>
  <div id="app">
    <ellipse-progress-container :progress="parseFloat(progress)"
                                :size="500"
                                :thickness="2"
                                :empty_thickness="2"
                                :line_mode="{mode: 'normal', offset: 0}"
                                font_size="5rem"/>
    <label for="progress">
      Progress
      <input v-model="progress" type="number" id="progress"/>
    </label>
  </div>
</template>

<script>

import EllipseProgressContainer from '@/components/EllipseProgressContainer.vue';

export default {
  name: 'app',
  components: { EllipseProgressContainer },
  data: () => ({
    progress: 35,
  }),
};
</script>

<style lang="scss">
#app {
  border: 2px red solid;
  color: black;
  //background-color: gray;
}
</style>
