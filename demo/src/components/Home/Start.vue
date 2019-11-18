<template>
  <section id="start">
    <v-container fluid class="fill-height pa-0">
      <v-row class="fill-height">
        <v-col sm="12" md="5" style="min-height: 100vh; position: relative" class="fill-height text-center d-flex align-center">
          <v-row>
            <v-col cols="12">
              <div class="px-sm-3">
                <h1>Vue.js component for creating beautiful animated circle progress bars</h1>
                <div class="my-8">
                  <v-chip link color="primary" @click="copyNmpCommand">
                    {{ npm }}
                  </v-chip>
                  <v-chip class="ml-3" outlined color="primary">
                    <span class="white--text">v 0.18.8</span>
                  </v-chip>
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <v-row class="px-10">
                <v-col>
                  <btn
                    href="https://github.com/setaman/vue-ellipse-progress"
                    block
                    size="medium"
                    :buttonIcon="{ name: 'mdi-github-circle' }"
                  >
                    See docs on github
                  </btn>
                </v-col>
                <v-col>
                  <btn block :buttonIcon="{ name: 'mdi-tune' }" disabled>
                    build your own circle
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
        <v-col sm="12" md="7" style="min-height: 100vh; position: relative" class="fill-height d-flex align-center">
          <div id="overlay"></div>
          <div class="text-center fill-width">
            <vue-ellipse-progress
              :progress="43"
              color="#7579ff"
              thickness="4px"
              empty-thickness="0px"
              :empty-color-fill="emptyColorFill"
              :line-mode="{ mode: 'in', offset: 26 }"
              :size="300"
              font-size="2rem"
              font-color="#7579ff"
            />
            <v-row>
              <v-col>
                <form id="team-input-form" @submit.prevent="loadTeamStats">
                  <div class="mb-3">
                    <input id="team-input" type="text" placeholder="APL team name" v-model="teamName" />
                  </div>
                  <div>
                    <btn block large>
                      load data
                    </btn>
                  </div>
                </form>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" color="info">
        Command copied
      </v-snackbar>
    </v-container>
  </section>
</template>

<script>
import teamStats from "@/utils/teamStats";
import Btn from "@/components/Base/Btn";
const waveColor = "#237cef";
export default {
  name: "Start",
  components: { Btn },
  data: () => ({
    teamName: "Manchester United",
    snackbar: false,
    npm: "npm i vue-ellipse-progress",
    teamStats: "",
    loading: true,
    error: false,
    progress: 0,
    emptyColorFill: {
      gradient: {
        radial: true,
        direction: "",
        colors: [
          {
            color: waveColor,
            offset: "0",
            opacity: "0"
          },
          {
            color: waveColor,
            offset: "79",
            opacity: "0"
          },
          {
            color: waveColor,
            offset: "80",
            opacity: "0.2"
          },
          {
            color: waveColor,
            offset: "90",
            opacity: "0.02"
          },
          {
            color: waveColor,
            offset: "100",
            opacity: "0.00"
          }
        ]
      }
    }
  }),
  methods: {
    async loadTeamStats() {
      try {
        this.loading = true;
        this.error = false;
        const response = await teamStats();
        this.teamStats = response.data;
      } catch (e) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    copyNmpCommand() {
      this.$clipboard(this.npm);
      this.snackbar = true;
    }
  },
  mounted() {
    // this.loadTeamStats();
  }
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
#team-input {
  position: relative;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  background-color: #f5f5f5;
  border-bottom: 3px solid transparent;
  transition: 0.3s;
  outline: none;
  font-weight: bold;
  color: #5a3fb3;
  &:focus {
    border-bottom: 3px solid #5a3fb3;
  }
}

#overlay {
  position: absolute;
  top: -100px;
  right: -180px;
  background-color: white;
  height: 100%;
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
  padding: 10px 15px;
  height: 35px;
  border: 2px solid #764ba2;
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
