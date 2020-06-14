import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Counter from "../../src/components/Counter.vue";

const factory = (propsData) => {
  return mount(Counter, {
    propsData: { value: 50, loading: false, animation: "default 500 100", ...propsData },
  });
};

describe("[ Counter.vue ]", () => {
  describe("#value", async () => {
    const value = "50,45";
    const counterWrapper = factory({ value });

    it("accepts `,` as delimiter", () => {
      expect(counterWrapper.vm.delimiter).to.equal(",");
    });

    it("displays the provided #value with `,` as delimiter", () => {
      expect(counterWrapper.element.textContent).to.have.string(",");
    });

    it("parses #animation prop correctly", () => {
      expect(counterWrapper.vm.duration).to.equal(500);
      expect(counterWrapper.vm.delay).to.equal(100);
    });

    it("converts #value to decimal correctly, if provided with `,` as delimiter", () => {
      expect(counterWrapper.vm.end).to.equal(parseFloat(value.replace(",", ".")));
    });

    it("shows the start value with right number of decimals places", () => {
      expect(counterWrapper.element.textContent).to.equal("0,00");
    });

    it("calculates the difference between the start and end values correctly", () => {
      const endValue = parseFloat(value.replace(",", "."));
      const startValue = 0;
      const diff = Math.abs(endValue - startValue);
      expect(counterWrapper.vm.difference).to.equal(diff);
    });

    it("calculates the one step count value correctly", () => {
      const endValue = parseFloat(value.replace(",", "."));
      const startValue = 0;
      const diff = Math.abs(endValue - startValue);
      const duration = 500;
      const oneStepCountValue = diff / duration;
      expect(counterWrapper.vm.oneStepDifference).to.equal(oneStepCountValue);
    });

    it("calculates the one step count value correctly with 0 duration", () => {
      counterWrapper.setProps({ animation: "default 0 0" });
      const endValue = parseFloat(value.replace(",", "."));
      const startValue = 0;
      const diff = Math.abs(endValue - startValue);
      expect(counterWrapper.vm.oneStepDifference).to.equal(diff);
    });

    const values = [
      { v: -45.2456, c: 4 },
      { v: 56.34, c: 2 },
      { v: "25,564", c: 3 },
    ];
    for (const val of values) {
      it(`counts the decimals correctly for ${val.v}`, () => {
        const { v, c } = val;
        const localCounterWrapper = factory({ value: v }).findComponent(Counter);
        expect(localCounterWrapper.vm.countDecimals()).to.equal(c);
      });
    }
  });
});
