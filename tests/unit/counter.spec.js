import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

const factory = (propsData, slots) => {
  return mount(Counter, {
    propsData: { counterTick: {}, value: 50, loading: false, animation: "default 100 100", ...propsData },
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
    const values = [
      { value: -45.2456, count: 4, start: "0.0000" },
      { value: 56.34, count: 2, start: "0.00" },
      { value: "25,564", count: 3, start: "0,000" },
      { value: "-30,5", count: 1, start: "0,0" },
    ];
    const animation = { duration: 100, delay: 100 };
    for (const val of values) {
      const { value, count, start } = val;
      const counterWrapper = factory({ value, animation: `default ${animation.duration} ${animation.delay}` });

      it(`counts the decimals correctly for ${value}`, () => {
        expect(counterWrapper.vm.countDecimals()).to.equal(count);
      });

      it("renders the start value with the correct number of decimals places", () => {
        expect(counterWrapper.element.textContent).to.equal(start);
      });

      if (value.toString().includes(",")) {
        it("accepts `,` as delimiter", () => {
          expect(counterWrapper.vm.delimiter).to.equal(",");
        });

        it("displays the provided #value with `,` as delimiter", () => {
          expect(counterWrapper.element.textContent).to.have.string(",");
        });

        it("converts #value to decimal correctly, if provided with `,` as delimiter", () => {
          expect(counterWrapper.vm.end).to.equal(parseFloat(value.toString().replace(",", ".")));
        });
      }

      it("parses #animation prop correctly", () => {
        expect(counterWrapper.vm.duration).to.equal(animation.duration);
        expect(counterWrapper.vm.delay).to.equal(animation.delay);
      });

      it("calculates the difference between the start and end values correctly", () => {
        const endValue = parseFloat(value.toString().replace(",", "."));
        const startValue = 0;
        const diff = Math.abs(endValue - startValue);
        expect(counterWrapper.vm.difference).to.equal(diff);
      });

      it("calculates the one step count value correctly", () => {
        const endValue = parseFloat(value.toString().replace(",", "."));
        const startValue = 0;
        const diff = Math.abs(endValue - startValue);
        const duration = animation.duration;
        const oneStepCountValue = diff / duration;
        expect(counterWrapper.vm.oneStepDifference).to.equal(oneStepCountValue);
      });

      it("calculates the one step count value correctly with 0 duration", () => {
        counterWrapper.setProps({ animation: "default 0 0" });
        const endValue = parseFloat(value.toString().replace(",", "."));
        const startValue = 0;
        const diff = Math.abs(endValue - startValue);
        expect(counterWrapper.vm.oneStepDifference).to.equal(diff);
      });
    }
  });
  describe("#legendFormatter", () => {
    it("passes counter tick properties to formatter function", () => {
      const formatter = (counterTick) => counterTick;
      const counterWrapper = factory({ value: 50, legendFormatter: formatter });
      expect(counterWrapper.vm.customFormattedValue).to.be.a("object");
      expect(counterWrapper.vm.customFormattedValue).to.have.property("currentValue");
    });

    it("renders the custom formatted value", (done) => {
      const customFormat = (value) => `Formatted: ${value}`;
      const formatter = ({ currentValue }) => customFormat(currentValue);
      const counterWrapper = factory({ value: 50, legendFormatter: formatter, animation: "default 0 0" });
      setTimeout(() => {
        expect(counterWrapper.vm.customFormattedValue).to.equal(customFormat(50));
        done();
      }, 50);
    });

    describe("custom format via default slot", () => {
      const counterWrapper = factory(
        {},
        {
          default: '<span class="my-formatter-slot">Formatted 100</span>',
        }
      );

      it("renders provided slot", () => {
        expect(counterWrapper.find(".my-formatter-slot").exists()).to.be.true;
      });

      it("do not renders other elements", () => {
        expect(counterWrapper.findAll("span")).to.have.lengthOf(2);
      });
    });

    describe("#legendFormatter HTML return value", () => {
      const customFormat = (value) => `<span class="my-custom-format">Formatted ${value}</span>`;
      const formatter = ({ currentValue }) => customFormat(currentValue);
      const counterWrapper = factory({ value: 50, legendFormatter: formatter, animation: "default 0 0" });

      it("recognises HTML formatter return value ", (done) => {
        setTimeout(() => {
          expect(counterWrapper.vm.customFormattedValue).to.equal(customFormat(50));
          expect(counterWrapper.vm.isHTML).to.be.true;
          done();
        }, 10);
      });
      it("renders the formatter returned HTML", () => {
        expect(counterWrapper.find(".my-custom-format").exists()).to.be.true;
      });
      it("renders the formatter HTML return value ", (done) => {
        setTimeout(() => {
          expect(counterWrapper.find(".my-custom-format").element.textContent).to.equal("Formatted 50");
          done();
        }, 50);
      });
    });
  });
});
