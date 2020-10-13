import { getNumberIfValid, isValidNumber } from "@/utils";

const lineModeParser = (lineMode) => {
  const lineModeConfig = lineMode.trim().split(" ");
  return {
    mode: lineModeConfig[0],
    offset: getNumberIfValid(lineModeConfig[1]) || 0,
  };
};

const animationParser = (animation) => {
  const animationConfig = animation.trim().split(" ");
  return {
    type: animationConfig[0],
    duration: isValidNumber(animationConfig[1]) ? parseFloat(animationConfig[1]) : 1000,
    delay: isValidNumber(animationConfig[2]) ? parseFloat(animationConfig[2]) : 400,
  };
};

const dashParser = (dash) => {
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

const dotParser = (dot) => {
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
    size: dotSize,
    color: dotColor,
  };
};

const calcThickness = (thickness, size) => {
  const value = parseFloat(thickness);
  return thickness.toString().includes("%") ? (value * size) / 100 : value;
};

export default (options) => ({
  ...options,
  thickness: calcThickness(options.thickness, options.size),
  emptyThickness: calcThickness(options.emptyThickness, options.size),
  globalThickness: calcThickness(options.thickness, options.size),
  dot: { ...dotParser(options.dot), size: calcThickness(dotParser(options.dot).size, options.size) },
  globalDot: { ...dotParser(options.globalDot), size: calcThickness(dotParser(options.globalDot).size, options.size) },
  dash: dashParser(options.dash),
  lineMode: options.isMultiple ? "multiple" : lineModeParser(options.lineMode),
  animation: animationParser(options.animation),
});
