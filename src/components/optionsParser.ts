import { DEFAULT_THICKNESS, getNumberIfValid, isValidNumber } from "@/utils";
import {
  type Animation,
  type Dash,
  type Dot,
  type LineMode,
  type LinePosition,
  LinePositions,
  type Loader,
  type Thickness,
  type VeProgressProps,
} from "@/types.ts";
import { Animations, LineModes } from "@/types.ts";

export interface PropsParserOptions {
  globalDot?: Dot;
  globalThickness?: Thickness;
  multipleCircles: boolean;
}

export type ParsedProps = ReturnType<typeof parseOptions>;

export const lineModeParser = (lineMode: LineMode = LineModes.center, multiple: boolean) => {
  const lineModeConfig = lineMode.trim().split(" ");
  const mode = multiple ? "multiple" : lineModeConfig[0];
  return {
    mode,
    offset: getNumberIfValid(lineModeConfig[1]) || 0,
  };
};

export const animationParser = (animation: Animation = `${Animations.default} 1000 400`) => {
  const animationConfig = animation.trim().split(" ");
  const duration = isValidNumber(animationConfig[1]) ? parseFloat(animationConfig[1]) : 1000;
  const delay = isValidNumber(animationConfig[2]) ? parseFloat(animationConfig[2]) : 400;
  return {
    type: animationConfig[0],
    duration: duration >= 0 ? duration : 0,
    delay: delay >= 0 ? delay : 0,
  };
};

export const dashParser = (dash?: Dash) => {
  const dashConfig = (dash ?? "").trim().split(" ");
  const isStrict = dashConfig[0] === "strict";
  if (!isStrict) {
    return dash;
  }
  return {
    count: parseInt(dashConfig[1], 10),
    spacing: parseFloat(dashConfig[2]),
  };
};

export const dotParser = (dot: Dot = 0, circleSize = 200) => {
  let dotSize = DEFAULT_THICKNESS;
  let dotColor = "white";
  let styles = {};
  if (typeof dot !== "object") {
    const dotConfig = dot.toString().trim().split(" ");
    dotSize = isValidNumber(dotConfig[0]) ? dotConfig[0] : DEFAULT_THICKNESS;
    dotColor = dotConfig[1] || "white";
  } else {
    const { size = DEFAULT_THICKNESS, ...rest } = dot;
    dotSize = size;
    styles = rest;
  }
  return {
    ...styles,
    size: calcThickness(dotSize as Thickness, circleSize),
    color: dotColor,
  };
};

export const calcThickness = (thickness: Thickness = DEFAULT_THICKNESS, circleSize = 200) => {
  const value = parseFloat(thickness as string);
  return thickness.toString().includes("%") ? (value * circleSize) / 100 : value;
};

export const linePositionParser = (linePosition: LinePosition = LinePositions.center) => {
  const [position, offset] = linePosition.toString().split(" ");
  return {
    position,
    offset: parseFloat(offset) || 0,
  };
};

export const loaderParser = (loader: Loader, props: VeProgressProps, multiple: boolean) => ({
  ...loader,
  color: loader.color || props.color,
  line: loader.line || props.line,
  lineMode: lineModeParser(loader.lineMode || props.lineMode, multiple),
  thickness: calcThickness(loader.thickness || props.thickness, props.size),
});

export const parseOptions = (props: VeProgressProps, options: PropsParserOptions) => ({
  ...props,
  thickness: calcThickness(props.thickness, props.size),
  emptyThickness: calcThickness(props.emptyThickness, props.size),
  globalThickness: calcThickness(options.globalThickness, props.size),
  dot: dotParser(props.dot, props.size),
  globalDot: dotParser(options.globalDot, props.size),
  dash: dashParser(props.dash),
  lineMode: lineModeParser(props.lineMode, options.multipleCircles),
  linePosition: linePositionParser(props.linePosition),
  emptyLinePosition: linePositionParser(props.emptyLinePosition),
  animation: animationParser(props.animation),
  loader: props.loader ? loaderParser(props.loader, props, options.multipleCircles) : undefined,
});
