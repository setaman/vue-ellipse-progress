<template>
  <div class="custom-btn">
    <v-btn
      class="custom-v-btn"
      :type="options.type"
      :depressed="options.depressed"
      :block="options.block"
      @click="emitClickEvent"
      :color="options.color"
      :loading="options.loading"
      :x-large="options.size === 'x-large'"
      :large="options.size === 'large'"
      :x-small="options.size === 'x-small'"
      :small="options.size === 'small'"
      :medium="options.size === 'medium'"
      :href="options.link && options.link"
      :target="options.link ? '_blank' : ''"
      :to="options.route && options.route"
    >
      <v-icon v-if="options.icon" color="rgb(255, 93, 175)" class="mr-3">
        {{ options.icon.name }}
      </v-icon>
      <slot> </slot>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Btn",
  props: {
    props: {
      type: Object,
      required: false
    }
  },
  computed: {
    options() {
      return {
        depressed: false,
        block: true,
        color: "primary",
        type: "button",
        size: "x-large",
        ...this.props
      };
    }
  },
  methods: {
    emitClickEvent() {
      this.$emit("click");
    }
  }
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
}
.custom-v-btn.v-btn {
  background-color: #443381 !important;
  background-image: linear-gradient(to top right, #5a3fb3 0%, #764ba2 100%);
  border-radius: unset;
  font-weight: bold;
  clip-path: polygon(7% 0%, 100% 0%, 92% 100%, 0% 100%);
}
</style>
