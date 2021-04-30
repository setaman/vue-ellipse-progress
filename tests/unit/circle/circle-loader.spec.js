import { expect } from "chai";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import CircleLoader from "@/components/Circle/CircleLoader.vue";
import HalfCircleLoader from "@/components/Circle/HalfCircleLoader.vue";
import { factory, parseRawOptions } from "@/../tests/helper";

const localFactory = (props) => factory({ container: CircleContainer, props });

const loaderTests = (selector, half = false) => {
  describe("loader", () => {
    it("do not renders loader component by default", () => {
      expect(
        localFactory({ half })
          .findComponent(half ? HalfCircleLoader : CircleLoader)
          .exists()
      ).to.be.false;
    });
    it("do not renders loader component in loading und noData states", () => {
      expect(
        localFactory({ half, loading: true, noData: true })
          .findComponent(half ? HalfCircleLoader : CircleLoader)
          .exists()
      ).to.be.false;
    });
    it("renders loader component in loading mod", () => {
      expect(
        localFactory({ half, loading: true })
          .findComponent(half ? HalfCircleLoader : CircleLoader)
          .exists()
      ).to.be.true;
    });
    it("renders loader component in determinate mod", () => {
      expect(
        localFactory({ half, determinate: true })
          .findComponent(half ? HalfCircleLoader : CircleLoader)
          .exists()
      ).to.be.true;
    });
    it("has a loading animation class", () => {
      expect(localFactory({ half, determinate: true }).find(selector).classes())
        .to.be.an("array")
        .that.includes("animation__loading");
    });
    describe("replicates progress circle by default", () => {
      const props = {
        color: "gray",
        line: "square",
        lineMode: "in 10",
        thickness: 15,
      };

      const parsedProps = parseRawOptions({ color: props.color, thickness: props.thickness, line: props.line });
      const wrapper = localFactory({ ...parsedProps, half, loading: true });
      const loaderWrapper = wrapper.find(selector);
      const expectedRadius = wrapper
        .find(`.ep-${half ? "half-" : ""}circle--progress`)
        .element.getAttribute(half ? "d" : "r");

      const testsMap = {
        color: () => expect(loaderWrapper.element.getAttribute("stroke")).to.equal(`${props.color}`),
        line: () => expect(loaderWrapper.element.getAttribute("stroke-linecap")).to.equal(`${props.line}`),
        thickness: () => expect(loaderWrapper.element.getAttribute("stroke-width")).to.equal(`${props.thickness}`),
        lineMode: () => expect(loaderWrapper.element.getAttribute(half ? "d" : "r")).to.equal(`${expectedRadius}`),
      };

      for (const prop in props) {
        it(`replicates ${prop} prop`, () => {
          testsMap[prop]();
        });
      }
    });
  });
};

const runTest = (half = false) => {
  const circleClassPrefix = `ep-${half ? "half-" : ""}circle--`;
  const circleSelector = `.${circleClassPrefix}loader`;
  loaderTests(circleSelector, half);
};

describe("Loader", () => {
  describe("Circle", () => {
    const half = false;
    describe("#loader", () => {
      runTest(half);
    });
  });
  describe("Half Circle", () => {
    const half = true;
    describe("#loader", () => {
      runTest(half);
    });
  });
});
