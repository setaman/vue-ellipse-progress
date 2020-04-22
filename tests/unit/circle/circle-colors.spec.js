import { expect } from "chai";
import { mount } from "@vue/test-utils";
import CircleContainer from "../../../src/components/Circle/CircleContainer.vue";
import Gradient from "../../../src/components/Gradient.vue";

const factory = (colorObject = {}) => {
  return mount(CircleContainer, {
    propsData: {
      progress: 50,
      index: 0,
      multiple: false,
      ...colorObject
    }
  });
};

const gradientColor = {
  radial: false,
  colors: [
    {
      color: "red",
      offset: 0,
      opacity: 1
    },
    {
      color: "blue",
      offset: 0,
      opacity: 1
    }
  ]
};

export default () => {
  describe("#color", () => {
    const color = "#ff0020";
    const wrapper = factory({ color });

    const p = wrapper.vm.isColorGradient;

    const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

    it("do not recognize gradient colors", () => {
      expect(wrapper.vm.isColorGradient).to.be.false;
    });

    it("applies color correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("stroke")).to.equal(`${color}`);
    });
    describe("applies gradient color correctly", () => {
      wrapper.setProps({
        color: gradientColor
      });
      it("renders Gradient component", () => {
        expect(wrapper.contains(Gradient)).to.be.true;
      });
      it("renders corresponding amount of stop colors SVG elements", () => {
        expect(wrapper.findAll("stop").length).to.equal(gradientColor.colors.length);
      });
    });
  });
  describe("#emptyColor", () => {
    const emptyColor = "#a617ff";
    const wrapper = factory({ emptyColor });

    const circleProgressWrapper = wrapper.find("circle.ep-circle--empty");

    it("applies color correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("stroke")).to.equal(`${emptyColor}`);
    });
    describe("applies gradient color correctly", () => {
      wrapper.setProps({
        emptyColor: gradientColor
      });
      it("renders Gradient component", () => {
        expect(wrapper.contains(Gradient)).to.be.true;
      });
      it("renders corresponding amount of stop colors SVG elements", () => {
        expect(wrapper.findAll("stop").length).to.equal(gradientColor.colors.length);
      });
    });
  });
  describe("#colorFill", () => {
    const colorFill = "#fff149";
    const wrapper = factory({ colorFill });

    const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

    it("applies color correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("fill")).to.equal(`${colorFill}`);
    });
    describe("applies gradient color correctly", () => {
      wrapper.setProps({
        colorFill: gradientColor
      });
      it("renders Gradient component", () => {
        expect(wrapper.contains(Gradient)).to.be.true;
      });
      it("renders corresponding amount of stop colors SVG elements", () => {
        expect(wrapper.findAll("stop").length).to.equal(gradientColor.colors.length);
      });
    });
  });
  describe("#emptyColorFill", () => {
    const emptyColorFill = "#3f79ff";
    const wrapper = factory({ emptyColorFill });

    const circleProgressWrapper = wrapper.find("circle.ep-circle--empty");

    it("applies color correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("fill")).to.equal(`${emptyColorFill}`);
    });
    describe("applies gradient color correctly", () => {
      wrapper.setProps({
        emptyColorFill: gradientColor
      });
      it("renders Gradient component", () => {
        expect(wrapper.contains(Gradient)).to.be.true;
      });
      it("renders corresponding amount of stop colors SVG elements", () => {
        expect(wrapper.findAll("stop").length).to.equal(gradientColor.colors.length);
      });
    });
  });
};
