import { expect } from "chai";
import CircleContainer from "@/components/Circle/CircleContainer.vue";
import { factory, parseRawOptions } from "@/../tests/helper";

const localFactory = (props) => factory({ container: CircleContainer, props: parseRawOptions(props) });

describe("[ CircleContainer.vue ]", () => {
  describe("#reverse", () => {
    const circleWrapper = localFactory({ reverse: true });
    it("it applies .ep-revers class to circle container ", () => {
      expect(circleWrapper.classes("ep-reverse")).to.be.true;
    });
  });
});
