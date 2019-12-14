<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <circle-builder-properties :properties.sync="options" />
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-center">
        <vue-ellipse-progress
          :progress="parseFloat(options.progress)"
          :color="options.color"
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
          :legendValue="options.legendValue"
        >
        </vue-ellipse-progress>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <div class="props-output pa-3">
          {{ JSON.stringify(options) }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CircleBuilderProperties from "./CircleBuilderProperties";
export default {
  name: "CircleBuilder",
  components: { CircleBuilderProperties },
  data: () => ({
    options: {
      rating: 3,
      legendValue: 0,
      fontSize: "2rem",
      lineModes: ["normal", "in", "in-over", "out", "out-over", "top", "bottom"],
      loading: false,
      legend: true,
      noData: false,
      line: "round",
        dash: "",
      progress: 95,
      thickness: 5,
      angle: -90,
      emptyThickness: 5,
      dashCount: 0,
      lineMode: {
        mode: "normal",
        offset: 0
      },
      animation: {
        type: "rs",
        duration: 1000,
        delay: 500
      },
      timerProgress: 0,
      sec: 0,
      tasksDone: 125,
      size: 200,
      color: {
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
              color: "#198dea",
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
              color: "#8ec5fc",
              offset: "0",
              opacity: "0.3"
            },
            {
              color: "#e0c3fc",
              offset: "100",
              opacity: "0.3"
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
              opacity: "0.3"
            },
            {
              color: "#e0c3fc",
              offset: "100",
              opacity: "0.3"
            }
          ]
        }
      }
    }
  })
};
</script>

<style scoped></style>
