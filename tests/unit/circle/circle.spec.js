import { expect } from "chai";
import Circle from "@/components/Circle/Circle.vue";
import HalfCircle from "@/components/Circle/HalfCircle.vue";
import VueEllipseProgress from "@/components/VueEllipseProgress.vue";
import { dotParser, calcThickness, animationParser } from "@/components/optionsParser";
import { factory, setCircleProps } from "@/../tests/helper";

const localFactory = (props, container = Circle) => factory({ container, props });

const randomNumberInRange = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1)) + min;

describe("[ CircleProgress.vue | HalfCircleProgress.vue ]", () => {
  describe("#progress", () => {
    let progress = 60;
    const size = 200;
    const thickness = 4;

    const wrapper = localFactory({
      size,
      progress,
      thickness,
      emptyThickness: thickness,
      animation: animationParser("default 0 0"),
    });
    it("calculates the progress circle stroke offset correctly", () => {
      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;
      const expectedOffset = circumference - (progress / 100) * circumference;

      expect(wrapper.vm.progressOffset).to.equal(expectedOffset);
    });
    it("calculates the negative progress circle stroke offset correctly", async () => {
      progress = -50;
      await setCircleProps(wrapper, { progress });
      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;
      const expectedOffset = circumference - (progress / 100) * circumference;

      expect(wrapper.vm.progressOffset).to.equal(expectedOffset);
    });
    it("applies the progress offset to circle SVG stroke", () => {
      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;
      const expectedOffset = circumference - (progress / 100) * circumference;
      const circleWrapper = wrapper.find(".ep-circle--progress");

      expect(circleWrapper.element.style.strokeDashoffset).to.equal(`${expectedOffset}`);
    });
    it("lets progress circle visible for -1 < progress < 1", async () => {
      progress = 0;
      await setCircleProps(wrapper, { progress, half: true });
      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;

      expect(circumference - wrapper.vm.progressOffset).to.be.above(0);
    });
  });
  describe("#size", () => {
    it("calculates and sets the position of the circles correctly", () => {
      const progress = 60;
      const size = 200;
      const position = 200 / 2;

      const wrapper = localFactory({
        progress,
        size,
      });

      const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");
      const circleEmptyWrapper = wrapper.find("circle.ep-circle--empty");

      expect(wrapper.vm.position).to.equal(position);

      expect(circleProgressWrapper.element.getAttribute("cx")).to.equal(`${position}`);
      expect(circleProgressWrapper.element.getAttribute("cy")).to.equal(`${position}`);

      expect(circleEmptyWrapper.element.getAttribute("cx")).to.equal(`${position}`);
      expect(circleEmptyWrapper.element.getAttribute("cy")).to.equal(`${position}`);
    });
    it("calculates the circumference of the progress circles correctly", () => {
      const progress = 60;
      const size = 200;
      const thickness = 4;
      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;

      const wrapper = localFactory({
        size,
        progress,
        thickness,
        emptyThickness: thickness,
      });

      expect(wrapper.vm.circumference).to.equal(circumference);
    });
  });
  describe("#half", () => {
    const progress = 50;
    const size = 200;
    const thickness = 10;

    const wrapper = localFactory(
      {
        progress,
        thickness,
        size,
        half: true,
        animation: animationParser("default 0 0"),
      },
      HalfCircle
    );

    const radius = size / 2 - thickness / 2;
    const position = size / 2 - radius;
    const expectedPath = ` M ${position}, ${size / 2} a ${radius},${radius} 0 1,1 ${radius * 2},0`;

    const circleProgressWrapper = wrapper.find(".ep-half-circle--progress.ep-circle--progress");
    const circleEmptyWrapper = wrapper.find(".ep-half-circle--empty");

    it("renders half progress circle SVG path", () => {
      expect(wrapper.find("path.ep-half-circle--progress.ep-circle--progress").exists()).to.be.true;
    });
    it("renders half empty circle SVG path", () => {
      expect(wrapper.find("path.ep-half-circle--empty").exists()).to.be.true;
    });

    it("calculates and sets the position of the half circles correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("d")).to.equal(`${expectedPath}`);
      expect(circleEmptyWrapper.element.getAttribute("d")).to.equal(`${expectedPath}`);
    });
    it("calculates the progress circle stroke offset correctly", async () => {
      const circumference = (radius * 2 * Math.PI) / 2;
      const expectedOffset = circumference - (progress / 100) * circumference;
      expect(circleProgressWrapper.element.style.strokeDashoffset).to.equal(`${expectedOffset}`);
    });
  });
  describe("#dash", () => {
    it("applies the #dash value as string correctly", () => {
      const dash = "10 10";
      const wrapper = localFactory({
        progress: 50,
        dash,
      });

      const circleEmptyWrapper = wrapper.find("circle.ep-circle--empty");
      expect(circleEmptyWrapper.element.getAttribute("stroke-dasharray")).to.equal(`${dash}`);
    });
  });
  describe("#noData", () => {
    const progress = 60;
    const size = 200;
    const thickness = 10;

    const wrapper = localFactory({ noData: true, progress, size });
    const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");
    const circleEmptyWrapper = wrapper.find("circle.ep-circle--empty");

    it("sets the stroke dash offset to circumference value", () => {
      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;

      expect(circleProgressWrapper.element.style.strokeDashoffset).to.equal(`${circumference}`);
    });
    it("adds .ep-circle--nodata class to empty circle", () => {
      expect(circleEmptyWrapper.classes()).to.include("ep-circle--nodata");
    });
    it("resets the progress circle animation class", () => {
      expect(circleProgressWrapper.classes()).to.not.include("animation__default");
    });
    it("applies 0 opacity to progress circle", () => {
      expect(circleProgressWrapper.element.style.opacity).to.equal("0");
    });
  });
  /* describe("#loading", () => {
    const size = 200;
    const thickness = 10;

    const wrapper = localFactory({ loading: true });

    const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

    it("sets the stroke dash offset to circumference value", () => {
      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;

      expect(circleProgressWrapper.element.style.strokeDashoffset).to.equal(`${circumference}`);
    });
    it("applies 0 opacity to progress circle", () => {
      expect(circleProgressWrapper.element.style.opacity).to.equal("0");
    });
    it("applies 1 opacity to loading circle container", () => {
      const determinateCircleWrapper = wrapper.find(".ep-circle--loading__container");
      expect(determinateCircleWrapper.element.style.opacity).to.equal("1");
    });
    it("renders the loading circle", () => {
      expect(wrapper.find(".ep-circle--loading").exists()).to.be.true;
    });
  }); */
  /* describe("#determinate", () => {
    const progress = 60;
    const color = "gray";
    const thickness = 15;
    const wrapper = localFactory({
      progress,
      color,
      thickness,
      determinate: true,
    });

    it("shows the loading circle", () => {
      expect(wrapper.find(".animation__loading").exists()).to.be.true;
    });
    it("applies same styles to loading circle as to progress circle", () => {
      const determinateCircleWrapper = wrapper.find(".animation__loading");
      expect(determinateCircleWrapper.element.getAttribute("stroke")).to.equal(`${color}`);
      expect(determinateCircleWrapper.element.getAttribute("stroke-width")).to.equal(`${thickness}`);
      expect(determinateCircleWrapper.element.getAttribute("fill")).to.equal("transparent");
    });
    it("applies 0.45 opacity to loading circle container", () => {
      const determinateCircleWrapper = wrapper.find(".ep-circle--loading__container");
      expect(determinateCircleWrapper.element.style.opacity).to.equal("0.45");
    });
  }); */
  describe("#angle", () => {
    const circleWrapper = localFactory({ progress: 50 });
    it("sets the rotation of the svg container to default, if not defined", () => {
      expect(circleWrapper.element.style.transform).to.equal("rotate(-90deg)");
    });
    it("sets the rotation of the svg container correctly", async () => {
      const angle = 80;
      await circleWrapper.setProps({ options: { ...circleWrapper.props().options, angle } });
      expect(circleWrapper.element.style.transform).to.equal(`rotate(${angle}deg)`);
    });
    it("sets @0 value as the rotation of the svg container correctly", async () => {
      const angle = 0;
      await circleWrapper.setProps({ options: { ...circleWrapper.props().options, angle } });
      expect(circleWrapper.element.style.transform).to.equal(`rotate(${angle}deg)`);
    });
  });
  describe("#data", () => {
    const size = 600;
    const globalThickness = 5;
    const globalGap = 5;
    const globalDot = dotParser("2%", size);

    const data = [];
    // generate random test data
    for (let n = 0; n < 6; n++) {
      data.push({
        progress: 25,
        gap: randomNumberInRange(),
        thickness: randomNumberInRange(),
      });
    }
    // some special cases
    data.push({ progress: 50, thickness: 5 });
    data.push({ progress: 50, thickness: "2%", dot: 0 });
    data.push({ progress: 50, thickness: "4%", gap: 3 });
    data.push({ progress: 50, thickness: "4%", gap: 3, dot: 5 });
    data.push({ progress: 50, thickness: "0%", gap: 3, dot: "5% red" });
    data.push({ progress: 50, thickness: 6, gap: 5, dot: "5 red" });
    data.push({ progress: 50, gap: 5 });
    data.push({ progress: 50, gap: 0 });
    data.push({ progress: 50 });

    const wrapper = factory({
      container: VueEllipseProgress,
      props: {
        data,
        gap: globalGap,
        thickness: globalThickness,
        size,
        dot: globalDot,
      },
      isCircleFactory: false,
    });
    const circleWrappers = wrapper.findAllComponents(Circle);

    // const calculateThickness = (t) => (t.toString().includes("%") ? (parseFloat(t) * size) / 100 : t);

    for (let i = 0; i < data.length; i++) {
      const circleData = data[i];
      it(`calculates the radius of circle #${i} correctly
        #thickness ${circleData.thickness} | #gap ${circleData.gap} | #dot ${circleData.dot} `, () => {
        const circleGap = circleData.gap !== undefined ? circleData.gap : globalGap;
        const circleThickness = calcThickness(
          circleData.thickness !== undefined ? circleData.thickness : globalThickness,
          size
        );
        const circleDot = dotParser(circleData.dot !== undefined ? circleData.dot : globalDot, size).size;

        let radius;
        const baseRadius = size / 2 - Math.max(circleThickness, circleDot) / 2;
        if (i > 0) {
          const previousCirclesData = data.filter((props, index) => index < i);
          const previousCirclesThickness = previousCirclesData
            .map(({ gap, thickness, dot }, n) => {
              const g = gap !== undefined ? gap : globalGap;
              const t = calcThickness(thickness !== undefined ? thickness : globalThickness, size);
              const d = dotParser(dot !== undefined ? dot : globalDot, size).size;
              const thicknessWithDot = Math.max(t, d);
              return n > 0 ? g + thicknessWithDot : thicknessWithDot;
            })
            .reduce((acc, current) => acc + current);

          radius = baseRadius - (previousCirclesThickness + circleGap);
        } else {
          radius = baseRadius;
        }
        const circleProgressWrapper = circleWrappers[i].find("circle.ep-circle--progress");
        const circleEmptyWrapper = circleWrappers[i].find("circle.ep-circle--empty");
        expect(circleProgressWrapper.element.getAttribute("r")).to.equal(`${radius}`);
        expect(circleEmptyWrapper.element.getAttribute("r")).to.equal(`${radius}`);
      });
    }
  });
});
