import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Container from "../../../src/components/VueEllipseProgress.vue";
import Circle from "../../../src/components/Circle/CircleProgress.vue";
import HalfCircle from "../../../src/components/Circle/HalfCircleProgress.vue";

import lineTest from "./circle-line.spec";
import animationTest from "./circle-animation.spec";

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
        animation: "default 0 0"
      });

      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;
      const expectedOffset = circumference - (progress / 100) * circumference;

      const circleWrapper = wrapper.find(Circle);

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
  // lineTest();
  // animationTest();
  describe("#half", () => {
    const progress = 60;
    const size = 200;
    const thickness = 10;

    const wrapper = factory({
      progress,
      thickness,
      size,
      half: true,
      animation: "default 0 0"
    });

    const radius = size / 2 - thickness / 2;
    const position = size / 2 - radius;
    const expectedPath = ` M ${position}, ${size / 2} a ${radius},${radius} 0 1,1 ${radius * 2},0`;

    const circleWrapper = wrapper.find(HalfCircle);
    const circleProgressWrapper = circleWrapper.find(".ep-circle--progress");
    const circleEmptyWrapper = circleWrapper.find(".ep-circle--empty");

    it("calculates and sets the position of the half circles correctly", () => {
      expect(circleWrapper.vm.position).to.equal(position);
      expect(circleWrapper.vm.path).to.equal(expectedPath);

      expect(circleProgressWrapper.element.getAttribute("d")).to.equal(`${expectedPath}`);
      expect(circleEmptyWrapper.element.getAttribute("d")).to.equal(`${expectedPath}`);
    });
    it("calculates the progress circle stroke offset correctly", async () => {
      const circumference = (radius * 2 * Math.PI) / 2;
      const expectedOffset = circumference - (progress / 100) * circumference;
      expect(circleWrapper.vm.progressOffset).to.equal(expectedOffset);
      expect(circleProgressWrapper.element.style.strokeDashoffset).to.equal(`${expectedOffset}`);
    });
  });
  describe("#dash", () => {
    const dash = "10 10";

    const wrapper = factory({
      progress: 50,
      dash
    });

    const circleWrapper = wrapper.find(Circle);
    const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

    it("applies the #dash value as string correctly", () => {
      expect(circleEmptyWrapper.element.getAttribute("stroke-dasharray")).to.equal(`${dash}`);
    });
  });
});
