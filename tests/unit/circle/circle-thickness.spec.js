import { expect } from "chai";
import Circle from "@/components/Circle/Circle.vue";
import { factory } from "@/../tests/helper";
import { calcThickness } from "@/components/optionsParser";

const localFactory = (props) => factory({ container: Circle, props });

describe("#thickness", () => {
  it("renders the progress circle line stroke thickness correctly", () => {
    const thickness = 4;

    const wrapper = localFactory({ thickness });
    const circleProgressWrapper = wrapper.find("circle.ep-circle--progress");

    expect(circleProgressWrapper.element.getAttribute("stroke-width")).to.equal(`${thickness}`);
  });
  it("renders and calculates the progress circle line stroke relative thickness correctly", () => {
    const size = 200;
    const thickness = calcThickness("5%", size);

    const circleProgressWrapper = localFactory({ thickness }).find("circle.ep-circle--progress");
    expect(circleProgressWrapper.element.getAttribute("stroke-width")).to.equal(`${thickness}`);
  });
});
describe("#emptyTthickness", () => {
  it("renders the empty circle line stroke thickness correctly", () => {
    const emptyThickness = 4;

    const wrapper = localFactory({ emptyThickness });
    const circleEmptyWrapper = wrapper.find("circle.ep-circle--empty");

    expect(circleEmptyWrapper.element.getAttribute("stroke-width")).to.equal(`${emptyThickness}`);
  });
  it("renders the empty circle line stroke relative thickness correctly", () => {
    const size = 200;
    const emptyThickness = calcThickness("5%", size);

    const circleEmptyWrapper = localFactory({ emptyThickness }).find("circle.ep-circle--empty");
    expect(circleEmptyWrapper.element.getAttribute("stroke-width")).to.equal(`${emptyThickness}`);
  });
});
