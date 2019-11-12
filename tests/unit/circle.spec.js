import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import Container from "../../src/components/EllipseProgressContainer.vue";
import Circle from "../../src/components/CircleProgress.vue";

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
      // const circleProgressWrapper = circleWrapper.find("circle.ep-circle--progress");

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
});
