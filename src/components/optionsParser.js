import { getNumberIfValid, isValidNumber } from "../utils";

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

export { lineModeParser, animationParser, dashParser };
