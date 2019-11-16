<template>
  <example-card>
    <vue-ellipse-progress
      :progress="45"
      :angle="90"
      color="#7579ff"
      empty-color="#324c7e"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      :legend="false"
      :lineMode="{ mode: 'out', offset: 5 }"
      :animation="{ type: 'rs', duration: 700, delay: 1000 }"
      fontSize="1.5rem"
      half
    >
    </vue-ellipse-progress>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
export default {
  name: "Example6",
  components: { ExampleCard }
};
</script>

<style scoped></style>
