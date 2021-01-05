import { expect } from "chai";
import Circle from "@/components/Circle/Circle.vue";
import { factory, setCircleProps } from "@/../tests/helper";
import { lineModeParser, animationParser } from "@/components/optionsParser";

const localFactory = (props) => factory({ container: Circle, props });
const localLineModeParser = (lineMode) => lineModeParser(lineMode, false);

const compareRadiusValues = (circleWrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius) => {
  const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
  const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

  const progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
  const emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");

  expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
  expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
};

const progress = 50;
const size = 200;
const baseRadius = size / 2;

describe("#line", () => {
  it("renders line type correctly", async () => {
    let line = "round";

    const wrapper = localFactory({ line });
    const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");
    expect(circleProgressWrapper.element.getAttribute("stroke-linecap")).to.equal(`${line}`);

    line = "butt";
    await setCircleProps(wrapper, { line });
    expect(circleProgressWrapper.element.getAttribute("stroke-linecap")).to.equal(`${line}`);

    line = "square";
    await setCircleProps(wrapper, { line });
    expect(circleProgressWrapper.element.getAttribute("stroke-linecap")).to.equal(`${line}`);
  });
});
describe("#lineMode", () => {
  describe("#lineMode.mode", () => {
    describe("#lineMode.mode.center", () => {
      let thickness = 20;
      let emptyThickness = 10;
      const wrapper = localFactory({
        thickness,
        emptyThickness,
        lineMode: localLineModeParser("center"),
        animation: animationParser("default 0 0"),
      });

      describe("radius of the circles does not exceed the size and aligns properly in relation to each other", () => {
        it("in case #thickness >= #emptyThickness", async () => {
          let expectedProgressCircleRadius = baseRadius - thickness / 2;
          let expectedEmptyCircleRadius = expectedProgressCircleRadius;
          compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);

          thickness = emptyThickness = 10;

          await setCircleProps(wrapper, { thickness, emptyThickness });

          expectedProgressCircleRadius = baseRadius - thickness / 2;
          expectedEmptyCircleRadius = expectedProgressCircleRadius;
          compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
        });
        it("in case #thickness >= #emptyThickness and #lineMode.offset = 10", async () => {
          // offset must be ignored in this mode
          await setCircleProps(wrapper, { lineMode: localLineModeParser("center 10") });

          let expectedProgressCircleRadius = baseRadius - thickness / 2;
          let expectedEmptyCircleRadius = expectedProgressCircleRadius;
          compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);

          thickness = emptyThickness = 10;

          await setCircleProps(wrapper, { thickness, emptyThickness });

          expectedProgressCircleRadius = baseRadius - thickness / 2;
          expectedEmptyCircleRadius = expectedProgressCircleRadius;
          compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
        });
        it("in case #thickness < #emptyThickness", async () => {
          thickness = 10;
          emptyThickness = 20;

          await setCircleProps(wrapper, { thickness, emptyThickness });

          const expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
          const expectedProgressCircleRadius = expectedEmptyCircleRadius;
          compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
        });
        it("in case #thickness < #emptyThickness and #lineMode.offset = 10", async () => {
          // offset must be ignored in this mode
          thickness = 10;
          emptyThickness = 20;

          await setCircleProps(wrapper, { thickness, emptyThickness, lineMode: localLineModeParser("center 10") });

          const expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
          const expectedProgressCircleRadius = expectedEmptyCircleRadius;
          compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
        });
      });
    });
    describe("#lineMode.mode.in", () => {
      const offset = 10;
      const thickness = 20;
      const emptyThickness = 10;
      const wrapper = localFactory({
        thickness,
        emptyThickness,
        lineMode: localLineModeParser(`in ${offset}`),
      });

      it("circles does not exceed the size and aligns properly in relation to each other", () => {
        const expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
        const expectedProgressCircleRadius = expectedEmptyCircleRadius - emptyThickness / 2 - thickness / 2 - offset;
        compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
      });
    });
    describe("#lineMode.mode.in-over", () => {
      const offset = 10; // must be ignored in this mode
      const thickness = 20;
      const emptyThickness = 10;
      const wrapper = localFactory({
        thickness,
        emptyThickness,
        lineMode: localLineModeParser(`in-over ${offset}`),
      });

      it("circles does not exceed the size and aligns properly in relation to each other", () => {
        const expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
        const expectedProgressCircleRadius = baseRadius - thickness / 2;
        compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
      });
    });
    describe("#lineMode.mode.out", () => {
      const offset = 10;
      const thickness = 10;
      const emptyThickness = 10;
      const wrapper = localFactory({
        progress,
        thickness,
        emptyThickness,
        lineMode: localLineModeParser(`out ${offset}`),
      });

      it("circles does not exceed the size and aligns properly in relation to each other", () => {
        const expectedProgressCircleRadius = baseRadius - emptyThickness / 2;
        const expectedEmptyCircleRadius = expectedProgressCircleRadius - emptyThickness / 2 - thickness / 2 - offset;
        compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
      });
    });
    describe("#lineMode.mode.out-over", () => {
      const offset = 10; // must be ignored in this mode
      let thickness = 20;
      let emptyThickness = 10;
      const wrapper = localFactory({
        thickness,
        emptyThickness,
        lineMode: localLineModeParser(`out-over ${offset}`),
      });

      describe("radius of the circles does not exceed the size and aligns properly in relation to each other", () => {
        it("in case #thickness >= #emptyThickness", async () => {
          let expectedProgressCircleRadius = baseRadius - thickness / 2;
          let expectedEmptyCircleRadius = expectedProgressCircleRadius - thickness / 2 + emptyThickness / 2;
          compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);

          thickness = emptyThickness = 10;

          await setCircleProps(wrapper, { thickness, emptyThickness });

          expectedProgressCircleRadius = baseRadius - thickness / 2;
          expectedEmptyCircleRadius = expectedProgressCircleRadius;
          compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
        });
        it("in case #thickness < #emptyThickness", async () => {
          thickness = 10;
          emptyThickness = 20;

          await setCircleProps(wrapper, { thickness, emptyThickness });

          const expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
          const expectedProgressCircleRadius = expectedEmptyCircleRadius - emptyThickness / 2 + thickness / 2;
          compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
        });
      });
    });
    describe("#lineMode.mode.top", () => {
      const offset = 10; // must be ignored in this mode
      const thickness = 20;
      const emptyThickness = 20;
      const wrapper = localFactory({
        thickness,
        emptyThickness,
        lineMode: localLineModeParser(`top ${offset}`),
      });

      it("circles does not exceed the size and aligns properly in relation to each other", () => {
        const expectedProgressCircleRadius = baseRadius - thickness / 2;
        const expectedEmptyCircleRadius = expectedProgressCircleRadius - emptyThickness / 2;
        compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
      });
    });
    describe("#lineMode.mode.bottom", () => {
      const offset = 10; // must be ignored in this mode
      let thickness = 40;
      let emptyThickness = 10;
      const wrapper = localFactory({
        thickness,
        emptyThickness,
        lineMode: localLineModeParser(`bottom ${offset}`),
      });

      describe("radius of the circles does not exceed the size and aligns properly in relation to each other", () => {
        it("in case #thickness * 2 > #emptyThickness", () => {
          const expectedProgressCircleRadius = baseRadius - thickness / 2;
          const expectedEmptyCircleRadius = expectedProgressCircleRadius + emptyThickness / 2;
          compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
        });
        it("in case #thickness * 2 <= #emptyThickness", async () => {
          thickness = 10;
          emptyThickness = 20;

          await setCircleProps(wrapper, { thickness, emptyThickness });

          let expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
          let expectedProgressCircleRadius = expectedEmptyCircleRadius - emptyThickness / 2;
          compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);

          thickness = emptyThickness = 20;

          await setCircleProps(wrapper, { thickness, emptyThickness });

          expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
          expectedProgressCircleRadius = expectedEmptyCircleRadius - emptyThickness / 2;
          compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
        });
      });
    });
  });
});
