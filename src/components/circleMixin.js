const wait = (ms = 400) => new Promise(resolve => setTimeout(() => resolve(), ms));

export default {
  name: "CircleMixin",
  computed: {
    dataIsAvailable() {
      return this.options.noData ? false : !Number.isNaN(parseFloat(this.options.progress));
    },
    animationClass() {
      return [
        `animation__${
          !this.options.loading && this.dataIsAvailable
            ? this.options.animation.type || "default"
            : "none"
        }`,
        `${this.options.loading ? "animation__loading" : ""}`
      ];
    }
  },
  data() {
    return {
      isInitialized: false,
      delay: this.options.animation.delay || 400,
      loading: this.options.loading,
      circle: null
    };
  },
  methods: {
    /* Animations helper Methods */
    getNegativeCircumference() {
      return this.circumference * -1;
    },
    getDoubleCircumference() {
      return this.circumference * 2;
    },
    getLoopOffset() {
      return this.getNegativeCircumference() - (this.circumference - this.progressOffset);
    },
    getReverseOffset() {
      return this.getDoubleCircumference() + this.progressOffset;
    },
    getBounceOutOffset() {
      return this.progressOffset < 100 ? 0 : this.progressOffset - 100;
    },
    getBounceInOffset() {
      return this.circumference - this.progressOffset < 100
        ? this.progressOffset
        : this.progressOffset + 100;
    },
    async setAnimationDelay() {
      if (this.loading) {
        this.delay = 0;
        return;
      }
      await wait(this.delay + (this.options.animation.duration || 1000));
      this.delay = 0;
    },
    setProperties() {
      this.circle.style.setProperty("--ep-circumference", this.circumference);
      this.circle.style.setProperty("--ep-negative-circumference", this.getNegativeCircumference());
      this.circle.style.setProperty("--ep-double-circumference", this.getDoubleCircumference());
      this.circle.style.setProperty("--ep-stroke-offset", this.progressOffset);
      this.circle.style.setProperty("--ep-loop-stroke-offset", this.getLoopOffset());
      this.circle.style.setProperty("--ep-bounce-out-stroke-offset", this.getBounceOutOffset());
      this.circle.style.setProperty("--ep-bounce-in-stroke-offset", this.getBounceInOffset());
      this.circle.style.setProperty("--ep-reverse-stroke-offset", this.getReverseOffset());
      this.circle.style.setProperty("--ep-loading-stroke-offset", this.circumference * 0.2);
      this.circle.style.setProperty("animation-duration", this.animationDuration);
    }
  },
  mounted() {
    this.setAnimationDelay();
    if (this.loading) {
      this.isInitialized = true;
    } else {
      setTimeout(() => {
        this.isInitialized = true;
      }, this.options.animation.delay + 100 || 400);
    }
    this.circle = this.$el.getElementsByClassName("ep-circle--progress")[0];
    this.setProperties();
  }
};
