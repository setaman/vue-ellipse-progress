<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12"> </v-col>

      <v-col cols="12">
        <vue-ellipse-progress
          :progress="parseFloat(progress)"
          :color="color"
          :loading="loading"
          :emptyColor="emptyColor"
          :size="size"
          :emptyThickness="5"
          :lineMode="{ mode: 'in', offset: 10 }"
          :legend="false"
          :animation="{ type: 'rs', duration: 700 }"
          fontSize="5rem"
        >
          <p slot="legend-capture">hui</p>
        </vue-ellipse-progress>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    noData: false,
    progress: 45.5,
    timerProgress: 0,
    sec: 0,
    tasks_done: 125,
    size: 300,
    color: {
      gradient: {
        radial: true,
        direction: "",
        colors: [
          {
            color: "#3260FC",
            offset: "0",
            opacity: "0"
          },
          {
            color: "#3260FC",
            offset: "100",
            opacity: "1"
          }
        ]
      }
    },
    colorFill: {
      gradient: {
        radial: true,
        direction: "",
        colors: [
          {
            color: "#3260FC",
            offset: "40",
            opacity: "1"
          },
          {
            color: "transparent",
            offset: "80",
            opacity: "0.1"
          },
          {
            color: "transparent",
            offset: "95",
            opacity: "0.1"
          },
          {
            color: "#3260FC",
            offset: "95",
            opacity: "0.1"
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
            color: "#050a27",
            offset: "0",
            opacity: "0.3"
          },
          {
            color: "#050a27",
            offset: "100",
            opacity: "0.3"
          }
        ]
      }
    },
    emptyColorFill: {
      gradient: {
        radial: true,
        direction: "",
        colors: [
          {
            color: "#3260FC",
            offset: "50",
            opacity: "0.2"
          },
          {
            color: "#3260FC",
            offset: "50",
            opacity: "0.15"
          },
          {
            color: "#3260FC",
            offset: "70",
            opacity: "0.15"
          },
          {
            color: "#3260FC",
            offset: "70",
            opacity: "0.1"
          },
          {
            color: "#3260FC",
            offset: "90",
            opacity: "0.1"
          },
          {
            color: "transparent",
            offset: "90",
            opacity: "0.1"
          },
          {
            color: "transparent",
            offset: "95",
            opacity: "0.1"
          },
          {
            color: "transparent",
            offset: "95",
            opacity: "0.1"
          }
        ]
      }
    }
  })
};
</script>
<style></style>
