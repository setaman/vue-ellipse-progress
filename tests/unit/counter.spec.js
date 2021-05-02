import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";
import VueEllipseProgress from "@/components/VueEllipseProgress.vue";

const factory = (propsData, slots) => {
  return mount(VueEllipseProgress, {
    propsData: {
      progress: 50,
      loading: false,
      animation: "default 100 200",
      ...propsData,
    },
    slots,
  });
};

let lastTime = 0;

// rAF polyfill: https://gist.github.com/paulirish/1579671
global.requestAnimationFrame = (callback) => {
  const currTime = new Date().getTime();
  const timeToCall = Math.max(0, 16 - (currTime - lastTime));
  const id = setTimeout(() => {
    callback(currTime + timeToCall);
  }, timeToCall);
  lastTime = currTime + timeToCall;
  return id;
};
global.cancelAnimationFrame = (id) => clearTimeout(id);

describe("[ Counter.vue ]", () => {
  describe("#value", async () => {
    it("renders the final value correctly", (done) => {
      const counterWrapper = factory({
        legend: 50,
        animation: `default 0 0`,
      }).findComponent(Counter);
      setTimeout(() => {
        expect(counterWrapper.element.textContent).to.equal("50");
      }, 100);
      done();
    });

    const values = [
      {
        legend: -45.2456,
        count: 4,
        start: "0.0000",
      },
      {
        legend: 56.34,
        count: 2,
        start: "00.00",
      },
      {
        legend: "25,564",
        count: 3,
        start: "00,000",
      },
      {
        legend: "-30,5",
        count: 1,
        start: "0,0",
      },
    ];
    const animation = {
      duration: 100,
      delay: 1000,
    };
    for (const val of values) {
      const { legend, count, start } = val;
      const wrapper = factory({
        legend,
        animation: `default ${animation.duration} ${animation.delay}`,
      });
      const counterWrapper = wrapper.findComponent(Counter);

      it("counts the decimals correctly", () => {
        expect(counterWrapper.vm.decimalsCount).to.equal(count);
      });

      it("renders the start value with the correct number of decimals places", () => {
        expect(counterWrapper.element.textContent).to.equal(start);
      });

      if (legend.toString().includes(",")) {
        it("accepts `,` as delimiter", () => {
          expect(counterWrapper.vm.delimiter).to.equal(",");
        });

        it("displays the provided #value with `,` as delimiter", () => {
          expect(counterWrapper.element.textContent).to.have.string(",");
        });

        it("converts #value to decimal correctly, if provided with `,` as delimiter", () => {
          expect(counterWrapper.vm.end).to.equal(parseFloat(legend.toString().replace(",", ".")));
        });
      }

      it("calculates the difference between the start and end values correctly", () => {
        const endValue = parseFloat(legend.toString().replace(",", "."));
        const startValue = 0;
        const diff = Math.abs(endValue - startValue);
        expect(counterWrapper.vm.difference).to.equal(diff);
      });

      it("calculates the one step count value correctly", () => {
        const endValue = parseFloat(legend.toString().replace(",", "."));
        const startValue = 0;
        const diff = Math.abs(endValue - startValue);
        const duration = animation.duration;
        const oneStepCountValue = diff / duration;
        expect(counterWrapper.vm.oneStepDifference).to.equal(oneStepCountValue);
      });

      it("calculates the one step count value correctly with 0 duration", async () => {
        await wrapper.setProps({ animation: "default 0 0" });
        const endValue = parseFloat(legend.toString().replace(",", "."));
        const startValue = 0;
        const diff = Math.abs(endValue - startValue);
        expect(counterWrapper.vm.oneStepDifference).to.equal(diff);
      });
    }
  });
  describe("#animation", async () => {
    it("do not count the value before delay", (done) => {
      const counterWrapper = factory({
        legend: 50,
        animation: "default 200 600",
      }).findComponent(Counter);
      expect(counterWrapper.vm.currentValue).to.equal(0);
      expect(counterWrapper.element.textContent).to.equal("0");
      setTimeout(() => {
        expect(counterWrapper.vm.currentValue).to.equal(0);
        expect(counterWrapper.element.textContent).to.equal("0");
        done();
      }, 500);
    });
  });
});
