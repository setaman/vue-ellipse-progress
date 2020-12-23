import { expect } from "chai";
import Circle from "@/components/Circle/Circle.vue";
import HalfCircle from "@/components/Circle/HalfCircle.vue";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import CircleDot from "@/components/Circle/CircleDot.vue";
import { factory, setCircleProps, wait } from "@/../tests/helper";
import { animationParser } from "@/components/optionsParser";

const localFactory = (props = {}, container = Circle) => {
  return factory({ container, props });
};

const animationTypeTests = (container, circleClass, prefix = "circle |") => {
  const wrapper = localFactory({}, container);
  const circleProgressWrapper = wrapper.find(circleClass);
  it(`${prefix} does not apply any animation type before delay`, () => {
    expect(circleProgressWrapper.classes())
      .to.be.an("array")
      .that.not.include([
        "animation__default",
        "animation__bounce",
        "animation__rs",
        "animation__reverse",
        "animation__loop",
      ]);
  });
  it(`${prefix} applies @default animation class by default`, async () => {
    // need to wait, otherwise tests fail, whyyyy???
    await wait(500);
    expect(circleProgressWrapper.classes()).to.be.an("array").that.includes("animation__default");
  });
  it(`${prefix} applies @bounce animation class correctly`, async () => {
    await setCircleProps(wrapper, { animation: animationParser("bounce 500 500") });
    expect(circleProgressWrapper.classes()).to.be.an("array").that.includes("animation__bounce");
  });
  it(`${prefix} applies @loop animation class correctly`, async () => {
    await setCircleProps(wrapper, { animation: animationParser("loop 500 500") });
    expect(circleProgressWrapper.classes()).to.be.an("array").that.includes("animation__loop");
  });
  it(`${prefix} applies @reverse animation class correctly`, async () => {
    await setCircleProps(wrapper, { animation: animationParser("reverse 500 500") });
    expect(circleProgressWrapper.classes()).to.be.an("array").that.includes("animation__reverse");
  });
  it(`${prefix} applies @rs animation class correctly`, async () => {
    await setCircleProps(wrapper, { animation: animationParser("rs 500 500") });
    expect(circleProgressWrapper.classes()).to.be.an("array").that.includes("animation__rs");
  });
};
const animationDurationTests = (container, circleClass, prefix = "circle | ") => {
  it(`${prefix} applies default @1000 duration value as transition and animation duration`, () => {
    const circleProgressWrapper = localFactory({}, container).find(circleClass);

    expect(circleProgressWrapper.element.style.transition).to.include("1000ms");
    expect(circleProgressWrapper.element.style.animationDuration).to.equal("1000ms");
  });
  it(`${prefix} applies provided duration value as transition and animation duration`, () => {
    const circleProgressWrapper = localFactory({ animation: animationParser("rs 500") }, container).find(circleClass);

    expect(circleProgressWrapper.element.style.transition).to.include("500ms");
    expect(circleProgressWrapper.element.style.animationDuration).to.equal("500ms");
  });
  it(`${prefix} applies @0 duration value as transition and animation duration`, () => {
    const circleProgressWrapper = localFactory({ animation: animationParser("rs 0") }, container).find(circleClass);

    expect(circleProgressWrapper.element.style.transition).to.include("0ms");
    expect(circleProgressWrapper.element.style.animationDuration).to.equal("0ms");
  });
};
const animationDelayTests = (container, circleClass, prefix = "circle | ") => {
  it(`${prefix} applies default @400 delay value as initial animation delay`, () => {
    expect(localFactory({}, container).vm.animation.delay).to.equal(400);
  });
  it(`${prefix} applies @0 delay value as animation-delay`, () => {
    expect(localFactory({ animation: animationParser("rs 0 0") }, container).vm.animation.delay).to.equal(0);
  });

  const progress = 60;
  const size = 200;
  const thickness = 4;

  const isHalfCircle = prefix.includes("half");

  const radius = size / 2 - thickness / 2;
  let circumference = radius * 2 * Math.PI;
  circumference = isHalfCircle ? circumference / 2 : circumference;
  const expectedOffset = circumference - (progress / 100) * circumference;

  it(`${prefix} don not applies progress before delay`, () => {
    const wrapper = localFactory(
      { progress, size, thickness, emptyThickness: thickness, animation: animationParser("rs 500 100") },
      container
    );
    const circleProgressWrapper = wrapper.find(circleClass);
    expect(wrapper.vm.strokeDashOffset).to.equal(circumference);
    expect(circleProgressWrapper.element.style.strokeDashoffset).to.equal(`${circumference}`);
  });
  it(`${prefix} applies the progress after delay`, (done) => {
    const wrapper = localFactory(
      { progress, size, thickness, emptyThickness: thickness, animation: animationParser("rs 500 100") },
      container
    );
    const circleProgressWrapper = wrapper.find(circleClass);
    setTimeout(() => {
      expect(wrapper.vm.strokeDashOffset).to.equal(expectedOffset);
      expect(circleProgressWrapper.element.style.strokeDashoffset).to.equal(`${expectedOffset}`);
      done();
    }, 150);
  });
};

