<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example9.vue"
  >
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
      :loading="loading"
      :no-data="noData"
    >
      <span slot="legend-value">
        <span class="mr-1">
          /
        </span>
        <span>
          5
        </span>
      </span>
      <div slot="legend-caption">
        <p class="mb-0">24 REVIEWS</p>
        <v-rating dense small v-model="rating"></v-rating>
      </div>
    </vue-ellipse-progress>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import randomNumberInRange from "@/utils/randomNumberInRange";
export default {
  name: "Example9",
  components: { ExampleCard },
  props: ["loading", "noData"],
  data: () => ({
    rating: 3
  }),
  computed: {
    ratingProgress() {
      return (this.rating * 100) / 5;
    }
  },
  methods: {
    randomizeOptions() {
      this.rating = randomNumberInRange(0, 5);
    }
  },
  mounted() {
    Interval.addTask(this.randomizeOptions);
  }
};
</script>

<style scoped></style>
