<template>
  <section id="start">
    <v-container fluid class="fill-height pa-0">
      <v-row class="fill-height">
        <v-col sm="5" class="text-center d-flex align-center">
          <div>
            <h1 class="mb-5">Create beautiful animated circle progress bars</h1>
            <v-chip link color="primary">
              npm i vue-ellipse-progress
            </v-chip>
          </div>
        </v-col>
        <v-col sm="7" class="clip fill-height d-flex align-center">
          <div class="text-center fill-width">
            <vue-ellipse-progress :progress="56"/>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Start"
};
</script>

<style scoped lang="scss">
#start {
  height: 100vh;
  h1 {
    color: white;
    font-weight: normal;
    font-size: 3rem;
    letter-spacing: 0.3rem;
  }
}
.clip {
  background-image: url("../../assets/overlay.svg");
  background-position: left;
  background-size: cover;
}
</style>
