<template>
  <section id="examples">
    <examples-controls />
    <v-container fluid class="fill-height">
      <v-row>
        <example1 />

        <example2 />

        <example3 />

        <example4 />

        <example5 />

        <example6 />

        <example7 />

        <example8 />

        <example9 />
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
export default {
  name: "Examples",
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