describe("#animation", () => {
  const circleContainerWrapper = localFactory(
    { progress: 50, dot: 5, animation: animationParser("rs 500 5") },
    CircleContainer
  );
  const circleDotWrapper = circleContainerWrapper.findComponent(CircleDot);

  describe("#animation.type", () => {
    animationTypeTests(Circle, "circle.ep-circle--progress");
    animationTypeTests(HalfCircle, "path.ep-half-circle--progress", "half circle |");

    it("circle dot | applies animation class correctly", (done) => {
      setTimeout(() => {
        expect(circleDotWrapper.classes()).to.be.an("array").that.includes("animation__rs");
        done();
      }, 5);
    });
    /* it("circle dot | disables initial animation for @bounce/@loop types", (done) => {
      const wrapper = factory({ progress: 50, dot: 5, animation: "bounce 500 0" }, CircleContainer);
      const cDWrapper = wrapper.find(CircleDot);
      setTimeout(() => {
        expect(cDWrapper.classes()).to.be.an("array").that.include("animation__bounce");
        const { animationName } = getComputedStyle(cDWrapper.element);
        expect(animationName).to.equal("ep-dot--init__disabled");
        done();
      }, 10);
    }); */
  });

  describe("#animation.duration", () => {
    animationDurationTests(Circle, "circle.ep-circle--progress");
    animationDurationTests(HalfCircle, "path.ep-half-circle--progress", "half circle |");

    it(`circle dot | applies duration value as transition and animation duration`, () => {
      expect(circleDotWrapper.element.style.transitionDuration).to.equal("500ms");
      expect(circleDotWrapper.element.style.animationDuration).to.equal("500ms");
    });
  });
  describe("#animation.delay", () => {
    animationDelayTests(Circle, "circle.ep-circle--progress");
    animationDelayTests(HalfCircle, "path.ep-half-circle--progress", "half circle |");

    const progress = 50;
    const wrapper = localFactory({ dot: 5, animation: animationParser("rs 500 50") }, CircleContainer);
    const cdWrapper = wrapper.findComponent(CircleDot);
    const startRotation = wrapper.props("options").angle + 90;

    it(`circle dot | do not applies any animation type before delay`, () => {
      expect(cdWrapper.classes())
        .to.be.an("array")
        .that.not.include([
          "animation__default",
          "animation__bounce",
          "animation__rs",
          "animation__reverse",
          "animation__loop",
        ]);
    });
    /* it(`circle dot | do not applies rotation before delay`, () => {
      expect(cdWrapper.element.style.transform).to.equal(`rotate(${startRotation}deg)`);
    }); */
    it(`circle dot | applies rotation after delay`, (done) => {
      const endRotation = startRotation + (progress * 360) / 100;
      setTimeout(() => {
        expect(cdWrapper.element.style.transform).to.equal(`rotate(${endRotation}deg)`);
        done();
      }, 50);
    });
  });
});
