import { DEFAULT_THICKNESS, getNumberIfValid, isValidNumber } from "@/utils";
import {
  type Animation,
  Animations,
  type Dash,
  type Dot,
  type LineMode,
  LineModes,
  type LinePosition,
  LinePositions,
  type Loader,
  type Thickness,
  type VeProgressProps,
} from "@/types.ts";

export type ParsedDashObject = {
  count: number;
  spacing: number;
};

export const lineModeParser = (lineMode: LineMode = LineModes.center) => {
  const lineModeConfig = lineMode.trim().split(" ");
  return {
    mode: lineModeConfig[0] as LineModes,
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

export const loaderParser = (loader: Loader = {}, props: VeProgressProps) => ({
  ...loader,
  ...props,
  color: loader.color || props.color,
  line: loader.line || props.line,
  lineMode: lineModeParser(loader.lineMode || props.lineMode),
  thickness: calcThickness(loader.thickness || props.thickness, props.size),
});
