import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Circle from "../../../src/components/Circle/Circle.vue";

const factory = (propsData) => {
  return mount(Circle, {
    propsData: {
      progress: 50,
      multiple: true,
      id: 1,
      index: 0,
      ...propsData,
    },
  });
};

export default () => {
  describe("#thickness", () => {
    it("renders the progress circle line stroke thickness correctly", () => {
      const thickness = 4;

      const wrapper = factory({ thickness });
      const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

      expect(circleProgressWrapper.element.getAttribute("stroke-width")).to.equal(`${thickness}`);
    });
    it("renders and calculates the progress circle line stroke relative thickness correctly", () => {
      const size = 200;
      const thickness = "5%";
      const relativeThickness = (parseInt(thickness, 10) * size) / 100;

      const wrapper = factory({ thickness });
      const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

      expect(wrapper.vm.computedThickness).to.equal(relativeThickness);
      expect(circleProgressWrapper.element.getAttribute("stroke-width")).to.equal(`${relativeThickness}`);
    });
  });
  describe("#emptyTthickness", () => {
    it("renders the empty circle line stroke thickness correctly", () => {
      const emptyThickness = 4;

      const wrapper = factory({ emptyThickness });
      const circleEmptyWrapper = wrapper.find("circle.ep-circle--empty");

      expect(circleEmptyWrapper.element.getAttribute("stroke-width")).to.equal(`${emptyThickness}`);
    });
    it("renders and calculates the empty circle line stroke relative thickness correctly", () => {
      const size = 200;
      const emptyThickness = "5%";
      const relativeThickness = (parseInt(emptyThickness, 10) * size) / 100;

      const wrapper = factory({ emptyThickness });
      const circleEmptyWrapper = wrapper.find("circle.ep-circle--empty");

      expect(wrapper.vm.computedEmptyThickness).to.equal(relativeThickness);
      expect(circleEmptyWrapper.element.getAttribute("stroke-width")).to.equal(`${relativeThickness}`);
    });
  });
};
