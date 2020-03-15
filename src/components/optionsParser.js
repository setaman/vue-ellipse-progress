import { getValueIfDefined } from "../utils";

/* const colorParser = color => {
  const config = color.trim().split(",");

  if (config.length > 1) {
    const colors = [];
    const radial = config[0] === "radial";
    const startIndex = radial ? 1 : 0;
    for (let i = startIndex; i < config.length; i++) {
      const colorConfig = config[i].trim().split(" ");
      colors.push({
        color: colorConfig[0],
        offset: colorConfig[1],
        opacity: getValueIfDefined(colorConfig[2]) || 1
      });
    }
    return {
      gradient: {
        radial: config[0] === "radial",
        colors
      }
    };
  }
  return color;
}; */

const lineModeParser = lineMode => {
  const lineModeConfig = lineMode.trim().split(" ");
  return {
    mode: lineModeConfig[0],
    offset: getValueIfDefined(lineModeConfig[1]) || 0
  };
};

const animationParser = animation => {
  const animationConfig = animation.trim().split(" ");
  return {
    type: animationConfig[0],
    duration: getValueIfDefined(animationConfig[1]) || 1000,
    delay: getValueIfDefined(animationConfig[2]) || 400
  };
};

const dashParser = dash => {
  const dashConfig = dash.trim().split(" ");
  const isStrict = dashConfig[0] === "strict";
  if (!isStrict) {
    return dash;
  }
  return {
    count: dashConfig[1],
    spacing: dashConfig[2]
  };
};

export { lineModeParser, animationParser, dashParser };
