import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import Container from "../../src/components/EllipseProgressContainer.vue";

describe("[ EllipseProgressContainer.vue ]", () => {
  describe("Rendering", () => {
    it("renders the progress and empty circles", () => {
      const wrapper = mount(Container, {
        propsData: { progress: 50 }
      });

      expect(wrapper.find("circle.ep-circle--empty").exists()).to.equal(true);
      expect(wrapper.find("circle.ep-circle--progress").exists()).to.equal(true);
    });
  });
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
  describe("#transition", () => {
    it("sets the transition property of the container correctly", () => {
      const animation = {
        type: "default",
        duration: 1000,
        delay: 300
      };
      const wrapper = shallowMount(Container, {
        propsData: { animation, progress: 50 }
      });
      expect(wrapper.element.style.transition).to.equal(`${animation.duration}ms ease-in-out`);
    });
  });
  describe("#angle", () => {
    it("sets the rotation of the svg container correctly", () => {
      const angle = 40;
      const wrapper = shallowMount(Container, {
        propsData: { angle, progress: 50 }
      });
      const svgWrapper = wrapper.find("svg");
      expect(svgWrapper.element.style.transform).to.equal(`rotate(${angle}deg)`);
    });
    it("sets the rotation of the svg container to default, if not defined", () => {
      const wrapper = shallowMount(Container, {
        propsData: { progress: 50 }
      });
      const svgWrapper = wrapper.find("svg");
      expect(svgWrapper.element.style.transform).to.equal("rotate(-90deg)");
    });
  });
  describe("#progress", () => {
    const animation = {
      type: "default",
      duration: 1,
      delay: 1
    };
    /* it("renders the progress correctly", async () => {
      let progress = 40;
      const wrapper = mount(Container, {
        propsData: { animation, progress }
      });
      await wait(2000);
      const spanWrapper = wrapper.find(".ep-legend--value > span");
      console.log("Text:", spanWrapper.text());
      expect(spanWrapper.text()).to.equal(`${progress}`);

      progress = 56.34;
      wrapper.vm.progress = progress;
      expect(spanWrapper.text()).to.equal(`${progress}`);

      progress = -45.24;
      wrapper.vm.progress = progress;
      expect(spanWrapper.text()).to.equal(`${progress}`);
    }); */
    it("counts the decimals correctly", () => {
      let progress = 40;
      const wrapper = shallowMount(Container, {
        propsData: { animation, progress }
      });
      expect(wrapper.vm.countDecimals).to.equal(0);

      progress = 56.34;
      wrapper.setProps({ progress });
      expect(wrapper.vm.countDecimals).to.equal(2);

      progress = -45.2456;
      wrapper.setProps({ progress });
      expect(wrapper.vm.countDecimals).to.equal(4);
    });
    it("replaces the progress by legendValue as the legend of the circle", () => {
      const legendValue = 324;
      const progress = 50;
      const wrapper = shallowMount(Container, {
        propsData: { progress, legendValue }
      });
      expect(wrapper.vm.legendVal).to.equal(legendValue);
      expect(wrapper.vm.progress).to.equal(progress);
    });
    // Produces error, see corresponding issue
    /* it("forces noData state, if invalid", () => {
      const progress = "s3ome";
      const wrapper = shallowMount(Container, {
        propsData: { progress }
      });
      const spanWrapper = wrapper.find(".ep-legend--value");
      expect(spanWrapper.classes()).to.include("ep-hidden");
      // expect(wrapper.vm.dataIsAvailable).to.equal(false);
    }); */
  });
  describe("#noData", () => {
    const animation = {
      type: "default",
      duration: 1,
      delay: 0
    };
    it("hides the legend, if true", () => {
      const wrapper = shallowMount(Container, {
        propsData: { animation, noData: true, progress: 50 }
      });
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
        propsData: { animation, noData: true, progress: 50 }
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
});
