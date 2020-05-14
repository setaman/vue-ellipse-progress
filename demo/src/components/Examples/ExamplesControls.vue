<template>
  <v-row>
    <v-col>
      <div class="text-center mb-10">
        <div id="examples-controls" class="">
          <div>
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
          <v-switch
            color="primary"
            class="ma-0 pr-3"
            dense
            hide-details
            v-model="loading"
            dark
            label="Loading"
            @change="emitLoadingChange"
          ></v-switch>
          <v-switch
            color="primary"
            class="ma-0 pr-5"
            dense
            hide-details
            v-model="noData"
            dark
            label="No data"
            @change="emitNoDataChange"
          ></v-switch>
          <v-switch
            v-if="test"
            color="primary"
            class="ma-0 pr-5"
            dense
            hide-details
            v-model="determinate"
            dark
            label="Determinate"
            @change="emitDeterminateChange"
          ></v-switch>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import Interval from "@/utils/interval";
export default {
  name: "ExamplesControls",
  props: ["test"],
  data: () => ({
    isRunning: true,
    loading: false,
    noData: false,
    determinate: false
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
    },
    emitLoadingChange() {
      this.$emit("loadingChange", this.loading);
    },
    emitNoDataChange() {
      this.$emit("noDataChange", this.noData);
    },
    emitDeterminateChange() {
      this.$emit("determinateChange", this.determinate);
    }
  },
  mounted() {
    setTimeout(this.run, 2000);
  }
};
</script>

<style scoped lang="scss">
#examples-controls {
  // display: inline-block;
  display: inline-flex;
  border-radius: 20px;
  background-color: #36447a;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.05);
}
@media screen and (max-width: 599px){
  #examples-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
  }
}
</style>
