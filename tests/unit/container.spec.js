import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import VueEllipseProgress from "../../src/components/VueEllipseProgress.vue";

const factory = propsData => {
  return shallowMount(VueEllipseProgress, {
    propsData: { ...propsData }
  });
};

describe("[ EllipseProgressContainer.vue ]", () => {
  describe("#size", () => {
    const size = 250;
    const wrapper = factory({ size, progress: 50 });
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
    let progress = 40;
    const wrapper = factory({ progress });

    it("counts the decimals correctly", () => {
      expect(wrapper.vm.countDecimals).to.equal(0);

      progress = 56.34;
      wrapper.setProps({ progress });
      expect(wrapper.vm.countDecimals).to.equal(2);

      progress = -45.2456;
      wrapper.setProps({ progress });
      expect(wrapper.vm.countDecimals).to.equal(4);
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

    it("counts the decimals correctly", () => {
      expect(wrapper.vm.countDecimals).to.equal(0);

      let legendValue = 124.34;
      wrapper.setProps({ progress, legendValue });
      expect(wrapper.vm.countDecimals).to.equal(2);

      legendValue = -435.2456;
      wrapper.setProps({ progress, legendValue });
      expect(wrapper.vm.countDecimals).to.equal(4);
    });
    it("replaces the progress by legendValue as the legend of the circle", () => {
      const legendValue = 324;
      wrapper.setProps({ legendValue });
      expect(wrapper.vm.legendVal).to.equal(legendValue);
      expect(wrapper.vm.progress).to.equal(progress);
    });
  });
  describe("#noData", () => {
    const wrapper = factory({ progress: 50, noData: true });
    it("hides the legend, if true", () => {
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.classes()).to.include("ep-hidden");
    });
  });
  describe("#loading", () => {
    it("hides the legend, if true", () => {
      const wrapper = factory({ progress: 50, loading: true });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.classes()).to.include("ep-hidden");
    });
  });
  describe("#fontSize", () => {
    it("sets the font size of the legend correctly", () => {
      const wrapper = factory({ progress: 50, fontSize: "15px" });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.element.style.fontSize).to.equal("15px");
    });
  });
  describe("#fontColor", () => {
    it("sets the font color of the legend correctly", () => {
      const wrapper = factory({ progress: 50, fontColor: "lime" });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.element.style.color).to.equal("lime");
    });
  });
  describe("#legendClass", () => {
    it("applies class to circle legend", () => {
      const wrapper = factory({ progress: 50, legendClass: "applied-class" });
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
            "legend-value": '<span id="my-slot">Hello Circle</span>'
          }
        });
        expect(wrapper.contains("#my-slot")).to.be.true;
      });
    });
    describe("#legend-caption", () => {
      it("renders provided slot content", () => {
        const wrapper = shallowMount(VueEllipseProgress, {
          propsData: { progress: 50 },
          slots: {
            "legend-caption": '<span id="my-slot">Hello Circle</span>'
          }
        });
        expect(wrapper.contains("#my-slot")).to.be.true;
      });
    });
  });
});
