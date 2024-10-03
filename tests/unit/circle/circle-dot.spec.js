import { expect } from "chai";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import Circle from "@/components/Circle/Circle.vue";
import CircleDot from "@/components/Circle/CircleDot.vue";
import { dotParser } from "@/components/optionsParser";
import { factory, parseRawOptions } from "@/../tests/helper";

const localFactory = (props = {}, container = CircleContainer) => factory({ container, props: parseRawOptions(props) });

describe("#dot", () => {
  const progress = 50;
  const thickness = 5;
  const size = 500;
  const globalDot = "5%";

  it("does not renders dot component with 0 size", () => {
    expect(localFactory().findComponent(CircleDot).exists()).to.be.false;
  });

  it(`calculates and applies correct rotation of the dot container depending on progress`, (done) => {
    const wrapper = localFactory({ progress, dot: 5, animation: "default 0 0" });
    const circleDotWrapper = wrapper.findComponent(CircleDot);
    const rotationStart = wrapper.props("options").angle + 90;
    const rotation = rotationStart + (progress * 360) / 100;
    setTimeout(() => {
      expect(circleDotWrapper.element.style.transform).to.equal(`rotate(${rotation}deg)`);
      done();
    }, 0);
  });

  it(`applies correct initial rotation of the dot container`, async () => {
    const wrapper = localFactory({ progress, dot: 5, animation: "default 0 1000" });
    const circleDotWrapper = wrapper.findComponent(CircleDot);
    const angle = wrapper.props("options").angle;
    const rotationStart = angle + 90;
    expect(circleDotWrapper.element.style.transform).to.equal(`rotate(${rotationStart}deg)`);

    await wrapper.setProps({ options: { ...wrapper.props().options, half: true } });
    const halfRotationStart = angle - 90;
    expect(circleDotWrapper.element.style.transform).to.equal(`rotate(${halfRotationStart}deg)`);
  });

  it(`applies custom style to dot`, async () => {
    const wrapper = localFactory(
      {
        progress,
        dot: { size: 10, background: "red", border: "2px solid green" },
        animation: "default 0 1000",
      },
      CircleDot
    ).find("span.ep-circle--progress__dot");
    expect(wrapper.element.style.background).to.equal("red");
    expect(wrapper.element.style.border).to.equal("2px solid green");
  });

  it(`do not apply custom height to dot`, async () => {
    const wrapper = localFactory(
      { progress, dot: { size: 10, height: "20px" }, animation: "default 0 1000" },
      CircleDot
    ).find("span.ep-circle--progress__dot");
    expect(wrapper.element.style.height).to.equal("10px");
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
    const wrapper = localFactory({ ...circleData, size, dot: circleData.dot });
    const circleDotSpanWrapper = wrapper.find("span.ep-circle--progress__dot");
    const circleDotWrapper = wrapper.findComponent(CircleDot);
    const circleWrapper = wrapper.findComponent(Circle);
    const parsedDot = dotParser(circleData.dot !== undefined ? circleData.dot : globalDot, size);
    const parsedDotSize = parsedDot.size;
    const parsedDotColor = parsedDot.backgroundColor || parsedDot.background || parsedDot.color;

    it(`renders dot component | #dot = ${circleData.dot}`, () => {
      expect(wrapper.findComponent(CircleDot).exists()).to.be.true;
    });

    it(`renders dot span element | #dot = ${circleData.dot}`, () => {
      expect(wrapper.find("span.ep-circle--progress__dot").exists()).to.be.true;
    });

    it(`applies the height of the dot correctly | #dot = ${circleData.dot}`, () => {
      expect(circleDotSpanWrapper.element.style.height).to.equal(`${parsedDotSize}px`);
    });

    it(`applies the width of the dot correctly | #dot = ${circleData.dot}`, () => {
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
      expect(circleDotWrapper.element.style.width).to.equal(`${containerSize}px`);
      expect(circleDotWrapper.element.style.height).to.equal(`${containerSize}px`);
    });
  }
});
