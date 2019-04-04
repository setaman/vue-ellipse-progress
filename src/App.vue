<template>
  <div id="app">
    <ellipse-progress-container :progress="parseFloat(progress)"
                                :size="500"
                                :thickness="65"
                                :empty_thickness="20"
                                :line_mode="{mode: 'bottom', offset: 0}"
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
