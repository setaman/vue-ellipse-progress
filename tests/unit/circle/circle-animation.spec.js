import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Circle from "../../../src/components/Circle/CircleProgress.vue";

const factory = propsData => {
  return mount(Circle, {
    propsData: {
      progress: 50,
      ...propsData
    }
  });
};

export default () => {
  describe("#animation", () => {
    describe("#animation.type", () => {
      const wrapper = factory();
      const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");
      it("applies @default animation class by default", () => {
        expect(circleProgressWrapper.classes())
          .to.be.an("array")
          .that.includes("animation__default");
      });
      it("applies @rs animation class correctly", () => {
        wrapper.setProps({ animation: "rs 500 500" });
        expect(circleProgressWrapper.classes()).to.include("animation__rs");
      });
      it("applies @loop animation class correctly", () => {
        wrapper.setProps({ animation: "rs 500 500" });
        expect(circleProgressWrapper.classes()).to.include("animation__loop");
      });
      it("applies @bounce animation class correctly", () => {
        wrapper.setProps({ animation: "bounce rs 500 500" });
        expect(circleProgressWrapper.classes()).to.include("animation__bounce");
      });
      it("applies @reverse animation class correctly", () => {
        wrapper.setProps({ animation: "reverse rs 500 500" });
        expect(circleProgressWrapper.classes()).to.include("animation__reverse");
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
      it("applies default @400 delay value as animation-delay", () => {
        expect(factory().vm.parsedAnimation.delay).to.equal("400");
      });
      it("applies @0 delay value as animation-delay", () => {
        expect(factory({ animation: "rs 0 0" }).vm.parsedAnimation.delay).to.equal("0");
      });
    });
  });
};
