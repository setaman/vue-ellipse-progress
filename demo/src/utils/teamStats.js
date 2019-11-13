import axios from "axios";

export default () => axios("https://api.footystats.org/league-teams?key=example&include=stats&league_id=2012");
