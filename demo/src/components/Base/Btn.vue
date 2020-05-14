<template>
  <div class="custom-btn" :class="{ disabled: disabled }">
    <v-btn class="custom-v-btn" @click="emitClickEvent" v-bind="$props" target="_blank">
      <v-icon v-if="buttonIcon" color="rgb(255, 93, 175)" class="mr-3" :small="buttonIcon.size === 'small'">
        {{ buttonIcon.name }}
      </v-icon>
      <slot> </slot>
    </v-btn>
  </div>
</template>
<script>
import { VBtn, VIcon } from "vuetify/lib";
export default {
  name: "Btn",
  components: {
    VBtn,
    VIcon,
  },
  props: {
    ...VBtn.options.props,
    buttonIcon: {
      type: Object,
      required: false,
    },
  },
  methods: {
    emitClickEvent() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped lang="scss">
.custom-btn {
  position: relative;
  &:before {
    transition: 0.3s;
    position: absolute;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    clip-path: polygon(7% 0%, 100% 0%, 92% 100%, 0% 100%);
    left: -20px;
    top: 7px;
    //background-color: rgba(#443381, 0.7);
    background-image: linear-gradient(to top right, rgba(#5a3fb3, 0.7) 0%, rgba(#764ba2, 0.7) 100%);
  }
  &:hover {
    &:before {
      top: 10px;
    }
  }
  &.disabled {
    .custom-v-btn.v-btn {
      opacity: 0.5;
    }
    &:before {
      opacity: 0.5;
      top: 5px;
      left: -10px;
    }
    &:hover {
      &:before {
        top: 5px;
      }
    }
  }
}
.custom-v-btn.v-btn {
  background-color: #443381 !important;
  background-image: linear-gradient(to top right, #5a3fb3 0%, #764ba2 100%);
  border-radius: unset;
  font-weight: bold;
  color: white !important;
  clip-path: polygon(7% 0%, 100% 0%, 92% 100%, 0% 100%);
}
</style>
