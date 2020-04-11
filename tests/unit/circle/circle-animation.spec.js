import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Container from "../../../src/components/VueEllipseProgress.vue";
import Circle from "../../../src/components/Circle/CircleProgress.vue";

const wait = (ms = 400) => new Promise(resolve => setTimeout(() => resolve(), ms));

const factory = propsData => {
  return mount(Container, {
    propsData: {
      ...propsData
    },
    stubs: {
      CountUp: true
    }
  });
};

export default () => {
  describe("#animation", () => {
    describe("#animation.type", () => {
      const wrapper = factory({
        progress: 50
      });
      const circleWrapper = wrapper.find(Circle);
      const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
      it("applies @default animation class by default", () => {
        const classes = circleProgressWrapper.classes();
        expect(classes)
          .to.be.an("array")
          .that.includes("animation__default");
      });
      it("applies @rs animation class correctly", () => {
        wrapper.setProps({
          animation: "rs"
        });
        expect(circleProgressWrapper.classes()).to.include("animation__rs");
      });
      it("applies @loop animation class correctly", () => {
        wrapper.setProps({
          animation: "loop"
        });
        expect(circleProgressWrapper.classes()).to.include("animation__loop");
      });
      it("applies @bounce animation class correctly", () => {
        wrapper.setProps({
          animation: "bounce"
        });
        expect(circleProgressWrapper.classes()).to.include("animation__bounce");
      });
      it("applies @reverse animation class correctly", () => {
        wrapper.setProps({
          animation: "reverse"
        });
        expect(circleProgressWrapper.classes()).to.include("animation__reverse");
      });
    });
    describe("#animation.duration", () => {
      it("applies default @1000 duration value as transition and animation duration", () => {
        const wrapper = factory({
          progress: 50
        });
        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

        expect(circleProgressWrapper.element.style.transition).to.include("1000ms");
        expect(circleProgressWrapper.element.style.animationDuration).to.equal("1000ms");
      });
      it("applies provided duration value as transition and animation duration", () => {
        const wrapper = factory({
          progress: 50,
          animation: "rs 500"
        });
        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

        expect(circleProgressWrapper.element.style.transition).to.equal("500ms");
        expect(circleProgressWrapper.element.style.animationDuration).to.equal("500ms");
      });
      it("applies @0 duration value as transition and animation duration", () => {
        const wrapper = factory({
          progress: 50,
          animation: "rs 0"
        });
        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

        expect(circleProgressWrapper.element.style.transition).to.equal("0ms");
        expect(circleProgressWrapper.element.style.animationDuration).to.equal("0ms");
      });
    });
    describe("#animation.delay", () => {
      it("applies default @400 delay value as animation-delay", () => {
        const wrapper = factory({
          progress: 50
        });
        const circleWrapper = wrapper.find(Circle);
        expect(circleWrapper.vm.parsedAnimation.delay).to.equal("400");
      });
      it("applies @0 delay value as animation-delay", () => {
        const wrapper = factory({
          progress: 50,
          animation: "rs 0 0"
        });
        const circleWrapper = wrapper.find(Circle);
        expect(circleWrapper.vm.parsedAnimation.delay).to.equal("0");
      });
    });
  });
};
