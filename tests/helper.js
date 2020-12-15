import { mount } from "@vue/test-utils";

export const circleMockProps = {
  data: [],
  progress: 50,
  legendValue: null,
  size: 200,
  thickness: "5%",
  emptyThickness: "5%",
  line: "ropund",
  lineMode: "normal",
  linePosition: "center",
  emptyLinePosition: "center",
  color: "#3f79ff",
  emptyColor: "#e6e9f0",
  colorFill: "transparent",
  emptyColorFill: "transparent",
  fontSize: null,
  fontColor: null,
  animation: "default 1000 400",
  legend: true,
  legendClass: "",
  angle: -90,
  loading: false,
  noData: false,
  dash: "",
  half: false,
  gap: 0,
  determinate: false,
  dot: 0,
  reverse: false,
  legendFormatter: null,
  loader: {},
};

export const factory = ({ container, props = {}, isCircleFactory = true }) => {
  const propsData = isCircleFactory ? { options: { ...circleMockProps, ...props } } : props;
  return mount(container, {
    propsData,
  });
};
