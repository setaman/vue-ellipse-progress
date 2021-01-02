import { expect } from "chai";
import { mount } from "@vue/test-utils";
import VueEllipseProgress from "@/components/VueEllipseProgress.vue";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import Counter from "@/components/Counter.vue";
import { animationParser, dotParser, dashParser, lineModeParser, linePositionParser } from "@/components/optionsParser";
import props from "@/components/interface";

const factory = (propsData, slots = {}) => {
  return mount(VueEllipseProgress, {
    props: { progress: 50, ...propsData },
    slots,
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
      expect(wrapper.element.style.width).to.equal(`${size}px`);
      expect(wrapper.element.style.height).to.equal(`${size}px`);
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
      await wrapper.setProps({ progress: "notNumber" });

      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.classes()).to.include("ep-hidden");
      expect(wrapper.vm.isDataAvailable).to.equal(false);
    });
  });
  describe("#legend", () => {
    const progress = 40;
    const wrapper = factory({ progress });

    it("replaces the progress as the legend of the circle", async () => {
      const legend = 324;
      await wrapper.setProps({ legend });
      expect(wrapper.vm.computedLegend).to.equal(legend);
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
  /* describe("#slots", () => {
    describe("#legend-value", () => {
      it("renders provided slot content", () => {
        const wrapper = mount(VueEllipseProgress, {
          props: { progress: 50 },
          slots: {
            "legend-value": '<span id="my-slot">Hello Circle</span>',
          },
        });
        expect(wrapper.get("#my-slot"));
      });
    });
    describe("#legend-caption", () => {
      it("renders provided slot content", () => {
        const wrapper = mount(VueEllipseProgress, {
          props: { progress: 50 },
          slots: {
            "legend-caption": '<span id="my-slot">Hello Circle</span>',
          },
        });
        expect(wrapper.get("#my-slot"));
      });
    });
    describe("#default", () => {
      const wrapper = factory(
        { progress: 35, animation: "default 0 0" },
        {
          default: `
              <template #default="counterParams" >
                <span class="my-formatter-slot">Formatted {{ counterParams.counterTick.currentValue }}</span>
              </template>`,
        }
      );

      it("renders provided slot", () => {
        expect(wrapper.find(".my-formatter-slot").exists()).to.be.true;
      });

      it("renders via provided slot formatted value", (done) => {
        setTimeout(() => {
          expect(wrapper.find(".my-formatter-slot").element.textContent).to.equal("Formatted 35");
          done();
        }, 100);
      });

      it("do not renders other elements", () => {
        expect(wrapper.findComponent(Counter).findAll("span")).to.have.lengthOf(2);
      });
    });
  }); */
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
      expect(wrapper.findAllComponents(CircleContainer).length).to.equal(data.length);
    });
    it("merges circles props with the global props", () => {
      const { circlesData } = wrapper.vm;
      const globalProps = wrapper.props();
      for (const circleProps of circlesData) {
        for (const prop of Object.keys(circleProps)) {
          // this must be overwritten, omitted or are circle specific
          if (["progress", "color", "loading", "data", "multiple"].includes(prop)) {
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
  describe("#legendFormatter", () => {
    it("renders the custom formatted value", (done) => {
      const customFormat = (value) => `Formatted: ${value}`;
      const formatter = ({ currentValue }) => customFormat(currentValue);
      const wrapper = factory({ legend: 120, legendFormatter: formatter, animation: "default 0 0" });
      setTimeout(() => {
        expect(wrapper.find(".ep-legend--value__counter").element.textContent).to.equal(customFormat(120));
        done();
      }, 100);
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
  describe("Options parsers", () => {
    describe("#dot parser", () => {
      const circleSize = 200;
      it("applies default value correctly", () => {
        const { size, color } = dotParser(0, circleSize);
        expect(size).to.equal(0);
        expect(color).to.equal("white");
      });
      it(`parses property as Number correctly`, () => {
        const { size, color } = dotParser(5, circleSize);
        expect(size).to.equal(5);
        expect(color).to.equal("white");
      });
      it(`parses property as String correctly`, () => {
        const { size, color } = dotParser("20 red", circleSize);
        expect(size).to.equal(20);
        expect(color).to.equal("red");
      });
      it(`parses property as Object correctly`, () => {
        const { size, backgroundColor } = dotParser({ size: 10, backgroundColor: "green" }, circleSize);
        expect(size).to.equal(10);
        expect(backgroundColor).to.equal("green");
      });

      it(`converts the size percent value to pixel correctly`, () => {
        const { size } = dotParser("5%", circleSize);
        const dotPixelSize = (5 * circleSize) / 100;
        expect(size).to.equal(dotPixelSize);
      });
      it("parses custom styles correctly", () => {
        const dot = {
          size: 10,
          backgroundColor: "yellow",
          width: "15px",
        };
        const { size, width, backgroundColor } = dotParser(dot, circleSize);
        expect(size).to.equal(dot.size);
        expect(backgroundColor).to.equal(dot.backgroundColor);
        expect(width).to.equal(dot.width);
      });
    });
    describe("#animation parser", () => {
      it("applies default #animation value", () => {
        const defaultAnimation = {
          type: "default",
          duration: 1000,
          delay: 400,
        };
        const parsedAnimation = animationParser(props.animation.default);
        for (const prop in defaultAnimation) {
          expect(parsedAnimation[prop]).to.equal(defaultAnimation[prop]);
        }
      });
      it("parses #animation correctly", () => {
        const { type, duration, delay } = animationParser("rs 500 300");
        expect(type).to.equal("rs");
        expect(duration).to.equal(500);
        expect(delay).to.equal(300);
      });
      it("parses #animation correctly with default duration", () => {
        const { type, duration } = animationParser("bounce");
        expect(type).to.equal("bounce");
        expect(duration).to.equal(animationParser(props.animation.default).duration);
      });
      it("parses #animation correctly with default delay", () => {
        const { type, duration, delay } = animationParser("bounce 2000");
        expect(type).to.equal("bounce");
        expect(duration).to.equal(2000);
        expect(delay).to.equal(animationParser(props.animation.default).delay);
      });
      it("parses #animation incorrectly with wrong arguments order", () => {
        const { type, duration, delay } = animationParser("300 rs 2000");
        expect(type).to.not.equal("rs");
        expect(duration).to.not.equal(300);
        expect(delay).to.equal(2000);
      });
      it("applies default values for duration and delay if invalid values provided", () => {
        const { duration, delay } = animationParser("loop 20%0 sdf");
        expect(duration).to.not.equal(animationParser(props.animation.default).duration);
        expect(delay).to.equal(animationParser(props.animation.default).delay);
      });
    });
    describe("#dash parser", () => {
      it("returns the value as without strict mode", () => {
        const dash = "10 20";
        expect(dashParser(dash)).to.equal(dash);
      });
      it("parses the value correctly is strict mode", () => {
        const dash = "strict 50 0.5";
        const { count, spacing } = dashParser(dash);
        expect(count).to.equal(50);
        expect(spacing).to.equal(0.5);
      });
      it("parses default value correctly", () => {
        expect(dashParser(props.dash.default)).to.equal("");
      });
    });
    describe("#lineMode parser", () => {
      it("parses default value correctly", () => {
        const defaultLineMode = {
          mode: "normal",
          offset: 0,
        };
        const { mode, offset } = lineModeParser(props.lineMode.default, false);
        expect(mode).to.equal(defaultLineMode.mode);
        expect(offset).to.equal(defaultLineMode.offset);
      });
      it("parses value correctly", () => {
        const { mode, offset } = lineModeParser("in 10", false);
        expect(mode).to.equal("in");
        expect(offset).to.equal(10);
      });
      it("applies default offset correctly", () => {
        const { mode, offset } = lineModeParser("out", false);
        expect(mode).to.equal("out");
        expect(offset).to.equal(0);
      });
      it("applies special multiple mode for multiple circles", () => {
        const { mode, offset } = lineModeParser("out", true);
        expect(mode).to.equal("multiple");
        expect(offset).to.equal(0);
      });
    });
    describe("#linePosition parser", () => {
      it("parses default value correctly", () => {
        const defaultLineMode = {
          position: "center",
          offset: 0,
        };
        const { position, offset } = linePositionParser(props.linePosition.default);
        expect(position).to.equal(defaultLineMode.position);
        expect(offset).to.equal(defaultLineMode.offset);
      });
      it("parses value correctly", () => {
        const { position, offset } = linePositionParser("in 10");
        expect(position).to.equal("in");
        expect(offset).to.equal(10);
      });
      it("applies default offset correctly", () => {
        const { position, offset } = lineModeParser("out");
        expect(position).to.equal("out");
        expect(offset).to.equal(0);
      });
    });
  });
});
