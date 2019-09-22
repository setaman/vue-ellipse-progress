<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <h3>
        Colors
      </h3>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row dense class="align-center">
        <v-col cols="4" class="prop-title">
          <a href="https://github.com/setaman/vue-ellipse-progress#color" target="_blank">color:</a>
        </v-col>
        <v-col cols="8">
          <v-row dense>
            <v-col cols="4" class="prop-title d-flex align-center">
              <v-checkbox
                class="ma-0"
                hide-details
                v-model="colorAsObject"
                @change="toggleColorAsObject"
                label="object"
              ></v-checkbox>
            </v-col>
            <v-col cols="8" class="prop-title d-flex align-center">
              <v-text-field v-if="!colorAsObject" hide-details outlined v-model="properties.color"> </v-text-field>
              <v-divider v-else></v-divider>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" v-if="colorAsObject">
          <v-row dense class="align-center">
            <v-col cols="4" class="prop-title">
              <div class="prop-secondary">
                radial:
              </div>
            </v-col>
            <v-col cols="8">
              <v-switch hide-details class="ma-0" v-model="properties.color.gradient.radial"></v-switch>
            </v-col>
          </v-row>
          <v-row dense class="align-center">
            <v-col cols="4" class="prop-title">
              <div class="prop-secondary">
                colors:
              </div>
            </v-col>
            <v-col cols="8">
              <v-row
                class="color-container"
                dense
                v-for="(colorObject, i) in properties.color.gradient.colors"
                :key="i"
              >
                <div class="remove-btn">
                  <v-btn
                    icon
                    color="error"
                    v-if="properties.color.gradient.colors.length > 1"
                    @click="removeColor(properties.color.gradient.colors, i)"
                  >
                    <v-icon>
                      mdi-close-circle
                    </v-icon>
                  </v-btn>
                </div>
                <v-col cols="4" class="d-flex align-center">
                  <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                      <span
                        v-on="on"
                        class="color-tag text-center"
                        :style="{ backgroundColor: `${colorObject.color}` }"
                      >
                        {{ colorObject.color }}
                      </span>
                    </template>
                    <v-color-picker v-model="colorObject.color" class="ma-0"></v-color-picker>
                  </v-menu>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Offset"
                    type="number"
                    min="0"
                    max="100"
                    hide-details
                    outlined
                    v-model="colorObject.offset"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Opacity"
                    type="number"
                    min="0"
                    step="0.1"
                    max="1"
                    hide-details
                    outlined
                    v-model="colorObject.opacity"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-btn icon color="primary" @click="addColor(properties.color.gradient.colors)">
                    <v-icon color="primary">
                      mdi-plus-circle-outline
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row dense class="align-center">
        <v-col cols="4" class="prop-title">
          <a href="https://github.com/setaman/vue-ellipse-progress#colorfill" target="_blank">colorFill:</a>
        </v-col>
        <v-col cols="8">
          <v-row dense>
            <v-col cols="4" class="prop-title d-flex align-center">
              <v-checkbox
                class="ma-0"
                hide-details
                v-model="colorFillAsObject"
                @change="toggleColorFillAsObject"
                label="object"
              ></v-checkbox>
            </v-col>
            <v-col cols="8" class="prop-title d-flex align-center">
              <v-text-field v-if="!colorFillAsObject" hide-details outlined v-model="properties.colorFill">
              </v-text-field>
              <v-divider v-else></v-divider>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" v-if="colorFillAsObject">
          <v-row dense class="align-center">
            <v-col cols="4" class="prop-title">
              <div class="prop-secondary">
                radial:
              </div>
            </v-col>
            <v-col cols="8">
              <v-switch hide-details class="ma-0" v-model="properties.colorFill.gradient.radial"></v-switch>
            </v-col>
          </v-row>
          <v-row dense class="align-center">
            <v-col cols="4" class="prop-title">
              <div class="prop-secondary">
                colors:
              </div>
            </v-col>
            <v-col cols="8">
              <v-row
                class="color-container"
                dense
                v-for="(colorObject, i) in properties.colorFill.gradient.colors"
                :key="i"
              >
                <div class="remove-btn">
                  <v-btn
                    icon
                    color="error"
                    v-if="properties.colorFill.gradient.colors.length > 1"
                    @click="removeColor(properties.colorFill.gradient.colors, i)"
                  >
                    <v-icon>
                      mdi-close-circle
                    </v-icon>
                  </v-btn>
                </div>
                <v-col cols="4" class="d-flex align-center">
                  <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                      <span
                        v-on="on"
                        class="color-tag text-center"
                        :style="{ backgroundColor: `${colorObject.color}` }"
                      >
                        {{ colorObject.color }}
                      </span>
                    </template>
                    <v-color-picker v-model="colorObject.color" class="ma-0"></v-color-picker>
                  </v-menu>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Offset"
                    type="number"
                    min="0"
                    max="100"
                    hide-details
                    outlined
                    v-model="colorObject.offset"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Opacity"
                    type="number"
                    min="0"
                    step="0.1"
                    max="1"
                    hide-details
                    outlined
                    v-model="colorObject.opacity"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-btn icon color="primary" @click="addColor(properties.colorFill.gradient.colors)">
                    <v-icon color="primary">
                      mdi-plus-circle-outline
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row dense class="align-center">
        <v-col cols="4" class="prop-title">
          <a href="https://github.com/setaman/vue-ellipse-progress#emptycolor" target="_blank">emptyColor:</a>
        </v-col>
        <v-col cols="8">
          <v-row dense>
            <v-col cols="4" class="prop-title d-flex align-center">
              <v-checkbox
                class="ma-0"
                hide-details
                v-model="emptyColorAsObject"
                @change="toggleEmptyColorAsObject"
                label="object"
              ></v-checkbox>
            </v-col>
            <v-col cols="8" class="prop-title d-flex align-center">
              <v-text-field v-if="!emptyColorAsObject" hide-details outlined v-model="properties.emptyColor">
              </v-text-field>
              <v-divider v-else></v-divider>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" v-if="emptyColorAsObject">
          <v-row dense class="align-center">
            <v-col cols="4" class="prop-title">
              <div class="prop-secondary">
                radial:
              </div>
            </v-col>
            <v-col cols="8">
              <v-switch hide-details class="ma-0" v-model="properties.emptyColor.gradient.radial"></v-switch>
            </v-col>
          </v-row>
          <v-row dense class="align-center">
            <v-col cols="4" class="prop-title">
              <div class="prop-secondary">
                colors:
              </div>
            </v-col>
            <v-col cols="8">
              <v-row
                dense
                class="color-container"
                v-for="(colorObject, i) in properties.emptyColor.gradient.colors"
                :key="i"
              >
                <div class="remove-btn">
                  <v-btn
                    icon
                    color="error"
                    v-if="properties.emptyColor.gradient.colors.length > 1"
                    @click="removeColor(properties.emptyColor.gradient.colors, i)"
                  >
                    <v-icon>
                      mdi-close-circle
                    </v-icon>
                  </v-btn>
                </div>
                <v-col cols="4" class="d-flex align-center">
                  <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                      <span
                        v-on="on"
                        class="color-tag text-center"
                        :style="{ backgroundColor: `${colorObject.color}` }"
                      >
                        {{ colorObject.color }}
                      </span>
                    </template>
                    <v-color-picker v-model="colorObject.color" class="ma-0"></v-color-picker>
                  </v-menu>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Offset"
                    type="number"
                    min="0"
                    max="100"
                    hide-details
                    outlined
                    v-model="colorObject.offset"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Opacity"
                    type="number"
                    min="0"
                    step="0.1"
                    max="1"
                    hide-details
                    outlined
                    v-model="colorObject.opacity"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-btn icon color="primary" @click="addColor(properties.emptyColor.gradient.colors)">
                    <v-icon color="primary">
                      mdi-plus-circle-outline
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row dense class="align-center">
        <v-col cols="4" class="prop-title">
          <a href="https://github.com/setaman/vue-ellipse-progress#emptycolorFill" target="_blank">emptyColorFill:</a>
        </v-col>
        <v-col cols="8">
          <v-row dense>
            <v-col cols="4" class="prop-title d-flex align-center">
              <v-checkbox
                class="ma-0"
                hide-details
                v-model="emptyColorFillAsObject"
                @change="toggleEmptyColorFillAsObject"
                label="object"
              ></v-checkbox>
            </v-col>
            <v-col cols="8" class="prop-title d-flex align-center">
              <v-text-field v-if="!emptyColorFillAsObject" hide-details outlined v-model="properties.emptyColorFill">
              </v-text-field>
              <v-divider v-else></v-divider>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" v-if="emptyColorFillAsObject">
          <v-row dense class="align-center">
            <v-col cols="4" class="prop-title">
              <div class="prop-secondary">
                radial:
              </div>
            </v-col>
            <v-col cols="8">
              <v-switch hide-details class="ma-0" v-model="properties.emptyColorFill.gradient.radial"></v-switch>
            </v-col>
          </v-row>
          <v-row dense class="align-center">
            <v-col cols="4" class="prop-title">
              <div class="prop-secondary">
                colors:
              </div>
            </v-col>
            <v-col cols="8">
              <v-row
                class="color-container"
                dense
                v-for="(colorObject, i) in properties.emptyColorFill.gradient.colors"
                :key="i"
              >
                <div class="remove-btn">
                  <v-btn
                    icon
                    color="error"
                    v-if="properties.emptyColorFill.gradient.colors.length > 1"
                    @click="removeColor(properties.emptyColorFill.gradient.colors, i)"
                  >
                    <v-icon>
                      mdi-close-circle
                    </v-icon>
                  </v-btn>
                </div>
                <v-col cols="4" class="d-flex align-center">
                  <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                      <span
                        v-on="on"
                        class="color-tag text-center"
                        :style="{ backgroundColor: `${colorObject.color}` }"
                      >
                        {{ colorObject.color }}
                      </span>
                    </template>
                    <v-color-picker v-model="colorObject.color" class="ma-0"></v-color-picker>
                  </v-menu>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Offset"
                    type="number"
                    min="0"
                    max="100"
                    hide-details
                    outlined
                    v-model="colorObject.offset"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Opacity"
                    type="number"
                    min="0"
                    step="0.1"
                    max="1"
                    hide-details
                    outlined
                    v-model="colorObject.opacity"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-btn icon color="primary" @click="addColor(properties.emptyColorFill.gradient.colors)">
                    <v-icon color="primary">
                      mdi-plus-circle-outline
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "CircleColorsEdit",
  props: {
    properties: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    colorAsObject: true,
    emptyColorAsObject: true,
    colorFillAsObject: true,
    emptyColorFillAsObject: true
  }),
  methods: {
    toggleDashAsObject() {
      if (this.dashAsObject) {
        this.properties.dash = {
          count: 60,
          spacing: 0.95
        };
      } else {
        this.properties.dash = "";
      }
    },
      toggleColorAsObject() {
          if (this.colorAsObject) {
              this.properties.color = {
                  gradient: {
                      radial: false,
                      direction: "",
                      colors: [
                          {
                              color: "#4481eb",
                              offset: "0",
                              opacity: "1"
                          },
                          {
                              color: "#04befe",
                              offset: "100",
                              opacity: "1"
                          }
                      ]
                  }
              };
          } else {
              this.properties.color = "#1871ff";
          }
      },
      toggleEmptyColorAsObject() {
          if (this.emptyColorAsObject) {
              this.properties.emptyColor = {
                  gradient: {
                      radial: false,
                      direction: "",
                      colors: [
                          {
                              color: "#f5f7fa",
                              offset: "0",
                              opacity: "1"
                          },
                          {
                              color: "#c3cfe2",
                              offset: "100",
                              opacity: "1"
                          }
                      ]
                  }
              };
          } else {
              this.properties.emptyColor = "lightgray";
          }
      },
      toggleColorFillAsObject() {
          if (this.colorFillAsObject) {
              this.properties.colorFill = {
                  gradient: {
                      radial: false,
                      direction: "",
                      colors: [
                          {
                              color: "#ffd1ff",
                              offset: "0",
                              opacity: "0.0"
                          },
                          {
                              color: "#fad0c4",
                              offset: "50",
                              opacity: "0"
                          }
                      ]
                  }
              };
          } else {
              this.properties.colorFill = "rgba(77,146,255,0.2)";
          }
      },
      toggleEmptyColorFillAsObject() {
          if (this.emptyColorFillAsObject) {
              this.properties.emptyColorFill = {
                  gradient: {
                      radial: false,
                      direction: "",
                      colors: [
                          {
                              color: "#8ec5fc",
                              offset: "0",
                              opacity: "0.1"
                          },
                          {
                              color: "#e0c3fc",
                              offset: "100",
                              opacity: "0.1"
                          }
                      ]
                  }
              };
          } else {
              this.properties.emptyColorFill = "transparent";
          }
      },

      addColor(colors) {
      colors.push({
        color: "#1871ff",
        offset: 50,
        opacity: 1
      });
    },
    removeColor(colors, index) {
      if (colors.length > 1) {
        colors.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.color-container {
  position: relative;
}
.remove-btn {
  position: absolute;
  left: -40px;
  top: 13px;
  bottom: 0;
  margin: auto;
}
</style>
