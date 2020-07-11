<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Quicksand:300,400,700&display=swap");
body {
  background-color: #2d3a67;
}
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
