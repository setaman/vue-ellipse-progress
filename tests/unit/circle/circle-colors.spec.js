import { expect } from "chai";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import Gradient from "@/components/Gradient.vue";
import { factory, parseRawOptions } from "@/../tests/helper";

const localFactory = (props) =>
  factory({
    container: CircleContainer,
    props: parseRawOptions({
      ...props,
      loader: {
        color: "red",
      },
    }),
  });

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

const colorAsStringTests = (colorProp, color, selector, fill = false, half) => {
  describe("applies color as string", () => {
    const wrapper = localFactory({ ...colorProp, half });
    const circleWrapper = wrapper.find(selector);

    it("do not recognize gradient colors", () => {
      const type = selector.includes("empty") ? "EmptyColor" : "Color";
      const fillType = fill ? "Fill" : "";
      expect(wrapper.vm[`is${type}${fillType}Gradient`]).to.be.false;
    });

    it("do not renders Gradient component", () => {
      expect(wrapper.findComponent(Gradient).exists()).to.be.false;
    });

    it("applies color correctly to SVG stroke", () => {
      expect(circleWrapper.element.getAttribute(`${fill ? "fill" : "stroke"}`)).to.equal(`${color}`);
    });
  });
};

const gradientColorTests = (colorProp, selector, gradientURLPrefix, fill = false, half) => {
  describe("applies gradient color correctly", () => {
    const wrapper = localFactory({ ...colorProp, half });
    const { uid } = wrapper.componentVM;
    const circleWrapper = wrapper.find(selector);
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
        `url(#${gradientURLPrefix}-gradient-${uid})`
      );
    });
    it("renders corresponding amount of stop colors SVG elements", () => {
      expect(stopColorWrappers.length).to.equal(gradientColor.colors.length);
    });
    for (let i = 0; i < stopColorWrappers.length; i++) {
      it("applies opacity correctly to each stop color SVG element", () => {
        expect(stopColorWrappers[i].element.getAttribute("stop-opacity")).to.equal(
          `${gradientColor.colors[i].opacity}`
        );
      });
      it("applies color correctly to each stop color SVG element", () => {
        expect(stopColorWrappers[i].element.getAttribute("stop-color")).to.equal(`${gradientColor.colors[i].color}`);
      });
      it("applies offset correctly to each stop color SVG element", () => {
        expect(stopColorWrappers[i].element.getAttribute("offset")).to.equal(`${gradientColor.colors[i].offset}%`);
      });
    }
  });
};

const colorTests = (colorProp, half = false, empty = false, gradientURLPrefix) => {
  const circleClassPrefix = `ep-${half ? "half-" : ""}circle--`;
  const circleClassPostfix = `${empty ? "empty" : "progress"}`;
  const circleSelector = `.${circleClassPrefix}${circleClassPostfix}`;

  const color = "#ff0020";

  it("does not render fill circle", () => {
    expect(
      localFactory({ [colorProp]: color, half })
        .find(`.ep-${half ? "half-" : ""}circle--${empty ? "empty" : "progress"}__fill`)
        .exists()
    ).to.be.false;
  });

  colorAsStringTests({ [colorProp]: color }, color, circleSelector, false, half);
  gradientColorTests({ [colorProp]: gradientColor }, circleSelector, gradientURLPrefix, false, half);
};

const colorFillTests = (colorProp, half = false, empty = false, gradientURLPrefix) => {
  const circleClassPrefix = `ep-${half ? "half-" : ""}circle--`;
  const circleClassPostfix = `${empty ? "empty" : "progress"}__fill`;
  const circleSelector = `.${circleClassPrefix}${circleClassPostfix}`;

  const color = "#ff0020";

  it("renders fill circle", () => {
    expect(
      localFactory({ [colorProp]: color, half })
        .find(circleSelector)
        .exists()
    ).to.be.true;
  });

  colorAsStringTests({ [colorProp]: color }, color, circleSelector, true, half);
  gradientColorTests({ [colorProp]: gradientColor }, circleSelector, gradientURLPrefix, true, half);
};

describe("Colors", () => {
  describe("Circle", () => {
    const half = false;
    describe("#color", () => {
      colorTests("color", half, false, "ep-progress");
    });
    describe("#emptyColor", () => {
      colorTests("emptyColor", half, true, "ep-empty");
    });
    describe("#colorFill", () => {
      colorFillTests("colorFill", half, false, "ep-progress-fill");
    });
    describe("#emptyColorFill", () => {
      colorFillTests("emptyColorFill", half, true, "ep-empty-fill");
    });
  });
  describe("Half Circle", () => {
    const half = true;
    describe("#color", () => {
      colorTests("color", half, false, "ep-progress");
    });
    describe("#emptyColor", () => {
      colorTests("emptyColor", half, true, "ep-empty");
    });
    describe("#colorFill", () => {
      colorFillTests("colorFill", half, false, "ep-progress-fill");
    });
    describe("#emptyColorFill", () => {
      colorFillTests("emptyColorFill", half, true, "ep-empty-fill");
    });
  });
});
