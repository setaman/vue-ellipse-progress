<template>
  <section id="examples">
    <v-container>
      <examples-controls
        @loadingChange="setLoadingState"
        @noDataChange="setNoDataState"
        @determinateChange="setDeterminateState"
        :test="true"
      />
    </v-container>
    <v-container fluid>
      <v-row>
        <example1 :loading="loading" :determinate="determinate" :no-data="noData" />

        <example2 :loading="loading" :determinate="determinate" :no-data="noData" />

        <example3 :loading="loading" :determinate="determinate" :no-data="noData" />

        <example4 :loading="loading" :determinate="determinate" :no-data="noData" />

        <example5 :loading="loading" :determinate="determinate" :no-data="noData" />

        <example6 :loading="loading" :determinate="determinate" :no-data="noData" />

        <example7 :loading="loading" :determinate="determinate" :no-data="noData" />

        <example8 :loading="loading" :determinate="determinate" :no-data="noData" />

        <example9 :loading="loading" :determinate="determinate" :no-data="noData" />

        <example10 :loading="loading" :determinate="determinate" :no-data="noData" />

        <example11 :loading="loading" :determinate="determinate" :no-data="noData" />

        <example12 :loading="loading" :determinate="determinate" :no-data="noData" />
      </v-row>
    </v-container>
  </section>
</template>

<script>
import Example1 from "@/components/Examples/Example1";
import Example2 from "../Examples/Example2";
import Example3 from "../Examples/Example3";
import Example4 from "../Examples/Example4";
import Example5 from "../Examples/Example5";
import Example6 from "../Examples/Example6";
import Example7 from "../Examples/Example7";
import Example8 from "../Examples/Example8";
import Example9 from "../Examples/Example9";
import ExamplesControls from "../Examples/ExamplesControls";
import Example10 from "../Examples/Example10";
import Example11 from "../Examples/Example11";
import Example12 from "../Examples/Example12";
export default {
  name: "Examples",
  components: {
    Example12,
    Example11,
    Example10,
    ExamplesControls,
    Example9,
    Example8,
    Example7,
    Example6,
    Example5,
    Example4,
    Example3,
    Example2,
    Example1
  },
  data: () => ({
    loading: false,
    noData: false,
    determinate: false
  }),
  methods: {
    setLoadingState(loadingState) {
      this.loading = loadingState;
    },
    setNoDataState(noDataState) {
      this.noData = noDataState;
    },
    setDeterminateState(determinateState) {
      this.determinate = determinateState;
    }
  }
};
</script>

<style scoped lang="scss">
#examples {
  position: relative;
  min-height: 100vh;
  padding: 200px 100px;
}

@media only screen and (max-width: 1263px) {
  #examples {
    padding: 100px 0px;
  }
}
</style>
