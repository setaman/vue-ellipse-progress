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
          <v-col cols="4" class="prop-title">progress: </v-col>
          <v-col cols="8">
            <v-text-field hide-details outlined type="number" v-model="properties.progress" required> </v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">size: </v-col>
          <v-col cols="8">
            <v-text-field hide-details outlined type="number" v-model="properties.size" required> </v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">angle: </v-col>
          <v-col cols="8">
            <v-text-field hide-details outlined type="number" v-model="properties.angle" required> </v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">legendValue: </v-col>
          <v-col cols="8">
            <v-text-field hide-details outlined type="number" v-model="properties.legendValue" required> </v-text-field>
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
          <v-col cols="4" class="prop-title">line: </v-col>
          <v-col cols="8">
            <v-select v-model="properties.line" hide-details outlined :items="line"></v-select>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">thickness: </v-col>
          <v-col cols="8">
            <v-text-field hint="Number or percent value" persistent-hint outlined v-model="properties.thickness">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">emptyThickness: </v-col>
          <v-col cols="8">
            <v-text-field persistent-hint hint="Number or percent value" outlined v-model="properties.emptyThickness">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">lineMode: </v-col>
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
                <v-text-field
                  hint="Positive or negative number"
                  persistent-hint
                  outlined
                  v-model="properties.lineMode.offset"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col cols="4" class="prop-title">dash: </v-col>
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
  </v-expansion-panels>
</template>

<script>
export default {
  name: "CircleBuilderProperties",
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
    props: [
      {
        title: "progress",
        type: "boolean",
        value: 50
      },
      {
        title: "color",
        type: "object",
        value: undefined,
        props: [
          {
            title: "gradient",
            type: "object",
            value: true
          }
        ]
      }
    ]
  }),
  methods: {
    toggleDashAsObject() {
        console.log('TTTT')
      if (this.dashAsObject) {
        this.properties.dash = {
          count: 60,
          spacing: 0.95
        };
      } else {
        this.properties.dash = "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.v-expansion-panel {
  &:before {
    box-shadow: none;
  }
}
.prop-title {
  color: #5500a3;
  font-weight: bold;
}
.prop-secondary {
  border-left: 2px solid #e5e5e5;
  margin-left: 10px;
  padding-left: 10px;
}
</style>
