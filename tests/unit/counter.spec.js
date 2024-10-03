import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";
import VueEllipseProgress from "@/components/VueEllipseProgress.vue";
import { nextTick } from "vue";
import { wait } from "../helper";

const factory = (propsData, slots) => {
  return mount(VueEllipseProgress, {
    props: {
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
    it("renders the final value correctly", async () => {
      const counterWrapper = factory({
        legend: "50.00",
        animation: `default 0 0`,
      }).findComponent(Counter);

      // need to await RAF tick, tests is flaky
      await wait(200);
      await nextTick();

      expect(counterWrapper.element.textContent).to.equal("50.00");
    });

    const values = [
      {
        legend: -45.2456,
        decimalsCount: 4,
        start: "0.0000",
        delimiter: ".",
      },
      {
        legend: 56.34,
        decimalsCount: 2,
        start: "0.00",
        delimiter: ".",
      },
      {
        legend: 98.0,
        decimalsCount: 0,
        start: "0",
        delimiter: ".",
      },
      {
        legend: "98.0",
        decimalsCount: 1,
        start: "00.0",
        delimiter: ".",
      },
      {
        legend: "100.00",
        decimalsCount: 2,
        start: "000.00",
        delimiter: ".",
      },
      {
        legend: "00100.00",
        decimalsCount: 2,
        start: "00000.00",
        delimiter: ".",
      },
      {
        legend: "56.34",
        decimalsCount: 2,
        start: "00.00",
        delimiter: ".",
      },
      {
        legend: "25,564",
        decimalsCount: 3,
        start: "00,000",
        delimiter: ",",
      },
      {
        legend: "-30,5",
        decimalsCount: 1,
        // templating not supported for negative values in integer part
        start: "0,0",
        delimiter: ",",
      },
      {
        legend: "-40,500",
        decimalsCount: 3,
        start: "0,000",
        delimiter: ",",
      },
    ];
    const animation = {
      duration: 100,
      delay: 1000,
    };
    for (const val of values) {
      const { legend, decimalsCount, start, delimiter } = val;
      const wrapper = factory({
        legend,
        animation: `default ${animation.duration} ${animation.delay}`,
      });

      describe(`${legend}`, () => {
        const counterWrapper = wrapper.findComponent(Counter);

        it("counts the decimals correctly", () => {
          expect(counterWrapper.vm.decimalsCount).to.equal(decimalsCount);
        });

        it("renders the start value with the correct number of decimals places", () => {
          const textContent = counterWrapper.element.textContent;
          const delimiterIndex = textContent.indexOf(delimiter);
          let renderedDecimalsCount = 0;
          if (delimiterIndex >= 0) {
            renderedDecimalsCount = textContent.slice(delimiterIndex + 1).length;
          }
          expect(renderedDecimalsCount).to.equal(decimalsCount);
        });

        it("renders the start value with the correct number of integer places", () => {
          if (typeof legend === "string") {
            const renderedIntegerPart = counterWrapper.element.textContent.split(delimiter)[0].replace("-", "");
            const legendIntegerPart = start.split(delimiter)[0];
            expect(renderedIntegerPart.length).to.equal(legendIntegerPart.length);
          } else {
            expect(true).to.equal(true);
          }
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
      });
    }
  });
  describe("#animation", async () => {
    it("do not count the value before delay", (done) => {
      const counterWrapper = factory({
        legend: 50,
        animation: "default 500 1000",
      }).findComponent(Counter);
      expect(counterWrapper.vm.currentValue).to.equal(0);
      expect(counterWrapper.element.textContent).to.equal("0");
      setTimeout(() => {
        expect(counterWrapper.vm.currentValue).to.equal(0);
        expect(counterWrapper.element.textContent).to.equal("0");
        done();
      }, 300);
    });
  });
});
