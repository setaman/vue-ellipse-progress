import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Circle from "../../../src/components/Circle/CircleProgress.vue";

const compareRadiusValues = (circleWrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius) => {
  const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
  const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

  const progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
  const emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");

  expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
  expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
};

const factory = propsData => {
  return mount(Circle, {
    propsData: {
      ...propsData,
      id: 1,
      index: 0,
      multiple: false
    }
  });
};

export default () => {
  describe("#line", () => {
    it("renders line type correctly", async () => {
      const progress = 60;
      const line = "round";

      const wrapper = factory({
        progress,
        line
      });
      const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");
      expect(circleProgressWrapper.element.getAttribute("stroke-linecap")).to.equal(`${line}`);
    });
  });
  describe("#lineMode", () => {
    describe("#lineMode.mode", () => {
      const progress = 50;
      const size = 200;
      const baseRadius = size / 2;

      describe("#lineMode.mode.normal", () => {
        let thickness = 20;
        let emptyThickness = 10;
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: "normal",
          animation: "default 0 0",
          size
        });

        describe("radius of the circles does not exceed the size and aligns properly in relation to each other", () => {
          it("in case #thickness >= #emptyThickness", async () => {
            let expectedProgressCircleRadius = baseRadius - thickness / 2;
            let expectedEmptyCircleRadius = expectedProgressCircleRadius;
            compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);

            thickness = emptyThickness = 10;

            wrapper.setProps({ thickness, emptyThickness });
            await Vue.nextTick();

            expectedProgressCircleRadius = baseRadius - thickness / 2;
            expectedEmptyCircleRadius = expectedProgressCircleRadius;
            compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
          });
          it("in case #thickness >= #emptyThickness and #lineMode.offset = 10", async () => {
            // offset must be ignored in this mode
            wrapper.setProps({ lineMode: "normal 10" });
            await Vue.nextTick();

            let expectedProgressCircleRadius = baseRadius - thickness / 2;
            let expectedEmptyCircleRadius = expectedProgressCircleRadius;
            compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);

            thickness = emptyThickness = 10;

            wrapper.setProps({ thickness, emptyThickness });
            await Vue.nextTick();

            expectedProgressCircleRadius = baseRadius - thickness / 2;
            expectedEmptyCircleRadius = expectedProgressCircleRadius;
            compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
          });
          it("in case #thickness < #emptyThickness", async () => {
            thickness = 10;
            emptyThickness = 20;

            wrapper.setProps({ thickness, emptyThickness });
            await Vue.nextTick();

            const expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
            const expectedProgressCircleRadius = expectedEmptyCircleRadius;
            compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
          });
          it("in case #thickness < #emptyThickness and #lineMode.offset", async () => {
            // offset must be ignored in this mode
            thickness = 10;
            emptyThickness = 20;

            wrapper.setProps({ thickness, emptyThickness, lineMode: "normal 10" });
            await Vue.nextTick();

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
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: `in ${offset}`,
          size
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
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: `in-over ${offset}`,
          size
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
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: `out ${offset}`,
          size
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
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: `out-over ${offset}`,
          size
        });

        describe("radius of the circles does not exceed the size and aligns properly in relation to each other", () => {
          it("in case #thickness >= #emptyThickness", async () => {
            let expectedProgressCircleRadius = baseRadius - thickness / 2;
            let expectedEmptyCircleRadius = expectedProgressCircleRadius - thickness / 2 + emptyThickness / 2;
            compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);

            thickness = emptyThickness = 10;

            wrapper.setProps({ thickness, emptyThickness });
            await Vue.nextTick();

            expectedProgressCircleRadius = baseRadius - thickness / 2;
            expectedEmptyCircleRadius = expectedProgressCircleRadius;
            compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
          });
          it("in case #thickness < #emptyThickness", async () => {
            thickness = 10;
            emptyThickness = 20;

            wrapper.setProps({ thickness, emptyThickness });
            await Vue.nextTick();

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
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: `top ${offset}`,
          size
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
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: `bottom ${offset}`,
          size
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

            wrapper.setProps({ thickness, emptyThickness });
            await Vue.nextTick();

            let expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
            let expectedProgressCircleRadius = expectedEmptyCircleRadius - emptyThickness / 2;
            compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);

            thickness = emptyThickness = 20;

            wrapper.setProps({ thickness, emptyThickness });
            await Vue.nextTick();

            expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
            expectedProgressCircleRadius = expectedEmptyCircleRadius - emptyThickness / 2;
            compareRadiusValues(wrapper, expectedProgressCircleRadius, expectedEmptyCircleRadius);
          });
        });
      });
    });
  });
};
