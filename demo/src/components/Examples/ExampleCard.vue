<template>
  <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="4 ">
    <div class="example-card text-center">
      <div class="example-card-circle">
        <slot> </slot>
      </div>
      <div class="example-card-btn pa-10">
        <btn block small :href="link" target="_blank" :buttonIcon="{ name: 'mdi-open-in-new', size: 'small' }">
          see code
        </btn>
      </div>
    </div>
  </v-col>
</template>

<script>
import Btn from "@/components/Base/Btn";
export default {
  name: "ExampleCard",
  components: { Btn },
  props: ["link"],
};
</script>

<style scoped></style>
