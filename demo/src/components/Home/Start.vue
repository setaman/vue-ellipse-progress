<template>
  <section id="start">
    <v-container fluid class="fill-height pa-0">
      <v-row class="fill-height">
        <v-col sm="5" class="fill-height text-center d-flex align-center">
          <v-row>
            <v-col cols="12">
              <div>
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
                  <btn block :buttonIcon="{ name: 'mdi-tune' }">
                    build your own circle
                  </btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col sm="7" class="clip fill-height d-flex align-center">
          <div class="text-center fill-width">
            <vue-ellipse-progress
              :progress="56"
              color="#7579ff"
              thickness="4px"
              empty-thickness="0px"
              :empty-color-fill="emptyColorFillWave"
              :size="300"
              font-size="2rem"
              font-color="white"
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
const waveColor = "#004aef";
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
    emptyColorFillWave: {
      gradient: {
        radial: true,
        direction: "",
        colors: [
          {
            color: waveColor,
            offset: "60",
            opacity: "0.3"
          },
          {
            color: waveColor,
            offset: "60",
            opacity: "0.2"
          },
          {
            color: waveColor,
            offset: "80",
            opacity: "0.1"
          },
          {
            color: waveColor,
            offset: "80",
            opacity: "0.06"
          },
          {
            color: waveColor,
            offset: "100",
            opacity: "0.03"
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
        console.warn(e);
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
  height: 100vh;
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

.clip {
  background-image: url("../../assets/overlay.svg");
  background-position: left;
  background-size: cover;
}
</style>
