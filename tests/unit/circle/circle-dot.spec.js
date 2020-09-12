import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import VueEllipseProgress from "@/components/VueEllipseProgress.vue";
import Circle from "@/components/Circle/Circle.vue";
import CircleDot from "@/components/Circle/CircleDot.vue";
import { dotParser } from "@/components/optionsParser";

const factory = (propsData, container = Circle) => {
  return mount(container, {
    propsData: {
      index: 0,
      id: 123,
      multiple: false,
      ...propsData,
    },
  });
};

describe("#dot", () => {
  const progress = 50;
  const thickness = 5;
  const size = 500;
  const globalDot = "5%";

  const calculateThickness = (t) => (t.toString().includes("%") ? (parseFloat(t) * size) / 100 : t);

  it(`parses property as Number correctly`, () => {
    const wrapper = factory({ progress, size, dot: 0 });
    expect(wrapper.vm.parsedDot.size).to.equal("0");
    expect(wrapper.vm.parsedDot.color).to.equal("white");
  });
  it(`parses property as String correctly`, () => {
    const wrapper = factory({ progress, size, dot: "5% red" });
    expect(wrapper.vm.parsedDot.size).to.equal("5%");
    expect(wrapper.vm.parsedDot.color).to.equal("red");
  });
  it(`parses property as Object correctly`, () => {
    const wrapper = factory({ progress, size, dot: { size: 10, backgroundColor: "green" } });
    expect(wrapper.vm.parsedDot.size).to.equal(10);
    expect(wrapper.vm.parsedDot.color).to.equal("white");
    expect(wrapper.vm.parsedDot.backgroundColor).to.equal("green");
  });

  it(`converts the size percent value to pixel correctly`, () => {
    const dot = "5%";
    const wrapper = factory({ progress, size, dot });
    const dotPixelSize = calculateThickness(dot);
    expect(wrapper.vm.dotSize).to.equal(dotPixelSize);
  });

  it("applies default value correctly", () => {
    const wrapper = factory({ progress }, VueEllipseProgress);
    const circleWrapper = wrapper.findComponent(Circle);
    const circleContainerWrapper = wrapper.findComponent(CircleContainer);

    expect(wrapper.props("dot")).to.equal(0);
    expect(circleContainerWrapper.props("dot")).to.equal(0);
    expect(circleWrapper.vm.parsedDot.size).to.equal("0");
    expect(circleWrapper.vm.parsedDot.color).to.equal("white");
    expect(circleWrapper.vm.dotSize).to.equal(0);
  });

  it(`calculates and applies correct rotation of the dot container depending on progress`, (done) => {
    const wrapper = factory({ progress, dot: 5, animation: "default 0 0" }, CircleContainer);
    const circleDotWrapper = wrapper.findComponent(CircleDot);
    const rotationStart = wrapper.props("angle") + 90;
    const rotation = rotationStart + (progress * 360) / 100;
    setTimeout(() => {
      expect(circleDotWrapper.element.style.transform).to.equal(`rotate(${rotation}deg)`);
      done();
    }, 0);
  });

  it(`applies correct initial rotation of the dot container`, async () => {
    const wrapper = factory({ progress, dot: 5, animation: "default 0 1000" }, CircleContainer);
    const circleDotWrapper = wrapper.findComponent(CircleDot);
    const angle = wrapper.props("angle");
    const rotationStart = angle + 90;
    expect(circleDotWrapper.element.style.transform).to.equal(`rotate(${rotationStart}deg)`);

    wrapper.setProps({ half: true });
    const halfRotationStart = angle - 90;
    await Vue.nextTick();
    expect(circleDotWrapper.element.style.transform).to.equal(`rotate(${halfRotationStart}deg)`);
  });

  const data = [
    { progress, thickness, dot: 5 },
    { progress, thickness, dot: "5" },
    { progress, thickness, dot: "5%" },
    { progress, thickness, dot: "5% red" },
    { progress, thickness, dot: "5 blue" },
    { progress, thickness, dot: { size: 5 } },
    { progress, thickness, dot: { size: "5%" } },
    { progress, thickness, dot: { size: 5, backgroundColor: "yellow" } },
    { progress, thickness, dot: { size: "3%", background: "green", borderRadius: "2px" } },
  ];

  for (let i = 0; i < data.length; i++) {
    const circleData = data[i];
    const wrapper = factory({ size, dot: globalDot, ...circleData }, CircleContainer);
    const circleDotSpanWrapper = wrapper.find("span.ep-circle--progress__dot");
    const circleDotWrapper = wrapper.findComponent(CircleDot);
    const circleWrapper = wrapper.findComponent(Circle);
    const parsedDot = dotParser(circleData.dot !== undefined ? circleData.dot : globalDot);
    const parsedDotSize = parseFloat(calculateThickness(parsedDot.size));
    const parsedDotColor = parsedDot.backgroundColor || parsedDot.background || parsedDot.color;

    it(`renders dot component | #dot = ${circleData.dot}`, () => {
      expect(wrapper.findComponent(CircleDot).exists()).to.be.true;
    });

    it(`applies the size of the dot correctly | #dot = ${circleData.dot}`, () => {
      expect(circleDotSpanWrapper.element.style.width).to.equal(`${parsedDotSize}px`);
    });

    it(`applies the color of the dot correctly | #dot = ${circleData.dot}`, () => {
      const { background } = circleDotSpanWrapper.element.style;
      if (background) {
        expect(circleDotSpanWrapper.element.style.background).to.equal(`${parsedDotColor}`);
      } else {
        expect(circleDotSpanWrapper.element.style.backgroundColor).to.equal(`${parsedDotColor}`);
      }
    });

    it(`calculates and applies the size of the dot container correctly | #dot = ${circleData.dot}`, () => {
      const circleRadius = circleWrapper.vm.radius;
      const containerSize = circleRadius * 2 + parsedDotSize;
      expect(circleDotWrapper.element.getAttribute("width")).to.equal(`${containerSize}`);
      expect(circleDotWrapper.element.getAttribute("height")).to.equal(`${containerSize}`);
    });
  }
});
