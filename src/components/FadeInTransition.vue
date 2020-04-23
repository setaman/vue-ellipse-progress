<template>
  <transition mode="out-in" name="fade" appear>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "FadeInTransition",
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  transition: 0.3s;
  opacity: 0;
}
</style>
