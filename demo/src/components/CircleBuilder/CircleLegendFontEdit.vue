<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <h3>
        Legend font
      </h3>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row dense class="align-center">
        <v-col cols="4" class="prop-title">
          <a href="https://github.com/setaman/vue-ellipse-progress#fontsize" target="_blank">fontSize:</a>
        </v-col>
        <v-col cols="8">
          <v-text-field type="text" hide-details outlined v-model="properties.fontSize"></v-text-field>
        </v-col>
      </v-row>
      <v-row dense class="align-center">
        <v-col cols="4" class="prop-title">
          <a href="https://github.com/setaman/vue-ellipse-progress#fontcolor" target="_blank">fontColor:</a>
        </v-col>
        <v-col cols="8">
          <v-menu max-width="300px" offset-y :close-on-content-click="false" class="elevation-0">
            <template v-slot:activator="{ on }">
              <span v-on="on" class="color-tag text-center" :style="{ backgroundColor: `${properties.fontColor}` }">
                {{ properties.fontColor }}
              </span>
            </template>
            <v-color-picker v-model="properties.fontColor" class="ma-0"></v-color-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "CircleLegendFontEdit",
  props: {
    properties: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
