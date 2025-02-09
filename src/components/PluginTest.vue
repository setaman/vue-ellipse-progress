<script setup lang="ts">
import "../assets/ps.css";
import type { VeProgressProps } from "@/types.ts";

defineProps<VeProgressProps>();
</script>

<template>
  <div>
    <h1 class="plugin-styles">PluginTest</h1>
    <p>msg: {{ progress }}</p>
    <p>test: {{ color }}</p>
  </div>
</template>

<style lang="scss"></style>
