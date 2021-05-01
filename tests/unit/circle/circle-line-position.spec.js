import { expect } from "chai";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import Circle from "@/components/Circle/Circle.vue";
import HalfCircle from "@/components/Circle/HalfCircle.vue";
import { factory, parseRawOptions } from "@/../tests/helper";

const localFactory = (props) =>
  factory({
    container: CircleContainer,
    props: parseRawOptions({ colorFill: "black", emptyColorFill: "black", ...props }),
  });

const linePositionTests = (linePositionProp, selector, half = false, empty = false) => {
  describe("linePosition.mode", () => {
    describe("linePosition.mode.center", () => {
      const wrapper = localFactory({ [linePositionProp]: "center", half });
      const fillCircleWrapper = wrapper.find(selector);
      const circleWrapper = wrapper.findComponent(half ? HalfCircle : Circle);

      it("calculates the radius correctly", () => {
        const expectedRadius = empty ? circleWrapper.vm.emptyRadius : circleWrapper.vm.radius;
        const fillCircleRadius = empty ? circleWrapper.vm.emptyFillRadius : circleWrapper.vm.fillRadius;
        expect(fillCircleRadius).to.equal(expectedRadius);
      });

      it("applies the radius to SVG elements correctly", () => {
        let expectedValue = "";
        if (half) {
          expectedValue = empty ? circleWrapper.vm.emptyFillPath : circleWrapper.vm.fillPath;
        } else {
          expectedValue = empty ? circleWrapper.vm.emptyRadius : circleWrapper.vm.radius;
        }
        const value = fillCircleWrapper.element.getAttribute(half ? "d" : "r");
        expect(value).to.equal(`${expectedValue}`);
      });
    });
    describe("linePosition.mode.in", () => {
      const thickness = 20;
      const size = 200;
      const wrapper = localFactory({
        [linePositionProp]: "in",
        half,
        size,
        thickness,
        emptyThickness: thickness,
      });
      const fillCircleWrapper = wrapper.find(selector);
      const circleWrapper = wrapper.findComponent(half ? HalfCircle : Circle);

      it("calculates the radius correctly", () => {
        const expectedRadius = (empty ? circleWrapper.vm.emptyRadius : circleWrapper.vm.radius) + thickness / 2;
        const fillCircleRadius = empty ? circleWrapper.vm.emptyFillRadius : circleWrapper.vm.fillRadius;
        expect(fillCircleRadius).to.equal(expectedRadius);
      });

      it("applies the radius to SVG elements correctly", () => {
        let expectedValue = "";
        const expectedRadius = (empty ? circleWrapper.vm.emptyRadius : circleWrapper.vm.radius) + thickness / 2;
        if (half) {
          expectedValue = ` M ${size / 2 - expectedRadius}, ${size / 2} a ${expectedRadius},${expectedRadius} 0 1,1 ${
            expectedRadius * 2
          },0`;
        } else {
          expectedValue = expectedRadius;
        }
        const value = fillCircleWrapper.element.getAttribute(half ? "d" : "r");
        expect(value).to.equal(`${expectedValue}`);
      });
    });
    describe("linePosition.mode.out", () => {
      const thickness = 20;
      const size = 200;
      const offset = 0;
      const wrapper = localFactory({
        [linePositionProp]: `out ${offset}`,
        half,
        size,
        thickness,
        emptyThickness: thickness,
      });
      const fillCircleWrapper = wrapper.find(selector);
      const circleWrapper = wrapper.findComponent(half ? HalfCircle : Circle);

      it("calculates the radius correctly", () => {
        const calculatedOffset = thickness / 2 + offset;
        const expectedRadius = (empty ? circleWrapper.vm.emptyRadius : circleWrapper.vm.radius) - calculatedOffset;
        const fillCircleRadius = empty ? circleWrapper.vm.emptyFillRadius : circleWrapper.vm.fillRadius;
        expect(fillCircleRadius).to.equal(expectedRadius);
      });

      it("applies the radius to SVG elements correctly", () => {
        const calculatedOffset = thickness / 2 + offset;
        let expectedValue = "";
        const expectedRadius = (empty ? circleWrapper.vm.emptyRadius : circleWrapper.vm.radius) - calculatedOffset;
        if (half) {
          expectedValue = ` M ${size / 2 - expectedRadius}, ${size / 2} a ${expectedRadius},${expectedRadius} 0 1,1 ${
            expectedRadius * 2
          },0`;
        } else {
          expectedValue = expectedRadius;
        }
        const value = fillCircleWrapper.element.getAttribute(half ? "d" : "r");
        expect(value).to.equal(`${expectedValue}`);
      });
    });
    describe("linePosition.mode.out and offset", () => {
      const thickness = 20;
      const size = 200;
      const offset = 20;
      const wrapper = localFactory({
        [linePositionProp]: `out ${offset}`,
        half,
        size,
        thickness,
        emptyThickness: thickness,
      });
      const fillCircleWrapper = wrapper.find(selector);
      const circleWrapper = wrapper.findComponent(half ? HalfCircle : Circle);

      it("calculates the radius correctly", () => {
        const calculatedOffset = thickness / 2 + offset;
        const expectedRadius = (empty ? circleWrapper.vm.emptyRadius : circleWrapper.vm.radius) - calculatedOffset;
        const fillCircleRadius = empty ? circleWrapper.vm.emptyFillRadius : circleWrapper.vm.fillRadius;
        expect(fillCircleRadius).to.equal(expectedRadius);
      });

      it("applies the radius to SVG elements correctly", () => {
        const calculatedOffset = thickness / 2 + offset;
        let expectedValue = "";
        const expectedRadius = (empty ? circleWrapper.vm.emptyRadius : circleWrapper.vm.radius) - calculatedOffset;
        if (half) {
          expectedValue = ` M ${size / 2 - expectedRadius}, ${size / 2} a ${expectedRadius},${expectedRadius} 0 1,1 ${
            expectedRadius * 2
          },0`;
        } else {
          expectedValue = expectedRadius;
        }
        const value = fillCircleWrapper.element.getAttribute(half ? "d" : "r");
        expect(value).to.equal(`${expectedValue}`);
      });
    });
  });
};

const runTest = (linePositionProp, half = false, empty = false) => {
  const circleClassPrefix = `ep-${half ? "half-" : ""}circle--`;
  const circleClassPostfix = `${empty ? "empty" : "progress"}__fill`;
  const circleSelector = `.${circleClassPrefix}${circleClassPostfix}`;
  linePositionTests(linePositionProp, circleSelector, half, empty);
};

describe("Line Position", () => {
  describe("Circle", () => {
    const half = false;
    describe("#linePosition", () => {
      runTest("linePosition", half, false);
    });
    describe("#emptyLinePosition", () => {
      runTest("emptyLinePosition", half, true);
    });
  });
  describe("Half Circle", () => {
    const half = true;
    describe("#linePosition", () => {
      runTest("linePosition", half, false);
    });
    describe("#emptyLinePosition", () => {
      runTest("emptyLinePosition", half, true);
    });
  });
});
