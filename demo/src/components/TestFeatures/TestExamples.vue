<template>
  <section id="test-examples">
    <examples-controls @loadingChange="setLoadingState" @noDataChange="setNoDataState" />
    <v-container fluid class="fill-height">
      <v-row>
        <example1 :loading="loading" :no-data="noData" :test="true" />

        <example2 :loading="loading" :no-data="noData" />

        <example3 :loading="loading" :no-data="noData" />

        <example4 :loading="loading" :no-data="noData" />

        <example5 :loading="loading" :no-data="noData" />

        <example6 :loading="loading" :no-data="noData" />

        <example7 :loading="loading" :no-data="noData" />

        <example8 :loading="loading" :no-data="noData" />

        <example9 :loading="loading" :no-data="noData" />
      </v-row>
    </v-container>
  </section>
</template>

<script>
import Example1 from "@/components/Examples/Example1";
import Example2 from "@/components/Examples/Example2";
import Example3 from "@/components/Examples/Example3";
import Example4 from "@/components/Examples/Example4";
import Example5 from "@/components/Examples/Example5";
import Example6 from "@/components/Examples/Example6";
import Example7 from "@/components/Examples/Example7";
import Example8 from "@/components/Examples/Example8";
import Example9 from "@/components/Examples/Example9";
import ExamplesControls from "@/components/Examples/ExamplesControls";
export default {
  name: "TestExamples",
  components: {
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
    noData: false
  }),
  methods: {
    setLoadingState(loadingState) {
      this.loading = loadingState;
    },
    setNoDataState(noDataState) {
      this.noData = noDataState;
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
