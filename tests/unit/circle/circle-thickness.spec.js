import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Container from "../../../src/components/VueEllipseProgress.vue";
import Circle from "../../../src/components/Circle/CircleProgress.vue";

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
  describe("#thickness", () => {
    it("renders the progress circle line stroke thickness correctly", () => {
      const progress = 60;
      const thickness = 4;

      const wrapper = factory({
        progress,
        thickness
      });
      const circleWrapper = wrapper.find(Circle);
      const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

      expect(circleProgressWrapper.element.getAttribute("stroke-width")).to.equal(`${thickness}`);
    });
    it("renders and calculates the progress circle line stroke relative thickness correctly", () => {
      const progress = 60;
      const size = 200;
      const thickness = "5%";
      const relativeThickness = (parseInt(thickness, 10) * size) / 100;

      const wrapper = factory({
        progress,
        thickness
      });
      const circleWrapper = wrapper.find(Circle);
      const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

      expect(circleWrapper.vm.computedThickness).to.equal(relativeThickness);
      expect(circleProgressWrapper.element.getAttribute("stroke-width")).to.equal(`${relativeThickness}`);
    });
  });
  describe("#emptyTthickness", () => {
    it("renders the empty circle line stroke thickness correctly", () => {
      const progress = 60;
      const emptyThickness = 4;

      const wrapper = factory({
        progress,
        emptyThickness
      });
      const circleWrapper = wrapper.find(Circle);
      const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

      expect(circleEmptyWrapper.element.getAttribute("stroke-width")).to.equal(`${emptyThickness}`);
    });
    it("renders and calculates the empty circle line stroke relative thickness correctly", () => {
      const progress = 60;
      const size = 200;
      const emptyThickness = "5%";
      const relativeThickness = (parseInt(emptyThickness, 10) * size) / 100;

      const wrapper = factory({
        progress,
        emptyThickness
      });
      const circleWrapper = wrapper.find(Circle);
      const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

      expect(circleWrapper.vm.computedEmptyThickness).to.equal(relativeThickness);
      expect(circleEmptyWrapper.element.getAttribute("stroke-width")).to.equal(`${relativeThickness}`);
    });
  });
};
