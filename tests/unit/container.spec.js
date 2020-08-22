import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import Vue from "vue";
import VueEllipseProgress from "@/components/VueEllipseProgress.vue";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import Counter from "@/components/Counter.vue";

const factory = (propsData) => {
  return mount(VueEllipseProgress, {
    propsData: { progress: 50, ...propsData },
    stubs: {
      CircleContainer,
    },
  });
};

// https://github.com/vuejs/vue-test-utils/issues/974
global.requestAnimationFrame = () => {};
global.cancelAnimationFrame = () => {};

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
