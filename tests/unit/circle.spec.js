import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import CountUp from "countup.js";
import Container from "../../src/components/EllipseProgressContainer.vue";
import Circle from "../../src/components/CircleProgress.vue";

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

// const wait = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

describe("[ CircleProgress.vue ]", () => {
  describe("#progress", () => {
    it("calculates the progress circle stroke offset correctly", () => {
      const progress = 60;
      const size = 200;
      const thickness = 4;

      const wrapper = factory({
        size,
        progress,
        thickness,
        emptyThickness: thickness,
        animation: {
          type: "default",
          duration: 10,
          delay: 10
        }
      });

      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;
      const expectedOffset = circumference - (progress / 100) * circumference;

      const circleWrapper = wrapper.find(Circle);
      // const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

      expect(circleWrapper.vm.progressOffset).to.equal(expectedOffset);
    });
  });
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

      expect(circleWrapper.vm.thickness).to.equal(relativeThickness);
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

      expect(circleWrapper.vm.emptyThickness).to.equal(relativeThickness);
      expect(circleEmptyWrapper.element.getAttribute("stroke-width")).to.equal(`${relativeThickness}`);
    });
  });
  describe("#size", () => {
    it("calculates and sets the position of the circles correctly", () => {
      const progress = 60;
      const size = 200;
      const position = 200 / 2;

      const wrapper = factory({
        progress,
        size
      });
      const circleWrapper = wrapper.find(Circle);
      const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
      const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

      expect(circleWrapper.vm.position).to.equal(position);

      expect(circleProgressWrapper.element.getAttribute("cx")).to.equal(`${position}`);
      expect(circleProgressWrapper.element.getAttribute("cy")).to.equal(`${position}`);

      expect(circleEmptyWrapper.element.getAttribute("cx")).to.equal(`${position}`);
      expect(circleEmptyWrapper.element.getAttribute("cy")).to.equal(`${position}`);
    });
    it("calculates the circumference of the progress circles correctly", () => {
      const progress = 60;
      const size = 200;
      const thickness = 4;
      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;

      const wrapper = factory({
        size,
        progress,
        thickness,
        emptyThickness: thickness
      });
      const circleWrapper = wrapper.find(Circle);
      expect(circleWrapper.vm.circumference).to.equal(circumference);
    });
  });
});
