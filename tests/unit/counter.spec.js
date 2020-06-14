import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Counter from "../../src/components/Counter.vue";

const factory = (propsData) => {
  return mount(Counter, {
    propsData: { value: 50, loading: false, animation: "default 0 0", ...propsData },
  });
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("[ Counter.vue ]", () => {
  describe("#value", async () => {
    const counterWrapper = factory({ value: 50 }).findComponent(Counter);

    it("accepts `,` as delimiter", () => {
      counterWrapper.setProps({ value: "50,45" });
      expect(counterWrapper.vm.delimiter).to.equal(",");
    });

    it("displays the provided #value with `,` as delimiter", async () => {
      await wait(100);
      expect(counterWrapper.element.textContent).to.equal("50,45");
    });

    it("converts #value to decimal correctly, if provided with `,` as delimiter", () => {
      expect(counterWrapper.vm.end).to.equal(50.45);
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
