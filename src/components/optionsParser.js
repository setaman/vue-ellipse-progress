import { getNumberIfValid, isValidNumber } from "@/utils";

export const lineModeParser = (lineMode, multiple) => {
  const lineModeConfig = lineMode.trim().split(" ");
  const mode = multiple ? "multiple" : lineModeConfig[0];
  return {
    mode,
    offset: getNumberIfValid(lineModeConfig[1]) || 0,
  };
};

export const animationParser = (animation) => {
  const animationConfig = animation.trim().split(" ");
  return {
    type: animationConfig[0],
    duration: isValidNumber(animationConfig[1]) ? parseFloat(animationConfig[1]) : 1000,
    delay: isValidNumber(animationConfig[2]) ? parseFloat(animationConfig[2]) : 400,
  };
};

export const dashParser = (dash) => {
  const dashConfig = dash.trim().split(" ");
  const isStrict = dashConfig[0] === "strict";
  if (!isStrict) {
    return dash;
  }
  return {
    count: parseInt(dashConfig[1], 10),
    spacing: parseFloat(dashConfig[2]),
  };
};

export const dotParser = (dot, circleSize) => {
  let dotSize = 0;
  let dotColor = "white";
  let styles = {};
  if (typeof dot !== "object") {
    const dotConfig = dot.toString().trim().split(" ");
    dotSize = isValidNumber(dotConfig[0]) ? dotConfig[0] : 0;
    dotColor = dotConfig[1] || "white";
  } else {
    dotSize = dot.size || 0;
    styles = dot;
  }
  return {
    ...styles,
    size: calcThickness(dotSize, circleSize),
    color: dotColor,
  };
};

export const calcThickness = (thickness, circleSize) => {
  const value = parseFloat(thickness);
  return thickness.toString().includes("%") ? (value * circleSize) / 100 : value;
};

export const linePositionParser = (linePosition) => {
  const [position, offset] = linePosition.toString().split(" ");
  return {
    position,
    offset: parseFloat(offset) || 0,
  };
};

export const loaderParser = (loader, options) => ({
  ...loader,
  color: loader.color || options.color,
  line: loader.line || options.line,
  lineMode: lineModeParser(loader.lineMode || options.lineMode, false),
  thickness: calcThickness(loader.thickness || options.thickness, options.size),
});

export const parseOptions = (options) => ({
  ...options,
  thickness: calcThickness(options.thickness, options.size),
  emptyThickness: calcThickness(options.emptyThickness, options.size),
  globalThickness: calcThickness(options.globalThickness, options.size),
  dot: dotParser(options.dot, options.size),
  globalDot: dotParser(options.globalDot, options.size),
  dash: dashParser(options.dash),
  lineMode: lineModeParser(options.lineMode, options.multiple),
  linePosition: linePositionParser(options.linePosition),
  emptyLinePosition: linePositionParser(options.emptyLinePosition),
  animation: animationParser(options.animation),
  loader: loaderParser(options.loader, options),
});
