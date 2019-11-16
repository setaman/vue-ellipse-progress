<template>
  <div class="text-center mb-10">
    <div id="examples-controls" style="display: inline-block">
      <v-btn v-if="!isRunning" icon color="primary" @click="run">
        <v-icon>
          mdi-play
        </v-icon>
      </v-btn>
      <v-btn v-else icon color="error" @click="stop">
        <v-icon>
          mdi-stop
        </v-icon>
      </v-btn>
      <v-btn :disabled="isRunning" icon color="info" @click="refresh">
        <v-icon>
          mdi-refresh
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import Interval from "@/utils/interval";
export default {
  name: "ExamplesControls",
  data: () => ({
    isRunning: true
  }),
  methods: {
    run() {
      Interval.run();
      this.isRunning = true;
    },
    stop() {
      Interval.stop();
      this.isRunning = false;
    },
    refresh() {
      this.run();
      setTimeout(this.stop, 1000);
    }
  },
  mounted() {
    setTimeout(this.run, 2000);
  }
};
</script>

<style scoped lang="scss">
#examples-controls {
  //position: absolute;
  //width: 36px;
  display: inline-block;
  border-radius: 20px;
  background-color: #36447a;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.05);
}
</style>
