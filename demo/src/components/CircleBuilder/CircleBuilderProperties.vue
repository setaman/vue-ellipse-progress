<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h3>
          General
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">
            <a href="https://github.com/setaman/vue-ellipse-progress#progress" target="_blank">progress:</a>
          </v-col>
          <v-col cols="8">
            <v-text-field hide-details outlined type="number" min="0" max="100" v-model="properties.progress" required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">
            <a href="https://github.com/setaman/vue-ellipse-progress#size" target="_blank">size:</a>
          </v-col>
          <v-col cols="8">
            <v-text-field hide-details outlined type="number" v-model="properties.size" required> </v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">
            <a href="https://github.com/setaman/vue-ellipse-progress#angle" target="_blank">angle:</a>
          </v-col>
          <v-col cols="8">
            <v-text-field hide-details outlined type="number" v-model="properties.angle" required> </v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">
            <a href="https://github.com/setaman/vue-ellipse-progress#legendValue" target="_blank">legendValue:</a>
          </v-col>
          <v-col cols="8">
            <v-text-field hide-details outlined type="number" v-model="properties.legendValue" required> </v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">
            <a href="https://github.com/setaman/vue-ellipse-progress#half" target="_blank">half:</a>
          </v-col>
          <v-col cols="8">
            <v-switch class="ma-0" hide-details v-model="properties.half"></v-switch>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h3>
          Line style
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">
            <a href="https://github.com/setaman/vue-ellipse-progress#line" target="_blank">line:</a>
          </v-col>
          <v-col cols="8">
            <v-select v-model="properties.line" hide-details outlined :items="line"></v-select>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">
            <a href="https://github.com/setaman/vue-ellipse-progress#thickness" target="_blank">thickness:</a>
          </v-col>
          <v-col cols="8">
            <v-text-field hide-details outlined v-model="properties.thickness"></v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">
            <a href="https://github.com/setaman/vue-ellipse-progress#emptythcikness" target="_blank">emptyThickness:</a>
          </v-col>
          <v-col cols="8">
            <v-text-field hide-details outlined v-model="properties.emptyThickness"></v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">
            <a href="https://github.com/setaman/vue-ellipse-progress#linemode" target="_blank">lineMode:</a>
          </v-col>
          <v-col cols="8" class="prop-title"><v-divider></v-divider></v-col>
          <v-col cols="12">
            <v-row dense class="align-center">
              <v-col cols="4" class="prop-title">
                <div class="prop-secondary">
                  mode:
                </div>
              </v-col>
              <v-col cols="8">
                <v-select v-model="properties.lineMode.mode" hide-details outlined :items="lineMode"></v-select>
              </v-col>
            </v-row>
            <v-row dense class="align-center">
              <v-col cols="4" class="prop-title">
                <div class="prop-secondary">
                  offset:
                </div>
              </v-col>
              <v-col cols="8">
                <v-text-field hide-details outlined v-model="properties.lineMode.offset"> </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">
            <a href="https://github.com/setaman/vue-ellipse-progress#dash" target="_blank">dash:</a>
          </v-col>
          <v-col cols="8">
            <v-row dense>
              <v-col cols="4" class="prop-title d-flex align-center">
                <v-checkbox
                  @change="toggleDashAsObject"
                  class="ma-0"
                  hide-details
                  v-model="dashAsObject"
                  label="object"
                ></v-checkbox>
              </v-col>
              <v-col cols="8" class="prop-title d-flex align-center">
                <v-text-field v-if="!dashAsObject" hide-details outlined v-model="properties.dash"> </v-text-field>
                <v-divider v-else></v-divider>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" v-if="dashAsObject">
            <v-row dense class="align-center">
              <v-col cols="4" class="prop-title">
                <div class="prop-secondary">
                  count:
                </div>
              </v-col>
              <v-col cols="8">
                <v-text-field hide-details type="number" outlined v-model="properties.dash.count"></v-text-field>
              </v-col>
            </v-row>
            <v-row dense class="align-center">
              <v-col cols="4" class="prop-title">
                <div class="prop-secondary">
                  spacing:
                </div>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  hide-details
                  type="number"
                  min="0.01"
                  step="0.01"
                  max="0.99"
                  outlined
                  v-model="properties.dash.spacing"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <circle-colors-edit :properties="properties"/>
    <circle-states-edit :properties="properties" />
    <circle-animation-edit :properties="properties" />
    <circle-legend-font-edit :properties="properties" />
  </v-expansion-panels>
</template>

<script>
import CircleStatesEdit from "./CircleStatesEdit";
import CircleAnimationEdit from "./CircleAnimationEdit";
import CircleLegendFontEdit from "./CircleLegendFontEdit";
import CircleColorsEdit from "./CircleColorsEdit";
export default {
  name: "CircleBuilderProperties",
  components: {CircleColorsEdit, CircleLegendFontEdit, CircleAnimationEdit, CircleStatesEdit },
  props: {
    properties: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    line: ["round", "square", "butt"],
    lineMode: ["normal", "in", "in-over", "out", "out-over", "bottom", "top"],
    dashAsObject: false,
    colorAsObject: true,
    emptyColorAsObject: true,
    colorFillAsObject: true,
    emptyColorFillAsObject: true,
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
                color: "#198dea",
                offset: "0",
                opacity: "1"
              },
              {
                color: "#8A19EA",
                offset: "100",
                opacity: "1"
              }
            ]
          }
        };
      } else {
        this.properties.color = "#5800b0";
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
                color: "#198dea",
                offset: "0",
                opacity: "1"
              },
              {
                color: "#8A19EA",
                offset: "100",
                opacity: "1"
              }
            ]
          }
        };
      } else {
        this.properties.emptyColor = "#5800b0";
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
                color: "#198dea",
                offset: "0",
                opacity: "1"
              },
              {
                color: "#8A19EA",
                offset: "100",
                opacity: "1"
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
                color: "#198dea",
                offset: "0",
                opacity: "1"
              },
              {
                color: "#8A19EA",
                offset: "100",
                opacity: "1"
              }
            ]
          }
        };
      } else {
        this.properties.emptyColorFill = "#5800b0";
      }
    },
    addColor(colors) {
      colors.push({
        color: "#1871ff",
        offset: 50,
        opacity: 1
      });
    }
  }
};
</script>

<style lang="scss">
.v-expansion-panel {
  &:before {
    box-shadow: none;
  }
}
.prop-title {
  color: #5500a3;
  font-weight: bold;
  & a {
    transition: color 0.3s;
    color: #5500a3;
    font-weight: bold;
    &:hover {
      color: #0e5cff;
    }
  }
}
.prop-secondary {
  border-left: 2px solid #e5e5e5;
  margin-left: 10px;
  padding-left: 10px;
}

.prop-tertiary {
  border-left: 2px solid #f1f1f1;
  margin-left: 20px;
  padding-left: 10px;
}

.color-tag {
  border: 2px solid #f2f2f2;
  width: 100%;
  text-transform: uppercase;
  display: block;
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  text-shadow: 2px 2px 5px black;
}
</style>
