import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Circle from "../../../src/components/Circle/CircleProgress.vue";

const wait = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

const factory = propsData => {
  return mount(Circle, {
    propsData: {
      index: 1,
      id: 2,
      multiple: false,
      progress: 50,
      ...propsData
    }
  });
};

export default () => {
  describe("#animation", () => {
    it("it parses the #animation property correctly", () => {
      const wrapper = factory({ animation: "rs 2000 50" });

      expect(wrapper.vm.parsedAnimation.type).to.equal("rs");
      expect(wrapper.vm.parsedAnimation.duration).to.equal(2000);
      expect(wrapper.vm.parsedAnimation.delay).to.equal(50);
    });
    describe("#animation.type", () => {
      const wrapper = factory();
      const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");
      it("applies @default animation class by default", done => {
        setTimeout(() => {
          expect(wrapper.vm.parsedAnimation.type).to.equal("default");
          expect(circleProgressWrapper.classes())
            .to.be.an("array")
            .that.includes("animation__default");
          done();
        }, 60);
      });
      it("applies @bounce animation class correctly", async () => {
        wrapper.setProps({ animation: "bounce 500 500" });
        await Vue.nextTick();
        expect(circleProgressWrapper.classes()).to.include("animation__bounce");
      });
      it("applies @loop animation class correctly", async () => {
        wrapper.setProps({ animation: "loop 500 500" });
        await Vue.nextTick();
        expect(circleProgressWrapper.classes()).to.include("animation__loop");
      });
      it("applies @reverse animation class correctly", async () => {
        wrapper.setProps({ animation: "reverse 500 500" });
        await Vue.nextTick();
        expect(circleProgressWrapper.classes()).to.include("animation__reverse");
      });
      it("applies @rs animation class correctly", async () => {
        wrapper.setProps({ animation: "rs 500 500" });
        await Vue.nextTick();
        expect(circleProgressWrapper.classes()).to.include("animation__rs");
      });
    });
    describe("#animation.duration", () => {
      it("applies default @1000 duration value as transition and animation duration", () => {
        const circleProgressWrapper = factory().find("circle.ep-circle--progress");

        expect(circleProgressWrapper.element.style.transition).to.include("1000ms");
        expect(circleProgressWrapper.element.style.animationDuration).to.equal("1000ms");
      });
      it("applies provided duration value as transition and animation duration", () => {
        const wrapper = factory({ animation: "rs 500" });
        const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

        expect(circleProgressWrapper.element.style.transition).to.equal("500ms");
        expect(circleProgressWrapper.element.style.animationDuration).to.equal("500ms");
      });
      it("applies @0 duration value as transition and animation duration", () => {
        const wrapper = factory({ animation: "rs 0" });
        const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

        expect(circleProgressWrapper.element.style.transition).to.equal("0ms");
        expect(circleProgressWrapper.element.style.animationDuration).to.equal("0ms");
      });
    });
    describe("#animation.delay", () => {
      it("applies default @400 delay value as initial animation delay", () => {
        expect(factory().vm.parsedAnimation.delay).to.equal(400);
      });
      it("applies @0 delay value as animation-delay", () => {
        expect(factory({ animation: "rs 0 0" }).vm.parsedAnimation.delay).to.equal(0);
      });
    });
  });
};
