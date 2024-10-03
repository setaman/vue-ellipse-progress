import { mount } from "@vue/test-utils";
import interfaceProps from "@/components/interface";
import { parseOptions } from "@/components/optionsParser";

const defaultProps = {
  progress: 50,
  index: 0,
  id: 0,
};
for (const prop in interfaceProps) {
  defaultProps[prop] = interfaceProps[prop].default;
}
defaultProps.progress = 50;
defaultProps.index = 0;
defaultProps.id = 0;
defaultProps.globalThickness = defaultProps.thickness;
defaultProps.globalDot = defaultProps.dot;
defaultProps.globalGap = defaultProps.gap;
defaultProps.loader = {};
defaultProps.data = [];

const mockProps = {
  id: 0,
  index: 0,
  multiple: false,
  data: [],
  progress: 50,
  legend: null,
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
  hideLegend: true,
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
    color: "white",
  },
  globalDot: {
    size: 0,
    color: "white",
  },
  reverse: false,
  legendFormatter: null,
  loader: {
    color: "#3f79ff",
    line: "round",
    lineMode: {
      mode: "center",
      offset: 0,
    },
    thickness: 10,
  },
  previousCircles: [],
};
mockProps.loader = mockProps;

export const defaultCounterTick = {
  currentValue: 0,
  countProgress: 0,
  currentFormattedValue: "0",
  currentRawValue: 0,
  duration: 0,
  previousCountStepValue: 0,
  start: 0,
  end: 0,
  difference: 0,
  currentDifference: 0,
  oneStepDifference: 0,
  startTime: 0,
  elapsed: 0,
};

export { mockProps };

export const wait = (ms = 400) => new Promise((resolve) => setTimeout(() => resolve(), ms));

export const setCircleProps = async (wrapper, props = {}) => {
  return wrapper.setProps({ options: { ...wrapper.props("options"), ...props } });
};

export const parseRawOptions = (props) => {
  return parseOptions({ ...defaultProps, ...props });
};

export const factory = ({ container, props = {}, isCircleFactory = true }) => {
  const propsData = isCircleFactory ? { options: { ...mockProps, ...props } } : props;
  return mount(container, {
    props: propsData,
  });
};
