import { expect } from "chai";
import { mount } from "@vue/test-utils";
import CircleContainer from "../../../src/components/Circle/EpCircleContainer.vue";
import Gradient from "../../../src/components/Gradient.vue";

const factory = propsData => {
  return mount(CircleContainer, {
    propsData
  });
};
const commonProps = {
  index: 0,
  multiple: false
};

export default () => {
  describe("#color", () => {
    const color = "#3f79ff";
    const wrapper = factory({
      progress: 50,
      color,
      ...commonProps
    });

    const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

    it("applies color correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("stroke")).to.equal(`${color}`);
    });
    it("applies gradient color correctly", () => {
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
      wrapper.setProps({
        color: gradientColor
      });
      it("renders Gradient component", () => {
        expect(wrapper.contains(Gradient)).to.be.true;
      });
      it("renders corresponding amount of stop colors SVG elements", () => {
        expect(wrapper.findAll("stop").length).to.equal(gradientColor.gradient.colors.length);
      });
    });
  });
  describe("#emptyColor", () => {
    const emptyColor = "#3f79ff";
    const wrapper = factory({
      progress: 50,
      emptyColor,
      ...commonProps
    });

    const circleProgressWrapper = wrapper.find("circle.ep-circle--empty");

    it("applies color correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("stroke")).to.equal(`${emptyColor}`);
    });
    it("applies gradient color correctly", () => {
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
      wrapper.setProps({
        emptyColor: gradientColor
      });
      it("renders Gradient component", () => {
        expect(wrapper.contains(Gradient)).to.be.true;
      });
      it("renders corresponding amount of stop colors SVG elements", () => {
        expect(wrapper.findAll("stop").length).to.equal(gradientColor.gradient.colors.length);
      });
    });
  });
  describe("#colorFill", () => {
    const colorFill = "#3f79ff";
    const wrapper = factory({
      progress: 50,
      colorFill,
      ...commonProps
    });

    const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

    it("applies color correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("fill")).to.equal(`${colorFill}`);
    });
    it("applies gradient color correctly", () => {
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
      wrapper.setProps({
        colorFill: gradientColor
      });
      it("renders Gradient component", () => {
        expect(wrapper.contains(Gradient)).to.be.true;
      });
      it("renders corresponding amount of stop colors SVG elements", () => {
        expect(wrapper.findAll("stop").length).to.equal(gradientColor.gradient.colors.length);
      });
    });
  });
  describe("#emptyColorFill", () => {
    const emptyColorFill = "#3f79ff";
    const wrapper = factory({
      progress: 50,
      emptyColorFill,
      ...commonProps
    });

    const circleProgressWrapper = wrapper.find("circle.ep-circle--empty");

    it("applies color correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("fill")).to.equal(`${emptyColorFill}`);
    });
    it("applies gradient color correctly", () => {
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
      wrapper.setProps({
        emptyColorFill: gradientColor
      });
      it("renders Gradient component", () => {
        expect(wrapper.contains(Gradient)).to.be.true;
      });
      it("renders corresponding amount of stop colors SVG elements", () => {
        expect(wrapper.findAll("stop").length).to.equal(gradientColor.gradient.colors.length);
      });
    });
  });
};
