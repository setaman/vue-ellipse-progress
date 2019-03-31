<template>
  <div id="app">
    <ellipse-progress-container :progress="45" :size="300" :thickness="10"/>
  </div>
</template>

<script>

import EllipseProgressContainer from '@/components/EllipseProgressContainer';

export default {
  name: 'app',
  components: { EllipseProgressContainer },
};
</script>

<style lang="scss">
#app {
  color: white;
  //background-color: gray;
}
</style>
