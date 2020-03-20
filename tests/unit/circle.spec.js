import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Container from "../../src/components/VueEllipseProgress.vue";
import Circle from "../../src/components/Circle/CircleProgress.vue";
import HalfCircle from "../../src/components/Circle/HalfCircleProgress.vue";
import Gradient from "../../src/components/Gradient.vue";

const wait = (ms = 400) => new Promise(resolve => setTimeout(() => resolve(), ms));

const factory = propsData => {
  return mount(Container, {
    propsData: {
      ...propsData
    },
    stubs: {
      CountUp: true
    }
  });
};

describe("[ CircleProgress.vue ]", () => {
  describe("#progress", () => {
    it("calculates the progress circle stroke offset correctly", () => {
      const progress = 60;
      const size = 200;
      const thickness = 4;

      const wrapper = factory({
        size,
        progress,
        thickness,
        emptyThickness: thickness,
        animation: {
          type: "default",
          duration: 10,
          delay: 10
        }
      });

      const radius = size / 2 - thickness / 2;
      const circumference = radius * 2 * Math.PI;
      const expectedOffset = circumference - (progress / 100) * circumference;

      const circleWrapper = wrapper.find(Circle);

      expect(circleWrapper.vm.progressOffset).to.equal(expectedOffset);
    });
  });
  describe("#thickness", () => {
    it("renders the progress circle line stroke thickness correctly", () => {
      const progress = 60;
      const thickness = 4;

      const wrapper = factory({
        progress,
        thickness
      });
      const circleWrapper = wrapper.find(Circle);
      const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

      expect(circleProgressWrapper.element.getAttribute("stroke-width")).to.equal(`${thickness}`);
    });
    it("renders and calculates the progress circle line stroke relative thickness correctly", () => {
      const progress = 60;
      const size = 200;
      const thickness = "5%";
      const relativeThickness = (parseInt(thickness, 10) * size) / 100;

      const wrapper = factory({
        progress,
        thickness
      });
      const circleWrapper = wrapper.find(Circle);
      const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

      expect(circleWrapper.vm.thickness).to.equal(relativeThickness);
      expect(circleProgressWrapper.element.getAttribute("stroke-width")).to.equal(`${relativeThickness}`);
    });
  });
  describe("#emptyTthickness", () => {
    it("renders the empty circle line stroke thickness correctly", () => {
      const progress = 60;
      const emptyThickness = 4;

      const wrapper = factory({
        progress,
        emptyThickness
      });
      const circleWrapper = wrapper.find(Circle);
      const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

      expect(circleEmptyWrapper.element.getAttribute("stroke-width")).to.equal(`${emptyThickness}`);
    });
    it("renders and calculates the empty circle line stroke relative thickness correctly", () => {
      const progress = 60;
      const size = 200;
      const emptyThickness = "5%";
      const relativeThickness = (parseInt(emptyThickness, 10) * size) / 100;

      const wrapper = factory({
        progress,
        emptyThickness
      });
      const circleWrapper = wrapper.find(Circle);
      const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

      expect(circleWrapper.vm.emptyThickness).to.equal(relativeThickness);
      expect(circleEmptyWrapper.element.getAttribute("stroke-width")).to.equal(`${relativeThickness}`);
    });
  });
  describe("#size", () => {
    it("calculates and sets the position of the circles correctly", () => {
      const progress = 60;
      const size = 200;
      const position = 200 / 2;

      const wrapper = factory({
        progress,
        size
      });
      const circleWrapper = wrapper.find(Circle);
      const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
      const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

      expect(circleWrapper.vm.position).to.equal(position);

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

      const wrapper = factory({
        size,
        progress,
        thickness,
        emptyThickness: thickness
      });
      const circleWrapper = wrapper.find(Circle);
      expect(circleWrapper.vm.circumference).to.equal(circumference);
    });
  });
  describe("#line", () => {
    it("renders line type correctly", () => {
      const progress = 60;
      let line = "round";

      const wrapper = factory({
        progress,
        line
      });
      const circleWrapper = wrapper.find(Circle);
      const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
      expect(circleProgressWrapper.element.getAttribute("stroke-linecap")).to.equal(`${line}`);

      line = "square";
      wrapper.setProps({ line });
      expect(circleProgressWrapper.element.getAttribute("stroke-linecap")).to.equal(`${line}`);

      line = "butt";
      wrapper.setProps({ line });
      expect(circleProgressWrapper.element.getAttribute("stroke-linecap")).to.equal(`${line}`);
    });
  });
  describe("#lineMode", () => {
    describe("#lineMode.mode", () => {
      const progress = 50;
      const size = 200;
      const baseRadius = 200 / 2;

      describe("#lineMode.mode.normal", () => {
        let thickness = 20;
        let emptyThickness = 10;
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: {
            mode: "normal",
            offset: 0
          },
          size
        });
        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
        const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

        describe("radius of the circles does not exceed the size and aligns properly in relation to each other", () => {
          it("in case #thickness >= #emptyThickness", () => {
            let expectedProgressCircleRadius = baseRadius - thickness / 2;
            let expectedEmptyCircleRadius = expectedProgressCircleRadius;
            let progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
            let emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
            expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
            expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);

            thickness = emptyThickness = 10;

            wrapper.setProps({ thickness, emptyThickness });

            expectedProgressCircleRadius = baseRadius - thickness / 2;
            expectedEmptyCircleRadius = expectedProgressCircleRadius;
            progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
            emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
            expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
            expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
          });
          it("in case #thickness >= #emptyThickness and #lineMode.offset", () => {
            const offset = 10; // must be ignored in this mode
            wrapper.setProps({ lineMode: { mode: "normal", offset } });
            let expectedProgressCircleRadius = baseRadius - thickness / 2;
            let expectedEmptyCircleRadius = expectedProgressCircleRadius;
            let progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
            let emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
            expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
            expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);

            thickness = emptyThickness = 10;

            wrapper.setProps({ thickness, emptyThickness });

            expectedProgressCircleRadius = baseRadius - thickness / 2;
            expectedEmptyCircleRadius = expectedProgressCircleRadius;
            progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
            emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
            expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
            expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
          });
          it("in case #thickness < #emptyThickness", () => {
            thickness = 10;
            emptyThickness = 20;

            wrapper.setProps({ thickness, emptyThickness });

            const expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
            const expectedProgressCircleRadius = expectedEmptyCircleRadius;
            const progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
            const emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
            expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
            expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
          });
          it("in case #thickness < #emptyThickness and #lineMode.offset", () => {
            const offset = 10; // must be ignored in this mode
            wrapper.setProps({ lineMode: { mode: "normal", offset } });
            thickness = 10;
            emptyThickness = 20;

            wrapper.setProps({ thickness, emptyThickness, lineMode: { mode: "normal", offset } });

            const expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
            const expectedProgressCircleRadius = expectedEmptyCircleRadius;
            const progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
            const emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
            expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
            expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
          });
        });
      });
      describe("#lineMode.mode.in", () => {
        const offset = 10;
        const thickness = 20;
        const emptyThickness = 10;
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: {
            mode: "in",
            offset
          },
          size
        });

        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
        const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

        it("circles does not exceed the size and aligns properly in relation to each other", () => {
          const expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
          const expectedProgressCircleRadius = expectedEmptyCircleRadius - emptyThickness / 2 - thickness / 2 - offset;
          const progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
          const emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
          expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
          expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
        });
      });
      describe("#lineMode.mode.in-over", () => {
        const offset = 10; // must be ignored in this mode
        const thickness = 20;
        const emptyThickness = 10;
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: {
            mode: "in-over",
            offset
          },
          size
        });

        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
        const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

        it("circles does not exceed the size and aligns properly in relation to each other", () => {
          const expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
          const expectedProgressCircleRadius = baseRadius - thickness / 2;
          const progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
          const emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
          expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
          expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
        });
      });
      describe("#lineMode.mode.out", () => {
        const offset = 10;
        const thickness = 10;
        const emptyThickness = 10;
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: {
            mode: "out",
            offset
          },
          size
        });

        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
        const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

        it("circles does not exceed the size and aligns properly in relation to each other", () => {
          const expectedProgressCircleRadius = baseRadius - emptyThickness / 2;
          const expectedEmptyCircleRadius = expectedProgressCircleRadius - emptyThickness / 2 - thickness / 2 - offset;
          const progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
          const emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
          expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
          expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
        });
      });
      describe("#lineMode.mode.out-over", () => {
        const offset = 10; // must be ignored in this mode
        let thickness = 20;
        let emptyThickness = 10;
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: {
            mode: "out-over",
            offset
          },
          size
        });

        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
        const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

        describe("radius of the circles does not exceed the size and aligns properly in relation to each other", () => {
          it("in case #thickness >= #emptyThickness", () => {
            let expectedProgressCircleRadius = baseRadius - thickness / 2;
            let expectedEmptyCircleRadius = expectedProgressCircleRadius - thickness / 2 + emptyThickness / 2;
            let progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
            let emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
            expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
            expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);

            thickness = emptyThickness = 10;

            wrapper.setProps({ thickness, emptyThickness });

            expectedProgressCircleRadius = baseRadius - thickness / 2;
            expectedEmptyCircleRadius = expectedProgressCircleRadius;
            progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
            emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
            expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
            expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
          });
          it("in case #thickness < #emptyThickness", () => {
            thickness = 10;
            emptyThickness = 20;

            wrapper.setProps({ thickness, emptyThickness });

            const expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
            const expectedProgressCircleRadius = expectedEmptyCircleRadius - emptyThickness / 2 + thickness / 2;
            const progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
            const emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
            expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
            expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
          });
        });
      });
      describe("#lineMode.mode.top", () => {
        const offset = 10; // must be ignored in this mode
        const thickness = 20;
        const emptyThickness = 20;
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: {
            mode: "top",
            offset
          },
          size
        });

        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
        const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

        it("circles does not exceed the size and aligns properly in relation to each other", () => {
          const expectedProgressCircleRadius = baseRadius - thickness / 2;
          const expectedEmptyCircleRadius = expectedProgressCircleRadius - emptyThickness / 2;
          const progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
          const emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
          expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
          expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
        });
      });
      describe("#lineMode.mode.bottom", () => {
        const offset = 10; // must be ignored in this mode
        let thickness = 40;
        let emptyThickness = 10;
        const wrapper = factory({
          progress,
          thickness,
          emptyThickness,
          lineMode: {
            mode: "bottom",
            offset
          },
          size
        });

        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
        const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

        describe("radius of the circles does not exceed the size and aligns properly in relation to each other", () => {
          it("in case #thickness * 2 > #emptyThickness", () => {
            const expectedProgressCircleRadius = baseRadius - thickness / 2;
            const expectedEmptyCircleRadius = expectedProgressCircleRadius + emptyThickness / 2;
            const progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
            const emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
            expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
            expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
          });
          it("in case #thickness * 2 <= #emptyThickness", () => {
            thickness = 10;
            emptyThickness = 20;

            wrapper.setProps({ thickness, emptyThickness });

            let expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
            let expectedProgressCircleRadius = expectedEmptyCircleRadius - emptyThickness / 2;
            let progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
            let emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
            expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
            expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);

            thickness = emptyThickness = 20;

            wrapper.setProps({ thickness, emptyThickness });

            expectedEmptyCircleRadius = baseRadius - emptyThickness / 2;
            expectedProgressCircleRadius = expectedEmptyCircleRadius - emptyThickness / 2;
            progressCircleRadius = circleProgressWrapper.element.getAttribute("r");
            emptyCircleRadius = circleEmptyWrapper.element.getAttribute("r");
            expect(progressCircleRadius).to.equal(`${expectedProgressCircleRadius}`);
            expect(emptyCircleRadius).to.equal(`${expectedEmptyCircleRadius}`);
          });
        });
      });
    });
  });
  describe("#color", () => {
    const color = "#3f79ff";
    const wrapper = factory({
      progress: 50,
      color
    });

    const circleWrapper = wrapper.find(Circle);
    const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

    it("applies color correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("stroke")).to.equal(`${color}`);
    });
    it("applies gradient color correctly", () => {
      const gradientColor = {
        gradient: {
          radial: false,
          colors: [
            {
              color: "red",
              offset: 0,
              opacity: 1
            },
            {
              color: "blue",
              offset: 0,
              opacity: 1
            }
          ]
        }
      };
      wrapper.setProps({
        color: gradientColor
      });
      const gradientWrapper = wrapper.find(Gradient);
      expect(wrapper.contains(Gradient)).to.be.true;
      expect(gradientWrapper.contains("linearGradient")).to.be.true;
      const linearGradientWrapper = gradientWrapper.find("linearGradient");
      expect(linearGradientWrapper.findAll("stop").length).to.equal(gradientColor.gradient.colors.length);
    });
  });
  describe("#colorFill", () => {
    const colorFill = "#3f79ff";
    const wrapper = factory({
      progress: 50,
      colorFill
    });

    const circleWrapper = wrapper.find(Circle);
    const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

    it("applies color correctly", () => {
      expect(circleProgressWrapper.element.getAttribute("fill")).to.equal(`${colorFill}`);
    });
    it("applies gradient fill color correctly", () => {
      const gradientColorFill = {
        gradient: {
          radial: true,
          colors: [
            {
              color: "red",
              offset: 0,
              opacity: 1
            },
            {
              color: "blue",
              offset: 0,
              opacity: 1
            }
          ]
        }
      };
      wrapper.setProps({
        colorFill: gradientColorFill
      });
      const gradientWrapper = wrapper.find(Gradient);
      expect(wrapper.contains(Gradient)).to.be.true;
      expect(gradientWrapper.contains("radialGradient")).to.be.true;
      const radialGradientWrapper = gradientWrapper.find("radialGradient");
      expect(radialGradientWrapper.findAll("stop").length).to.equal(gradientColorFill.gradient.colors.length);
    });
  });
  describe("#emptyColor", () => {
    const emptyColor = "#3f79ff";
    const wrapper = factory({
      progress: 50,
      emptyColor
    });

    const circleWrapper = wrapper.find(Circle);
    const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

    it("applies empty color correctly", () => {
      expect(circleEmptyWrapper.element.getAttribute("stroke")).to.equal(`${emptyColor}`);
    });
    it("applies empty gradient color correctly", () => {
      const emptyGradientColor = {
        gradient: {
          radial: false,
          colors: [
            {
              color: "red",
              offset: 0,
              opacity: 1
            },
            {
              color: "blue",
              offset: 0,
              opacity: 1
            }
          ]
        }
      };
      wrapper.setProps({
        emptyColor: emptyGradientColor
      });
      const gradientWrapper = wrapper.find(Gradient);
      expect(wrapper.contains(Gradient)).to.be.true;
      expect(gradientWrapper.contains("linearGradient")).to.be.true;
      const linearGradientWrapper = gradientWrapper.find("linearGradient");
      expect(linearGradientWrapper.findAll("stop").length).to.equal(emptyGradientColor.gradient.colors.length);
    });
  });
  describe("#emptyColorFill", () => {
    const emptyColorFill = "#3f79ff";
    const wrapper = factory({
      progress: 50,
      emptyColorFill
    });

    const circleWrapper = wrapper.find(Circle);
    const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

    it("applies empty color correctly", () => {
      expect(circleEmptyWrapper.element.getAttribute("fill")).to.equal(`${emptyColorFill}`);
    });
    it("applies empty gradient fill color correctly", () => {
      const emptyGradientColorFill = {
        gradient: {
          radial: true,
          colors: [
            {
              color: "red",
              offset: 0,
              opacity: 1
            },
            {
              color: "blue",
              offset: 0,
              opacity: 1
            }
          ]
        }
      };
      wrapper.setProps({
        emptyColorFill: emptyGradientColorFill
      });
      const gradientWrapper = wrapper.find(Gradient);
      expect(wrapper.contains(Gradient)).to.be.true;
      expect(gradientWrapper.contains("radialGradient")).to.be.true;
      const radialGradientWrapper = gradientWrapper.find("radialGradient");
      expect(radialGradientWrapper.findAll("stop").length).to.equal(emptyGradientColorFill.gradient.colors.length);
    });
  });
  describe("#animation", () => {
    describe("#animation.type", () => {
      const wrapper = factory({
        progress: 50
      });
      const circleWrapper = wrapper.find(Circle);
      const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
      it("applies @default animation class by default", () => {
        expect(circleProgressWrapper.classes()).to.include("animation__default");
      });
      it("applies @rs animation class correctly", () => {
        wrapper.setProps({
          animation: {
            type: "rs",
            duration: 100,
            delay: 100
          }
        });
        expect(circleProgressWrapper.classes()).to.include("animation__rs");
      });
      it("applies @loop animation class correctly", () => {
        wrapper.setProps({
          animation: {
            type: "loop",
            duration: 100,
            delay: 100
          }
        });
        expect(circleProgressWrapper.classes()).to.include("animation__loop");
      });
      it("applies @bounce animation class correctly", () => {
        wrapper.setProps({
          animation: {
            type: "bounce",
            duration: 100,
            delay: 100
          }
        });
        expect(circleProgressWrapper.classes()).to.include("animation__bounce");
      });
      it("applies @reverse animation class correctly", () => {
        wrapper.setProps({
          animation: {
            type: "reverse",
            duration: 100,
            delay: 100
          }
        });
        expect(circleProgressWrapper.classes()).to.include("animation__reverse");
      });
    });
    describe("#animation.duration", () => {
      const wrapper = factory({
        progress: 50
      });
      const circleWrapper = wrapper.find(Circle);
      const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
      it("applies default @1000 duration value as transition", () => {
        expect(circleProgressWrapper.element.style.transition).to.equal("1000ms");
      });
      it("applies provided duration value as transition", () => {
        wrapper.setProps({
          animation: {
            type: "rs",
            duration: 500,
            delay: 100
          }
        });
        expect(circleProgressWrapper.element.style.transition).to.equal("500ms");
      });
      it("applies @0 duration value as transition", () => {
        wrapper.setProps({
          animation: {
            type: "rs",
            duration: 0,
            delay: 100
          }
        });
        expect(circleProgressWrapper.element.style.transition).to.equal("0ms");
      });
    });
    describe("#animation.delay", () => {
      it("applies default @400 delay value as animation-delay", () => {
        const wrapper = factory({
          progress: 50
        });
        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
        expect(circleProgressWrapper.element.style.animationDelay).to.equal("400ms");
      });
      it("applies provided delay value as animation-delay", () => {
        const wrapper = factory({
          progress: 50,
          animation: {
            type: "rs",
            duration: 1000,
            delay: 1000
          }
        });
        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
        expect(circleProgressWrapper.element.style.animationDelay).to.equal("1000ms");
      });
      it("applies @0 delay value as animation-delay", () => {
        const wrapper = factory({
          progress: 50,
          animation: {
            type: "rs",
            duration: 1000,
            delay: 0
          }
        });
        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
        expect(circleProgressWrapper.element.style.animationDelay).to.equal("0ms");
      });
      it("resets animation-delay value to 0 after animation played", async () => {
        const wrapper = factory({
          progress: 50,
          animation: {
            type: "rs",
            duration: 200,
            delay: 100
          }
        });
        const circleWrapper = wrapper.find(Circle);
        const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");
        await wait(300);
        expect(circleProgressWrapper.element.style.animationDelay).to.equal("0ms");
      });
    });
  });
  describe("#half", () => {
    const progress = 60;
    const size = 200;
    const thickness = 10;

    const wrapper = factory({
      progress,
      thickness,
      size,
      half: true,
      animation: {
        type: "none",
        duration: 0,
        delay: 0
      }
    });

    const radius = size / 2 - thickness / 2;
    const position = size / 2 - radius;
    const expectedPath = ` M ${position}, ${size / 2} a ${radius},${radius} 0 1,1 ${radius * 2},0`;

    const circleWrapper = wrapper.find(HalfCircle);
    const circleProgressWrapper = circleWrapper.find(".ep-circle--progress");
    const circleEmptyWrapper = circleWrapper.find(".ep-circle--empty");

    it("calculates and sets the position of the half circles correctly", () => {
      expect(circleWrapper.vm.position).to.equal(position);
      expect(circleWrapper.vm.path).to.equal(expectedPath);

      expect(circleProgressWrapper.element.getAttribute("d")).to.equal(`${expectedPath}`);
      expect(circleEmptyWrapper.element.getAttribute("d")).to.equal(`${expectedPath}`);
    });
    it("calculates the progress circle stroke offset correctly", async () => {
      const circumference = (radius * 2 * Math.PI) / 2;
      const expectedOffset = circumference - (progress / 100) * circumference;
      expect(circleWrapper.vm.progressOffset).to.equal(expectedOffset);
      expect(circleProgressWrapper.element.style.strokeDashoffset).to.equal(`${expectedOffset}`);
    });
  });
  describe("#dash", () => {
    const dash = "10 10";

    const wrapper = factory({
      progress: 50,
      dash
    });

    const circleWrapper = wrapper.find(Circle);
    const circleEmptyWrapper = circleWrapper.find("circle.ep-circle--empty");

    it("applies the #dash value as string correctly", () => {
      expect(circleEmptyWrapper.element.getAttribute("stroke-dasharray")).to.equal(`${dash}`);
    });
  });
});
