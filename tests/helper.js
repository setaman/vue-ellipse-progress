import { mount } from "@vue/test-utils";

const mockProps = {
  id: 0,
  index: 0,
  multiple: false,
  data: [],
  progress: 50,
  legendValue: null,
  size: 200,
  thickness: 10,
  globalThickness: 10,
  emptyThickness: 10,
  line: "round",
  lineMode: {
    mode: "normal",
    offset: 0,
  },
  linePosition: {
    position: "center",
    offset: 0,
  },
  emptyLinePosition: {
    position: "center",
    offset: 0,
  },
  color: "#3f79ff",
  emptyColor: "#e6e9f0",
  colorFill: "transparent",
  emptyColorFill: "transparent",
  fontSize: null,
  fontColor: null,
  animation: {
    type: "default",
    duration: 1000,
    delay: 400,
  },
  legend: true,
  legendClass: "",
  angle: -90,
  loading: false,
  noData: false,
  dash: "",
  half: false,
  gap: 0,
  globalGap: 0,
  determinate: false,
  dot: {
    size: 0,
  },
  globalDot: {
    size: 0,
  },
  reverse: false,
  legendFormatter: null,
  loader: {},
  previousCircles: [],
};
mockProps.loaderOptions = mockProps;

export { mockProps };

export const wait = (ms = 400) => new Promise((resolve) => setTimeout(() => resolve(), ms));

export const setCircleProps = async (wrapper, props = {}) => {
  return wrapper.setProps({ options: { ...wrapper.props("options"), ...props } });
};
export const factory = ({ container, props = {}, isCircleFactory = true }) => {
  const propsData = isCircleFactory ? { options: { ...mockProps, ...props } } : props;
  return mount(container, {
    propsData,
  });
};
