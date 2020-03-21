import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Container from "../../../src/components/VueEllipseProgress.vue";
import Circle from "../../../src/components/Circle/CircleProgress.vue";
import Gradient from "../../../src/components/Gradient.vue";

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
  describe("#color", () => {
    const color = "#3f79ff";
    const wrapper = factory({
      progress: 50,
      color
    });

    const circleWrapper = wrapper.find(Circle);
    const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

    it("applies color correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("stroke")).to.equal(`${color}`);
    });
    it("applies gradient color correctly", () => {
      const gradientColor = {
        gradient: {
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
        }
      };
      wrapper.setProps({
        color: gradientColor
      });
      const gradientWrapper = wrapper.find(Gradient);
      expect(wrapper.contains(Gradient)).to.be.true;
      expect(gradientWrapper.contains("linearGradient")).to.be.true;
      const linearGradientWrapper = gradientWrapper.find("linearGradient");
      expect(linearGradientWrapper.findAll("stop").length).to.equal(gradientColor.gradient.colors.length);
    });
  });
  describe("#colorFill", () => {
    const colorFill = "#3f79ff";
    const wrapper = factory({
      progress: 50,
      colorFill
    });

    const circleWrapper = wrapper.find(Circle);
    const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

    it("applies color correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("fill")).to.equal(`${colorFill}`);
    });
    it("applies gradient fill color correctly", () => {
      const gradientColorFill = {
        gradient: {
          radial: true,
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
        }
      };
      wrapper.setProps({
        colorFill: gradientColorFill
      });
      const gradientWrapper = wrapper.find(Gradient);
      expect(wrapper.contains(Gradient)).to.be.true;
      expect(gradientWrapper.contains("radialGradient")).to.be.true;
      const radialGradientWrapper = gradientWrapper.find("radialGradient");
      expect(radialGradientWrapper.findAll("stop").length).to.equal(gradientColorFill.gradient.colors.length);
    });
  });
  describe("#emptyColor", () => {
    const emptyColor = "#3f79ff";
    const wrapper = factory({
      progress: 50,
      emptyColor
    });

    const circleWrapper = wrapper.find(Circle);
    const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

    it("applies empty color correctly", () => {
      expect(circleEmptyWrapper.element.getAttribute("stroke")).to.equal(`${emptyColor}`);
    });
    it("applies empty gradient color correctly", () => {
      const emptyGradientColor = {
        gradient: {
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
        }
      };
      wrapper.setProps({
        emptyColor: emptyGradientColor
      });
      const gradientWrapper = wrapper.find(Gradient);
      expect(wrapper.contains(Gradient)).to.be.true;
      expect(gradientWrapper.contains("linearGradient")).to.be.true;
      const linearGradientWrapper = gradientWrapper.find("linearGradient");
      expect(linearGradientWrapper.findAll("stop").length).to.equal(emptyGradientColor.gradient.colors.length);
    });
  });
  describe("#emptyColorFill", () => {
    const emptyColorFill = "#3f79ff";
    const wrapper = factory({
      progress: 50,
      emptyColorFill
    });

    const circleWrapper = wrapper.find(Circle);
    const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

    it("applies empty color correctly", () => {
      expect(circleEmptyWrapper.element.getAttribute("fill")).to.equal(`${emptyColorFill}`);
    });
    it("applies empty gradient fill color correctly", () => {
      const emptyGradientColorFill = {
        gradient: {
          radial: true,
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
        }
      };
      wrapper.setProps({
        emptyColorFill: emptyGradientColorFill
      });
      const gradientWrapper = wrapper.find(Gradient);
      expect(wrapper.contains(Gradient)).to.be.true;
      expect(gradientWrapper.contains("radialGradient")).to.be.true;
      const radialGradientWrapper = gradientWrapper.find("radialGradient");
      expect(radialGradientWrapper.findAll("stop").length).to.equal(emptyGradientColorFill.gradient.colors.length);
    });
  });
};
