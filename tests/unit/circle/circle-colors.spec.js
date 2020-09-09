import { expect } from "chai";
import { mount } from "@vue/test-utils";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import Gradient from "@/components/Gradient.vue";

const factory = (colorObject = {}) => {
  return mount(CircleContainer, {
    propsData: {
      progress: 50,
      index: 0,
      multiple: false,
      ...colorObject,
    },
  });
};

const gradientColor = {
  radial: false,
  colors: [
    {
      color: "red",
      offset: 0,
      opacity: 0.5,
    },
    {
      color: "blue",
      offset: 100,
      opacity: 0,
    },
  ],
};

const colorTests = (colorProp, color, selector, fill = false) => {
  describe("applies color as string", () => {
    const wrapper = factory({ ...colorProp });
    const circleProgressWrapper = wrapper.find(selector);

    it("do not recognize gradient colors", () => {
      const type = selector.includes("empty") ? "EmptyColor" : "Color";
      const fillType = fill ? "Fill" : "";
      expect(wrapper.vm[`is${type}${fillType}Gradient`]).to.be.false;
    });

    it("do not renders Gradient component", () => {
      expect(wrapper.findComponent(Gradient).exists()).to.be.false;
    });

    it("applies color correctly to SVG stroke", () => {
      expect(circleProgressWrapper.element.getAttribute(`${fill ? "fill" : "stroke"}`)).to.equal(`${color}`);
    });
  });
};

const gradientColorTests = (colorProp, selector, urlPrefix, fill = false) => {
  describe("applies gradient color correctly", () => {
    const wrapper = factory(colorProp);
    const circleWrapper = wrapper.find(selector);
    const id = wrapper.vm._uid;
    const stopColorWrappers = wrapper.findAll("stop");

    it("recognizes gradient colors", () => {
      const type = selector.includes("empty") ? "EmptyColor" : "Color";
      const fillType = fill ? "Fill" : "";
      expect(wrapper.vm[`is${type}${fillType}Gradient`]).to.be.true;
    });
    it("renders Gradient component", () => {
      expect(wrapper.findComponent(Gradient).exists()).to.be.true;
    });
    it(`applies gradient URL to SVG ${fill ? "fill" : "stroke"}`, () => {
      expect(circleWrapper.element.getAttribute(`${fill ? "fill" : "stroke"}`)).to.equal(
        `url(#${urlPrefix}-gradient-${id})`
      );
    });
    it("renders corresponding amount of stop colors SVG elements", () => {
      expect(stopColorWrappers.length).to.equal(gradientColor.colors.length);
    });
    for (let i = 0; i < stopColorWrappers.length; i++) {
      it("applies opacity correctly to each stop color SVG element", () => {
        expect(stopColorWrappers.at(i).element.getAttribute("stop-opacity")).to.equal(
          `${gradientColor.colors[i].opacity}`
        );
      });
      it("applies color correctly to each stop color SVG element", () => {
        expect(stopColorWrappers.at(i).element.getAttribute("stop-color")).to.equal(`${gradientColor.colors[i].color}`);
      });
      it("applies offset correctly to each stop color SVG element", () => {
        expect(stopColorWrappers.at(i).element.getAttribute("offset")).to.equal(`${gradientColor.colors[i].offset}%`);
      });
    }
  });
};

describe("#color", () => {
  const color = "#ff0020";
  colorTests({ color }, color, "circle.ep-circle--progress");
  gradientColorTests({ color: gradientColor }, "circle.ep-circle--progress", "ep-progress");
});
describe("#emptyColor", () => {
  const emptyColor = "#a617ff";
  colorTests({ emptyColor }, emptyColor, "circle.ep-circle--empty");
  gradientColorTests({ emptyColor: gradientColor }, "circle.ep-circle--empty", "ep-empty");
});
describe("#colorFill", () => {
  const colorFill = "#fff149";
  colorTests({ colorFill }, colorFill, "circle.ep-circle--progress", true);
  gradientColorTests({ colorFill: gradientColor }, "circle.ep-circle--progress", "ep-progress-fill", true);
});
describe("#emptyColorFill", () => {
  const emptyColorFill = "#3f79ff";
  colorTests({ emptyColorFill }, emptyColorFill, "circle.ep-circle--empty", true);
  gradientColorTests({ emptyColorFill: gradientColor }, "circle.ep-circle--empty", "ep-empty-fill", true);
});
