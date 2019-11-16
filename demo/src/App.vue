<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Quicksand:300,400,700&display=swap");
#app {
  //background-image: linear-gradient(to bottom, #2d3a67, #352958);
  background-color: #2d3a67;
  font-family: "Quicksand", sans-serif;
  color: white;
}
.fill-width {
  width: 100%;
}
</style>
