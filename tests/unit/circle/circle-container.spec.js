import { expect } from "chai";
import { mount } from "@vue/test-utils";
import CircleContainer from "@/components/Circle/CircleContainer.vue";

const factory = (propsData) => {
  return mount(CircleContainer, {
    propsData: {
      index: 0,
      id: 123,
      multiple: false,
      progress: 50,
      ...propsData,
    },
  });
};

describe("[ CircleContainer.vue ]", () => {
  describe("#reverse", () => {
    const circleWrapper = factory({ reverse: true });
    it("it applies .ep-revers class to circle container ", () => {
      expect(circleWrapper.classes("ep-reverse")).to.be.true;
    });
  });
});
