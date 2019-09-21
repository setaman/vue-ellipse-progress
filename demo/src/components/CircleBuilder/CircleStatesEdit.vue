<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <h3>
        States
      </h3>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row dense class="align-center">
        <v-col cols="4" class="prop-title">
          <a href="https://github.com/setaman/vue-ellipse-progress#legend" target="_blank">legend:</a>
        </v-col>
        <v-col cols="8">
          <v-switch class="ma-0" hide-details v-model="properties.legend"></v-switch>
        </v-col>
      </v-row>
      <v-row dense class="align-center">
        <v-col cols="4" class="prop-title">
          <a href="https://github.com/setaman/vue-ellipse-progress#loading" target="_blank">loading:</a>
        </v-col>
        <v-col cols="8">
          <v-switch class="ma-0" hide-details v-model="properties.loading"></v-switch>
        </v-col>
      </v-row>
      <v-row dense class="align-center">
        <v-col cols="4" class="prop-title">
          <a href="https://github.com/setaman/vue-ellipse-progress#nodata" target="_blank">noData:</a>
        </v-col>
        <v-col cols="8">
          <v-switch class="ma-0" hide-details v-model="properties.noData"></v-switch>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "CircleStatesEdit",
  props: {
    properties: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
