<script setup lang="ts">
import "../assets/ps.css";
import type { VeProgressProps } from "@/types.ts";
import { useParsedProps } from "@/components/Circle/useParsedProps.ts";

const props = defineProps<VeProgressProps>();

const { parsedProps, progress } = useParsedProps(props);
</script>

<template>
  <div>
    <h1 class="plugin-styles">PluginTest</h1>
    parsedProps: {{ parsedProps.dot.size }} parsedProps: {{ progress }}
  </div>
</template>

<style lang="scss"></style>
