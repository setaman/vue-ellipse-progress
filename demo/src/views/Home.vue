<template>
  <div class="home">
    <start />
    <examples />
  </div>
</template>

<script>
import Start from "@/components/Home/Start";
import Examples from "@/components/Home/Examples";
export default {
  name: "home",
  components: { Examples, Start }
};
</script>
