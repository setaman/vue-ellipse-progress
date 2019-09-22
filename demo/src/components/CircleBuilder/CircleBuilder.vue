<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="4" class="d-flex align-center">
        <circle-builder-properties :properties.sync="options" />
      </v-col>
      <v-col cols="12" md="6" lg="4" class="d-flex align-center justify-center">
        <v-row dense>
          <v-col cols="12" class="text-center">
            <vue-ellipse-progress
              :progress="parseFloat(options.progress)"
              :color="options.color"
              :color-fill="options.colorFill"
              :empty-color-fill="options.emptyColorFill"
              :empty-color="options.emptyColor"
              :no-data="options.noData"
              :loading="options.loading"
              :emptyColor="options.emptyColor"
              :size="options.size"
              :angle="options.angle"
              :thickness="options.thickness"
              :emptyThickness="options.emptyThickness"
              :lineMode="options.lineMode"
              :line="options.line"
              :legend="options.legend"
              :dash="options.dash"
              :animation="options.animation"
              :fontSize="options.fontSize"
              :fontColor="options.fontColor"
              :legendValue="options.legendValue"
              :half="options.half"
            >
            </vue-ellipse-progress>
          </v-col>
          <v-col cols="12">
            <v-btn color="primary" block rounded>
              have a luck
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="4" class="d-flex justify-center">
        <vue-code-highlight class="code">
          {{ options }}
        </vue-code-highlight>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CircleBuilderProperties from "./CircleBuilderProperties";
import { component as VueCodeHighlight } from "vue-code-highlight";
import "vue-code-highlight/themes/window.css";
import "vue-code-highlight/themes/prism-tomorrow.css";
export default {
  name: "CircleBuilder",
  components: { CircleBuilderProperties, VueCodeHighlight },
  data: () => ({
    options: {
      progress: 75,
      size: 200,
      legendValue: 0,
      fontSize: "2rem",
      fontColor: "rgba(25,141,234,0.5)",
      loading: false,
      legend: true,
      noData: false,
      line: "round",
      dash: "",
      half: false,
      thickness: 5,
      angle: -90,
      emptyThickness: 5,
      lineMode: {
        mode: "normal",
        offset: 0
      },
      animation: {
        type: "rs",
        duration: 1000,
        delay: 500
      },
      color: {
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
      },
      colorFill: {
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
      },
      emptyColor: {
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
      },
      emptyColorFill: {
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
      }
    }
  })
};
</script>

<style lang="scss">
.code {
  width: 100%;
  min-width: 400px;
  & pre.language-javascript {
    max-height: 92vh;
    width: 100% !important;
  }
  code {
    box-shadow: none;
  }
}
</style>
