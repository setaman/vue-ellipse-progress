<template>
  <div id="app">
    <ellipse-progress-container :progress="parseFloat(progress)"
                                :size="300"
                                :thickness="20"
                                :empty_thickness="120"
                                :line_mode="{mode: 'out', offset: 10}"
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
  color: black;
  //background-color: gray;
}
</style>
