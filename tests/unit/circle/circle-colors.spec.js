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
    describe("applies color as string", () => {
      const color = "#ff0020";
      const wrapper = factory({ color });
      const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

      it("do not recognize gradient colors", () => {
        expect(wrapper.vm.isColorGradient).to.be.false;
      });

      it("applies color correctly to SVG stroke", () => {
        expect(circleProgressWrapper.element.getAttribute("stroke")).to.equal(`${color}`);
      });
    });
    describe("applies gradient color correctly", () => {
      const wrapper = factory({ color: gradientColor });
      const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");
      const id = wrapper.vm._uid;

      it("recognizes gradient colors", () => {
        expect(wrapper.vm.isColorGradient).to.be.true;
      });
      it("renders Gradient component", () => {
        expect(wrapper.contains(Gradient)).to.be.true;
      });
      it("applies gradient URL to SVG stroke", () => {
        expect(circleProgressWrapper.element.getAttribute("stroke")).to.equal(`url(#ep-progress-gradient-${id})`);
      });
      it("renders corresponding amount of stop colors SVG elements", () => {
        expect(wrapper.findAll("stop").length).to.equal(gradientColor.colors.length);
      });
    });
  });
  describe("#emptyColor", () => {
    describe("applies color as string", () => {
      const emptyColor = "#a617ff";
      const wrapper = factory({ emptyColor });
      const emptyCircleWrapper = wrapper.find("circle.ep-circle--empty");

      it("do not recognize gradient colors", () => {
        expect(wrapper.vm.isEmptyColorGradient).to.be.false;
      });

      it("applies color correctly to SVG stroke", () => {
        expect(emptyCircleWrapper.element.getAttribute("stroke")).to.equal(`${emptyColor}`);
      });
    });
    describe("applies gradient color correctly", () => {
      const wrapper = factory({ emptyColor: gradientColor });
      const circleProgressWrapper = wrapper.find("circle.ep-circle--empty");
      const id = wrapper.vm._uid;

      it("recognizes gradient colors", () => {
        expect(wrapper.vm.isEmptyColorGradient).to.be.true;
      });
      it("renders Gradient component", () => {
        expect(wrapper.contains(Gradient)).to.be.true;
      });
      it("applies gradient URL to SVG stroke", () => {
        expect(circleProgressWrapper.element.getAttribute("stroke")).to.equal(`url(#ep-empty-gradient-${id})`);
      });
      it("renders corresponding amount of stop colors SVG elements", () => {
        expect(wrapper.findAll("stop").length).to.equal(gradientColor.colors.length);
      });
    });
  });
  describe("#colorFill", () => {
    describe("applies color as string", () => {
      const colorFill = "#fff149";
      const wrapper = factory({ colorFill });
      const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

      it("do not recognize gradient colors", () => {
        expect(wrapper.vm.isColorGradient).to.be.false;
      });

      it("applies color correctly to SVG fill", () => {
        expect(circleProgressWrapper.element.getAttribute("fill")).to.equal(`${colorFill}`);
      });
    });
    describe("applies gradient color correctly", () => {
      const wrapper = factory({ colorFill: gradientColor });
      const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");
      const id = wrapper.vm._uid;

      it("recognizes gradient colors", () => {
        expect(wrapper.vm.isColorFillGradient).to.be.true;
      });
      it("renders Gradient component", () => {
        expect(wrapper.contains(Gradient)).to.be.true;
      });
      it("applies gradient URL to SVG fill", () => {
        expect(circleProgressWrapper.element.getAttribute("fill")).to.equal(`url(#ep-progress-fill-gradient-${id})`);
      });
      it("renders corresponding amount of stop colors SVG elements", () => {
        expect(wrapper.findAll("stop").length).to.equal(gradientColor.colors.length);
      });
    });
  });
  describe("#emptyColorFill", () => {
    describe("applies color as string", () => {
      const emptyColorFill = "#3f79ff";
      const wrapper = factory({ emptyColorFill });
      const emptyCircleWrapper = wrapper.find("circle.ep-circle--empty");

      it("do not recognize gradient colors", () => {
        expect(wrapper.vm.isEmptyColorGradient).to.be.false;
      });

      it("applies color correctly to SVG fill", () => {
        expect(emptyCircleWrapper.element.getAttribute("fill")).to.equal(`${emptyColorFill}`);
      });
    });
    describe("applies gradient color correctly", () => {
      const wrapper = factory({ emptyColorFill: gradientColor });
      const emptyCircleWrapper = wrapper.find("circle.ep-circle--empty");
      const id = wrapper.vm._uid;

      it("recognizes gradient colors", () => {
        expect(wrapper.vm.isEmptyColorFillGradient).to.be.true;
      });
      it("renders Gradient component", () => {
        expect(wrapper.contains(Gradient)).to.be.true;
      });
      it("applies gradient URL to SVG fill", () => {
        expect(emptyCircleWrapper.element.getAttribute("fill")).to.equal(`url(#ep-empty-fill-gradient-${id})`);
      });
      it("renders corresponding amount of stop colors SVG elements", () => {
        expect(wrapper.findAll("stop").length).to.equal(gradientColor.colors.length);
      });
    });
  });
};
