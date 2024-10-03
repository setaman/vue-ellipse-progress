import { expect } from "chai";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import CircleLoader from "@/components/Circle/CircleLoader.vue";
import HalfCircleLoader from "@/components/Circle/HalfCircleLoader.vue";
import { factory, parseRawOptions } from "@/../tests/helper";

const localFactory = (props) => factory({ container: CircleContainer, props: parseRawOptions(props) });

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
      expect(localFactory({ half, loading: true }).find(selector).classes())
        .to.be.an("array")
        .that.includes("animation__loading");
    });
    it("has transparent fill color", () => {
      expect(localFactory({ half, loading: true }).find(selector).element.getAttribute("fill")).to.equal("transparent");
    });
    describe("replicates progress circle by default", () => {
      const props = {
        color: "gray",
        line: "square",
        lineMode: "in 10",
        thickness: 15,
      };

      const wrapper = localFactory({
        color: props.color,
        thickness: props.thickness,
        line: props.line,
        half,
        loading: true,
      });
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
  describe("loader.color", () => {
    it("applies color as string", () => {
      expect(
        localFactory({ half, loading: true, loader: { color: "green" } })
          .find(selector)
          .element.getAttribute("stroke")
      ).to.equal("green");
    });
    it("applies gradient color", () => {
      expect(
        localFactory({
          half,
          loading: true,
          loader: {
            color: {
              colors: [
                { color: "red", offset: "0" },
                { color: "yellow", offset: "100" },
              ],
            },
          },
        })
          .find(selector)
          .element.getAttribute("stroke")
      ).to.contain("url(#ep-loader-gradient-");
    });
  });
  describe("loader.thickness", () => {
    it("applies thickness correctly", () => {
      expect(
        localFactory({ half, loading: true, loader: { thickness: 15 } })
          .find(selector)
          .element.getAttribute("stroke-width")
      ).to.equal("15");
    });
  });
  describe("loader.opacity", () => {
    it("has default 0.55 opacity", () => {
      expect(
        localFactory({ half, loading: true }).find(`.ep-${half ? "half-" : ""}circle--loader__container`).element.style
          .opacity
      ).to.equal("0.55");
    });
    it("applies opacity value correctly", () => {
      expect(
        localFactory({ half, loading: true, loader: { opacity: 0.3 } }).find(
          `.ep-${half ? "half-" : ""}circle--loader__container`
        ).element.style.opacity
      ).to.equal("0.3");
    });
  });
  describe("loader.line", () => {
    it("applies line prop correctly", () => {
      expect(
        localFactory({ half, loading: true, loader: { line: "butt" } })
          .find(`.ep-${half ? "half-" : ""}circle--loader`)
          .element.getAttribute("stroke-linecap")
      ).to.equal("butt");
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
