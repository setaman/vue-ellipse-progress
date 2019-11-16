<template>
  <section id="examples">
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
// import Btn from "@/components/Base/Btn";
import Example1 from "@/components/Examples/Example1";
import Example2 from "../Examples/Example2";
import Example3 from "../Examples/Example3";
import Example4 from "../Examples/Example4";
import Example5 from "../Examples/Example5";
import Example6 from "../Examples/Example6";
import Example7 from "../Examples/Example7";
import Example8 from "../Examples/Example8";
import Example9 from "../Examples/Example9";
export default {
  name: "Examples",
  components: { Example9, Example8, Example7, Example6, Example5, Example4, Example3, Example2, Example1 }
};
</script>

<style scoped lang="scss">
#examples {
  min-height: 100vh;
  padding: 200px 100px;
}
</style>
