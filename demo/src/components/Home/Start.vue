<template>
  <v-container fluid id="start" class="d-flex">
    <section class="d-flex">
      <v-row>
        <v-col sm="12" md="5" class="text-center d-flex align-center">
          <v-row>
            <v-col cols="12">
              <div class="px-sm-3">
                <h1 style="font-size: 2rem;">
                  Vue.js component for creating beautiful animated circle
                  progress bars
                </h1>
                <div class="my-8">
                  <v-alert type="warning" dense text>
                    <strong>Deprecation Notice:</strong> Version 1 is now
                    deprecated in favor of the new Version 2, which comes with a
                    newer and nicer documentation site.
                  </v-alert>

                  <v-chip link color="primary" @click="copyNmpCommand">
                    {{ npm }}
                  </v-chip>
                  <v-chip class="ml-3" outlined color="primary">
                    <span class="white--text">v2</span>
                  </v-chip>
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <v-row class="px-10">
                <v-col>
                  <btn
                    href="https://setaman.github.io/vue-ellipse-progress-docs/"
                    block
                    size="medium"
                    :buttonIcon="{ name: 'mdi-github-circle' }"
                  >
                    Check out new docs
                  </btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div class="scroll-downs">
            <div class="mousey">
              <div class="scroller"></div>
            </div>
          </div>
        </v-col>
        <v-col
          sm="12"
          md="7"
          style="position: relative;"
          class="d-flex align-center"
        >
          <div id="overlay"></div>
          <div class="text-center fill-width">
            <vue-ellipse-progress
              :progress="ratingProgress"
              color="#7579ff"
              thickness="4px"
              empty-thickness="0px"
              :empty-color-fill="emptyColorFill"
              line-mode="in 26"
              :size="300"
              animation="rs 700 300"
              :legend-value="rating"
              :loading="loading"
              font-size="2rem"
              font-color="#7579ff"
            >
              <span slot="legend-value">
                <span class="mr-1">
                  /
                </span>
                <span>
                  5
                </span>
              </span>
              <div slot="legend-caption" style="color: #7579ff;">
                <p class="mb-0">24 REVIEWS</p>
                <v-rating dense small v-model="rating"></v-rating>
              </div>
            </vue-ellipse-progress>
          </div>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" color="info">
        Command copied
      </v-snackbar>
    </section>
  </v-container>
</template>

<script>
import Btn from "@/components/Base/Btn";
import randomNumberInRange from "@/utils/randomNumberInRange";

const waveColor = "#237cef";

export default {
  name: "Start",
  components: { Btn },
  data: () => ({
    teamName: "Manchester United",
    snackbar: false,
    npm: "npm i vue-ellipse-progress",
    loading: true,
    emptyColorFill: {
      radial: true,
      colors: [
        {
          color: waveColor,
          offset: "0",
          opacity: "0",
        },
        {
          color: waveColor,
          offset: "79",
          opacity: "0",
        },
        {
          color: waveColor,
          offset: "80",
          opacity: "0.2",
        },
        {
          color: waveColor,
          offset: "90",
          opacity: "0.02",
        },
        {
          color: waveColor,
          offset: "100",
          opacity: "0.00",
        },
      ],
    },
    rating: 3,
  }),
  computed: {
    ratingProgress() {
      return (this.rating * 100) / 5;
    },
  },
  methods: {
    randomizeOptions() {
      this.rating = randomNumberInRange(0, 5);
    },
    copyNmpCommand() {
      this.$clipboard(this.npm);
      this.snackbar = true;
    },
  },
  mounted() {
    setInterval(() => {
      this.randomizeOptions();
    }, 1500);
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>

<style scoped lang="scss">
#start {
  min-height: 100vh;
  h1 {
    color: white;
    font-weight: normal;
    font-size: 3rem;
    letter-spacing: 0.3rem;
  }
}
#team-input-form {
  padding: 0 25%;
}

#overlay {
  position: absolute;
  top: -115px;
  right: -180px;
  background-color: white;
  height: 110%;
  width: 110%;
  border-bottom-left-radius: 150px;
  transform: rotate(15deg);
}

.scroll-downs {
  position: absolute;
  right: -25%;
  bottom: 40px;
  width: 20px;
  height: 55px;
}
.mousey {
  width: 3px;
  padding: 10px 12px;
  height: 25px;
  border: 2px solid rgba(#764ba2, 0.7);
  border-radius: 25px;
  opacity: 0.75;
  box-sizing: content-box;
}
.scroller {
  width: 3px;
  height: 10px;
  border-radius: 25%;
  background-color: #1673ff;
  animation-name: scroll;
  animation-duration: 2.2s;
  animation-timing-function: cubic-bezier(0.15, 0.41, 0.69, 0.94);
  animation-iteration-count: infinite;
}
@keyframes scroll {
  0% {
    opacity: 0;
  }
  10% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(15px);
    opacity: 0;
  }
}

@media only screen and (max-width: 1263px) {
  #start {
    h1 {
      font-size: 1.6rem;
    }
  }
  #team-input-form {
    padding: 0 5%;
  }
}

@media only screen and (max-width: 959px) {
  #overlay {
    display: none;
  }
  .scroll-downs {
    right: 0;
    left: 0;
    margin: auto;
    display: none;
  }
}
</style>
