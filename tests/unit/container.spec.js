import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Container from "../../src/components/VueEllipseProgress.vue";

describe("[ EllipseProgressContainer.vue ]", () => {
  /* describe("rendering", () => {
    it("renders the progress and empty circles", () => {
      const wrapper = mount(Container, {
        propsData: { progress: 50 }
      });

      expect(wrapper.find("circle.ep-circle--empty").exists()).to.equal(true);
      expect(wrapper.find("circle.ep-circle--progress").exists()).to.equal(true);
    });
  }); */
  describe("#size", () => {
    it("sets the size of the container correctly", () => {
      const size = 250;
      const wrapper = shallowMount(Container, {
        propsData: { size, progress: 50 }
      });
      expect(wrapper.element.style.maxWidth).to.equal("250px");
      expect(wrapper.element.style.maxHeight).to.equal("250px");
    });

    it("sets the size of the svg container correctly", () => {
      const size = 250;
      const wrapper = shallowMount(Container, {
        propsData: { size, progress: 50 }
      });

      const svgWrapper = wrapper.find("svg");

      expect(svgWrapper.element.getAttribute("width")).to.equal("250");
      expect(svgWrapper.element.getAttribute("height")).to.equal("250");
    });
  });
  describe("#angle", () => {
    it("sets the rotation of the svg container correctly", () => {
      // TODO: move to circle
    });
    it("sets the rotation of the svg container to default, if not defined", () => {
      // TODO: move to circle
    });
  });
  describe("#progress", () => {
    it("counts the decimals correctly", () => {
      let progress = 40;
      const wrapper = shallowMount(Container, {
        propsData: { progress }
      });
      expect(wrapper.vm.countDecimals).to.equal(0);

      progress = 56.34;
      wrapper.setProps({ progress });
      expect(wrapper.vm.countDecimals).to.equal(2);

      progress = -45.2456;
      wrapper.setProps({ progress });
      expect(wrapper.vm.countDecimals).to.equal(4);
    });
    it("forces noData state, if invalid", () => {
      const progress = "notANumber";
      const wrapper = shallowMount(Container, {
        propsData: { progress }
      });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.classes()).to.include("ep-hidden");
      expect(wrapper.vm.isDataAvailable).to.equal(false);
    });
  });
  describe("#legendValue", () => {
    const progress = 40;
    it("counts the decimals correctly", () => {
      const wrapper = shallowMount(Container, {
        propsData: { progress }
      });
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
      const wrapper = shallowMount(Container, {
        propsData: { progress, legendValue }
      });
      expect(wrapper.vm.legendVal).to.equal(legendValue);
      expect(wrapper.vm.progress).to.equal(progress);
    });
  });
  describe("#noData", () => {
    const wrapper = shallowMount(Container, {
      propsData: {
        noData: true,
        progress: 50
      }
    });
    it("hides the legend, if true", () => {
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.classes()).to.include("ep-hidden");
    });
  });
  describe("#loading", () => {
    const animation = {
      type: "default",
      duration: 1,
      delay: 0
    };
    it("hides the legend, if true", () => {
      const wrapper = shallowMount(Container, {
        propsData: {
          animation: `${animation.type} ${animation.duration} ${animation.delay}`,
          noData: true,
          progress: 50
        }
      });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.classes()).to.include("ep-hidden");
    });
  });
  describe("#fontSize", () => {
    it("sets the font size of the legend correctly", () => {
      const wrapper = shallowMount(Container, {
        propsData: { progress: 50, fontSize: "15px" }
      });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.element.style.fontSize).to.equal("15px");
    });
  });
  describe("#fontColor", () => {
    it("sets the font color of the legend correctly", () => {
      const wrapper = shallowMount(Container, {
        propsData: { progress: 50, fontColor: "lime" }
      });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.element.style.color).to.equal("lime");
    });
  });
  describe("#legendClass", () => {
    it("applies class to circle legend", () => {
      const wrapper = shallowMount(Container, {
        propsData: { progress: 50, legendClass: "applied-class" }
      });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.classes()).to.include("applied-class");
    });
  });
  describe("#slots", () => {
    describe("#legend-value", () => {
      it("renders provided slot content", () => {
        const wrapper = shallowMount(Container, {
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
        const wrapper = shallowMount(Container, {
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
