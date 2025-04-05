<script setup lang="ts">
import PluginTest from "@/components/PluginTest.vue";
import { ref } from "vue";
import type { Dot } from "@/types.ts";
/*import { VeProgress } from "@veprogress/local";
import type { LineMode } from "@veprogress/local";*/
import VueEllipseProgress from "@/components/VueEllipseProgress.vue";

const dot = ref("10" as Dot);
const progress = ref(20);
</script>

<template>
  <div class="wrapper">
    <!--    <PluginTest :progress color="color" :dot="dot" />-->
    <button @click="dot = '20 red'">change</button>
    <button @click="progress += 5">progress</button>
    <div>
      <vue-ellipse-progress :progress="progress" />
    </div>
  </div>
</template>

<style scoped></style>
