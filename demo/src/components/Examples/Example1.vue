<template>
  <example-card>
    <vue-ellipse-progress
      :progress="67"
      color="#7579ff"
      empty-color="#324c7e"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      :line-mode="{ mode: 'out', offset: 5 }"
      :animation="{ type: 'rs', duration: 700, delay: 1000 }"
      font-size="1.5rem"
      font-color="white"
    >
    </vue-ellipse-progress>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
export default {
  name: "Example1",
  components: { ExampleCard }
};
</script>

<style scoped></style>
