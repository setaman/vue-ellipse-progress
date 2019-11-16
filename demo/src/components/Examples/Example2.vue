<template>
  <example-card>
    <vue-ellipse-progress
      :progress="45"
      color="#7579ff"
      empty-color="#324c7e"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      :animation="{ type: 'bounce', duration: 700, delay: 1000 }"
      fontSize="1.5rem"
      font-color="white"
    >
      <span slot="legend-capture"> PROGRESS </span>
    </vue-ellipse-progress>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
export default {
  name: "Example2",
  components: { ExampleCard }
};
</script>

<style scoped></style>
