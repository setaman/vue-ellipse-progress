<template>
  <section id="test-examples">
    <examples-controls
      @loadingChange="setLoadingState"
      @determinateChange="setDeterminateState"
      @noDataChange="setNoDataState"
      :test="true"
    />
    <v-container fluid class="fill-height">
      <v-row>
        <!--<example1 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />

        <example2 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />

        <example3 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />

        <example4 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />

        <example5 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />

        <example6 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />

        <example7 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />

        <example8 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />

        <example9 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />-->

        <example10 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />

        <example11 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />

        <example12 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />
      </v-row>
    </v-container>
  </section>
</template>

<script>
/*import Example1 from "@/components/Examples/Example1";
import Example2 from "@/components/Examples/Example2";
import Example3 from "@/components/Examples/Example3";
import Example4 from "@/components/Examples/Example4";
import Example5 from "@/components/Examples/Example5";
import Example6 from "@/components/Examples/Example6";
import Example7 from "@/components/Examples/Example7";
import Example8 from "@/components/Examples/Example8";
import Example9 from "@/components/Examples/Example9";*/
import ExamplesControls from "@/components/Examples/ExamplesControls";
import Example10 from "@/components/Examples/Example10";
import Example11 from "@/components/Examples/Example11";
import Example12 from "@/components/Examples/Example12";

export default {
  name: "TestExamples",
  components: {
    Example12,
    Example11,
    Example10,
    ExamplesControls
    /*Example9,
    Example8,
    Example7,
    Example6,
    Example5,
    Example4,
    Example3,
    Example2,
    Example1*/
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
