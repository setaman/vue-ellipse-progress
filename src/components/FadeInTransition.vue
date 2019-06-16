<template>
  <transition mode="out-in" name="fade-in-out" appear>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "FadeInTransition"
};
</script>

<style scoped lang="scss">
.fade-in-out-enter-active {
  animation: enter 0.3s linear;
}
.fade-in-out-leave-active {
  animation: leave 0.3s linear;
}
@keyframes enter {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes leave {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
