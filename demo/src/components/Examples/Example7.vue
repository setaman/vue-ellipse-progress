<template>
  <example-card>
    <vue-ellipse-progress
      :progress="56"
      color="#7579ff"
      empty-color="transparent"
      :empty-color-fill="emptyColorFill"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      :lineMode="{ mode: 'out', offset: 5 }"
      :legend="false"
      :animation="{ type: 'rs', duration: 700, delay: 1000 }"
      fontSize="1.5rem"
    >
      <img slot="legend-capture" height="80px" src="@/assets/upload.svg" />
    </vue-ellipse-progress>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
export default {
  name: "Example7",
  components: { ExampleCard },
  data: () => ({
    emptyColorFill: {
      gradient: {
        radial: false,
        direction: "",
        colors: [
          {
            color: "#754fc1",
            offset: "0",
            opacity: "0.3"
          },
          {
            color: "#366bfc",
            offset: "100",
            opacity: "0.3"
          }
        ]
      }
    }
  })
};
</script>

<style scoped></style>
