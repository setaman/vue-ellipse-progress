import axios from "axios";

export default () =>
  axios.get("https://api.football-data.org/v2/competitions/2021/standings?standingType=TOTAL", {
    headers: {
      "X-Auth-Token": process.env.VUE_APP_API_TOKEN,
    },
  });
