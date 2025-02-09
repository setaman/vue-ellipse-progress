<script setup lang="ts">
// import PluginTest from "@/components/PluginTest.vue";
import { VeProgress } from "@veprogress/local";
</script>

<template>
  <div class="wrapper">
    Hui
    <ve-progress />
    <ve-progress :progress="25" color="color" />
    <!--    <PluginTest :progress="50" color="color" />-->
  </div>
</template>

<style scoped></style>
