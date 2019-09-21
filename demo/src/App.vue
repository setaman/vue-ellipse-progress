<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="css">
@import url('https://fonts.googleapis.com/css?family=Quicksand:300,400,700&display=swap');
#app {
  background: white;
  font-family: 'Quicksand', sans-serif;
}
</style>
