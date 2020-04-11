import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Circle from "../../../src/components/Circle/CircleProgress.vue";
import HalfCircle from "../../../src/components/Circle/HalfCircleProgress.vue";

import lineTest from "./circle-line.spec";
import thicknessTest from "./circle-thickness.spec";
import animationTest from "./circle-animation.spec";
import colorsTest from "./circle-colors.spec";

const factory = (propsData, container = Circle) => {
  return mount(container, {
    propsData: {
      ...propsData
    }
  });
};

describe("[ CircleProgress.vue | HalfCircleProgress.vue ]", () => {
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

      expect(wrapper.vm.progressOffset).to.equal(expectedOffset);
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

      const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");
      const circleEmptyWrapper = wrapper.find("circle.ep-circle--empty");

      expect(wrapper.vm.position).to.equal(position);

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

      expect(wrapper.vm.circumference).to.equal(circumference);
    });
  });
  describe("#half", () => {
    const progress = 50;
    const size = 200;
    const thickness = 10;

    const wrapper = factory(
      {
        progress,
        thickness,
        size,
        half: true,
        animation: "default 0 0"
      },
      HalfCircle
    );

    const radius = size / 2 - thickness / 2;
    const position = size / 2 - radius;
    const expectedPath = ` M ${position}, ${size / 2} a ${radius},${radius} 0 1,1 ${radius * 2},0`;

    const circleProgressWrapper = wrapper.find(".ep-half-circle.ep-circle--progress");
    const circleEmptyWrapper = wrapper.find(".ep-circle--empty");

    it("calculates and sets the position of the half circles correctly", () => {
      expect(wrapper.vm.position).to.equal(position);
      expect(wrapper.vm.path).to.equal(expectedPath);

      expect(circleProgressWrapper.element.getAttribute("d")).to.equal(`${expectedPath}`);
      expect(circleEmptyWrapper.element.getAttribute("d")).to.equal(`${expectedPath}`);
    });
    it("calculates the progress circle stroke offset correctly", async () => {
      const circumference = (radius * 2 * Math.PI) / 2;
      const expectedOffset = circumference - (progress / 100) * circumference;
      expect(wrapper.vm.progressOffset).to.equal(expectedOffset);
      expect(circleProgressWrapper.element.style.strokeDashoffset).to.equal(`${expectedOffset}`);
    });
  });
  describe("#dash", () => {
    it("applies the #dash value as string correctly", () => {
      const dash = "10 10";
      const wrapper = factory({
        progress: 50,
        dash
      });

      const circleEmptyWrapper = wrapper.find("circle.ep-circle--empty");
      expect(circleEmptyWrapper.element.getAttribute("stroke-dasharray")).to.equal(`${dash}`);
    });

    it("applies the #dash value with #dash.spacing and #dash.count in strict mode correctly", () => {
      const dash = "strict 60 0.5";
      const wrapper = factory({
        progress: 50,
        dash
      });

      expect(wrapper.vm.parsedDash.count).to.equal(60);
      expect(wrapper.vm.parsedDash.spacing).to.equal(0.5);
    });
  });
  describe("#noData", () => {
    const progress = 60;
    const size = 200;
    const thickness = 10;

    const wrapper = factory({ noData: true, progress, size });

    it("sets the stroke dash offset to circumference value", () => {
      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;

      const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");
      expect(circleProgressWrapper.element.style.strokeDashoffset).to.equal(`${circumference}`);
    });
    it("adds .ep_circle--nodata class to empty circle", () => {
      const circleEmptyWrapper = wrapper.find("circle.ep-circle--empty");
      expect(circleEmptyWrapper.classes()).to.include("ep_circle--nodata");
    });
  });
  describe("#loading", () => {
    const progress = 60;
    const size = 200;
    const thickness = 10;

    const wrapper = factory({ loading: true, progress, size });

    const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

    it("sets the stroke dash offset to circumference value", () => {
      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;

      expect(circleProgressWrapper.element.style.strokeDashoffset).to.equal(`${circumference}`);
    });
    it("adds .animation__loading class to progress circle", () => {
      expect(circleProgressWrapper.classes()).to.include("animation__loading");
    });
  });
  thicknessTest();
  lineTest();
  animationTest();
  colorsTest();
});
