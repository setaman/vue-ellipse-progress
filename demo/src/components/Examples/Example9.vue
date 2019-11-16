<template>
  <example-card>
    <vue-ellipse-progress
      :progress="ratingProgress"
      color="#7579ff"
      empty-color="#324c7e"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      :lineMode="{ mode: 'out', offset: 5 }"
      legend
      :animation="{ type: 'rs', duration: 700, delay: 1000 }"
      :legendValue="rating"
      fontSize="1.5rem"
      font-color="white"
    >
      <span slot="legend-value">
        /5
      </span>
      <div slot="legend-capture">
        <p class="mb-0">24 REVIEWS</p>
        <v-rating dense small v-model="rating"></v-rating>
      </div>
    </vue-ellipse-progress>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
export default {
  name: "Example9",
  components: { ExampleCard },
  data: () => ({
    rating: 3
  }),
  computed: {
    ratingProgress() {
      return (this.rating * 100) / 5;
    }
  }
};
</script>

<style scoped></style>
