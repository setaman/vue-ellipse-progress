<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <h3>
        Animation
      </h3>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row dense class="align-center">
        <v-col cols="4" class="prop-title">
          <a href="https://github.com/setaman/vue-ellipse-progress#animation" target="_blank">animation:</a>
        </v-col>
        <v-col cols="8">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12">
          <v-row dense align="center">
            <v-col cols="4" class="prop-title">
              <div class="prop-secondary">
                type:
              </div>
            </v-col>
            <v-col cols="8">
              <v-select v-model="properties.animation.type" hide-details outlined :items="animations"></v-select>
            </v-col>
          </v-row>
          <v-row dense align="center">
            <v-col cols="4" class="prop-title">
              <div class="prop-secondary">
                duration:
              </div>
            </v-col>
            <v-col cols="8">
              <v-text-field
                type="number"
                min="0"
                hide-details
                outlined
                v-model="properties.animation.duration"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense align="center">
            <v-col cols="4" class="prop-title">
              <div class="prop-secondary">
                delay:
              </div>
            </v-col>
            <v-col cols="8">
              <v-text-field
                type="number"
                min="0"
                hide-details
                outlined
                v-model="properties.animation.delay"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "CircleAnimationEdit",
  props: {
    properties: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    animations: ["none", "rs", "loop", "reverse", "bounce"]
  })
};
</script>

<style scoped></style>
