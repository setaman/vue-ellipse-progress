import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import Vue from "vue";
import VueEllipseProgress from "@/components/VueEllipseProgress.vue";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import Counter from "@/components/Counter.vue";

const factory = (propsData, scopedSlots = {}) => {
  return mount(VueEllipseProgress, {
    propsData: { progress: 50, ...propsData },
    scopedSlots,
    stubs: {
      CircleContainer,
    },
  });
};

// https://github.com/vuejs/vue-test-utils/issues/974
// rAF polyfill: https://gist.github.com/paulirish/1579671
let lastTime = 0;
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

describe("[ EllipseProgressContainer.vue ]", () => {
  describe("#size", () => {
    const size = 250;
    const wrapper = factory({ size });
    it("sets the size of the container correctly", () => {
      expect(wrapper.element.style.maxWidth).to.equal(`${size}px`);
      expect(wrapper.element.style.maxHeight).to.equal(`${size}px`);
    });

    it("sets the size of the svg container correctly", () => {
      const svgWrapper = wrapper.find("svg");

      expect(svgWrapper.element.getAttribute("width")).to.equal(`${size}`);
      expect(svgWrapper.element.getAttribute("height")).to.equal(`${size}`);
    });
  });
  describe("#progress", () => {
    const progress = 40;
    const wrapper = factory({ progress });

    it("renders the counter component", async () => {
      expect(wrapper.findComponent(Counter).exists()).to.be.true;
    });

    it("forces noData state, if invalid", async () => {
      wrapper.setProps({ progress: "notNumber" });
      await Vue.nextTick();

      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.classes()).to.include("ep-hidden");
      expect(wrapper.vm.isDataAvailable).to.equal(false);
    });
  });
  describe("#legendValue", () => {
    const progress = 40;
    const wrapper = factory({ progress });

    it("replaces the progress as the legend of the circle", () => {
      const legendValue = 324;
      wrapper.setProps({ legendValue });
      expect(wrapper.vm.legendVal).to.equal(legendValue);
      expect(wrapper.vm.progress).to.equal(progress);
    });
  });
  describe("#noData", () => {
    const wrapper = factory({ noData: true });
    it("hides the legend, if true", () => {
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.classes()).to.include("ep-hidden");
    });
  });
  describe("#loading", () => {
    it("hides the legend, if true", () => {
      const wrapper = factory({ loading: true });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.classes()).to.include("ep-hidden");
    });
  });
  describe("#fontSize", () => {
    it("sets the font size of the legend correctly", () => {
      const wrapper = factory({ fontSize: "15px" });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.element.style.fontSize).to.equal("15px");
    });
  });
  describe("#fontColor", () => {
    it("sets the font color of the legend correctly", () => {
      const wrapper = factory({ fontColor: "lime" });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.element.style.color).to.equal("lime");
    });
  });
  describe("#legendClass", () => {
    it("applies class to circle legend", () => {
      const wrapper = factory({ legendClass: "applied-class" });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.classes()).to.include("applied-class");
    });
  });
  describe("#slots", () => {
    describe("#legend-value", () => {
      it("renders provided slot content", () => {
        const wrapper = shallowMount(VueEllipseProgress, {
          propsData: { progress: 50 },
          slots: {
            "legend-value": '<span id="my-slot">Hello Circle</span>',
          },
        });
        expect(wrapper.contains("#my-slot")).to.be.true;
      });
    });
    describe("#legend-caption", () => {
      it("renders provided slot content", () => {
        const wrapper = shallowMount(VueEllipseProgress, {
          propsData: { progress: 50 },
          slots: {
            "legend-caption": '<span id="my-slot">Hello Circle</span>',
          },
        });
        expect(wrapper.contains("#my-slot")).to.be.true;
      });
    });
    describe("#legendFormatter", () => {
      /* it("passes counter tick properties to formatter function", () => {
        const formatter = (counterTick) => counterTick;
        const counterWrapper = factory({ value: 50, legendFormatter: formatter });
        expect(counterWrapper.vm.customFormattedValue).to.be.a("object");
        expect(counterWrapper.vm.customFormattedValue).to.have.property("currentValue");
      }); */

      it("renders the custom formatted value", (done) => {
        const customFormat = (value) => `Formatted: ${value}`;
        const formatter = ({ currentValue }) => customFormat(currentValue);
        const wrapper = factory({ legendValue: 135, legendFormatter: formatter, animation: "default 0 0" });
        setTimeout(() => {
          expect(wrapper.find(".ep-legend--value__counter").element.textContent).to.equal(customFormat(135));
          done();
        }, 50);
      });

      describe("custom format via default slot", () => {
        const wrapper = factory(
          { progress: 35 },
          {
            default: `
              <v-template v-slot:default="{ counterTick }" >
                <span class="my-formatter-slot">Formatted {{ counterTick.currentValue }}</span>
              </v-template>`,
          }
        );

        it("renders provided slot", () => {
          expect(wrapper.find(".my-formatter-slot").exists()).to.be.true;
        });

        it("renders via provided slot formatted value", () => {
          expect(wrapper.find(".my-formatter-slot").element.textContent).to.equal("Formatted 35");
        });

        it("do not renders other elements", () => {
          expect(wrapper.findAll("span")).to.have.lengthOf(1);
        });
      });

      describe("#legendFormatter HTML return value", () => {
        const customFormat = (value) => `<span class="my-custom-format">Formatted ${value}</span>`;
        const formatter = ({ currentValue }) => customFormat(currentValue);
        const counterWrapper = factory({ value: 50, legendFormatter: formatter, animation: "default 0 0" });

        it("recognises HTML formatter return value ", (done) => {
          setTimeout(() => {
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
  describe("#data", () => {
    const data = [
      { progress: 25, color: "red" },
      { progress: 35, color: "blue" },
      { progress: 55, color: "green", loading: true },
    ];
    const wrapper = mount(VueEllipseProgress, { propsData: { progress: 10, data, color: "pink" } });
    it("hides the circle legend", () => {
      expect(wrapper.find(".ep-legend--value").exists()).to.be.false;
    });
    it(`renders ${data.length} circles`, () => {
      expect(wrapper.findAll(CircleContainer).length).to.equal(data.length);
    });
    it("merges circles props with the global props", () => {
      const { circlesData } = wrapper.vm;
      const globalProps = wrapper.props();
      for (const circleProps of circlesData) {
        for (const prop of Object.keys(circleProps)) {
          // this must be overwritten
          if (prop === "progress" || prop === "color" || prop === "loading") {
            continue;
          }
          expect(circleProps[prop]).to.equal(globalProps[prop]);
        }
      }
    });
    it("overrides global props by circles props", () => {
      const { circlesData } = wrapper.vm;
      for (let i = 0; i < data.length; i++) {
        for (const prop of Object.keys(data[i])) {
          expect(circlesData[i][prop]).to.equal(data[i][prop]);
        }
      }
    });
  });
});
