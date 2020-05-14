<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example9.vue"
  >
    <component
      :is="component"
      :progress="ratingProgress"
      :determinate="determinate"
      color="#7579ff"
      empty-color="#324c7e"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      lineMode="out 5"
      legend
      animation="rs 700 1000"
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
    </component>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import randomNumberInRange from "@/utils/randomNumberInRange";
import props from "@/components/Examples/examplesProps";

export default {
  name: "Example9",
  components: { ExampleCard },
  props,
  data: () => ({
    rating: 3,
  }),
  computed: {
    ratingProgress() {
      return (this.rating * 100) / 5;
    },
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
  },
  methods: {
    randomizeOptions() {
      this.rating = randomNumberInRange(0, 5);
    },
  },
  mounted() {
    Interval.addTask(this.randomizeOptions);
  },
};
</script>

<style scoped></style>
