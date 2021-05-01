import { expect } from "chai";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import { factory, parseRawOptions } from "@/../tests/helper";
import { calcThickness } from "@/components/optionsParser";

const localFactory = (props) => factory({ container: CircleContainer, props });

const thicknessTests = (thicknessProp, selector, half) => {
  it("applies default 5% thickness", () => {
    const expectedThickness = calcThickness("5%", 200);
    const thickness = localFactory(parseRawOptions({ half })).find(selector).element.getAttribute("stroke-width");
    expect(`${expectedThickness}`).to.equal(`${thickness}`);
  });
  it("renders the circle line stroke thickness correctly", () => {
    const thickness = 4;

    const wrapper = localFactory(parseRawOptions({ [thicknessProp]: thickness, half }));
    const circleProgressWrapper = wrapper.find(selector);

    expect(circleProgressWrapper.element.getAttribute("stroke-width")).to.equal(`${thickness}`);
  });
  it("renders and calculates circle line stroke relative thickness correctly", () => {
    const thickness = "8%";

    const circleProgressWrapper = localFactory(parseRawOptions({ [thicknessProp]: thickness, half })).find(selector);
    expect(circleProgressWrapper.element.getAttribute("stroke-width")).to.equal(`${calcThickness(thickness, 200)}`);
  });
};

const runTest = (thicknessProp, half = false, empty = false) => {
  const circleClassPrefix = `ep-${half ? "half-" : ""}circle--`;
  const circleClassPostfix = `${empty ? "empty" : "progress"}`;
  const circleSelector = `.${circleClassPrefix}${circleClassPostfix}`;
  thicknessTests(thicknessProp, circleSelector, half, empty);
};

describe("Thickness", () => {
  describe("Circle", () => {
    const half = false;
    describe("#thickness", () => {
      runTest("thickness", half, false);
    });
    describe("#emptyThickness", () => {
      runTest("emptyThickness", half, true);
    });
  });
  describe("Half Circle", () => {
    const half = true;
    describe("#thickness", () => {
      runTest("thickness", half, false);
    });
    describe("#emptyThickness", () => {
      runTest("emptyThickness", half, true);
    });
  });
});
