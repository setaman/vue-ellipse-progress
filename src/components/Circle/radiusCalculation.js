const thicknessWithDot = (options) => {
  return Math.max(options.thickness, options.dot.size);
};

const baseRadius = (options) => {
  return options.size / 2 - thicknessWithDot(options) / 2;
};
const emptyBaseRadius = ({ size, emptyThickness }) => {
  return size / 2 - emptyThickness / 2;
};
const normalLineModeRadius = (options) => {
  if (thicknessWithDot(options) < options.emptyThickness) {
    return emptyBaseRadius(options);
  }
  return baseRadius(options);
};

const half = (val) => val / 2;

const radiusNormalMode = (options) => normalLineModeRadius(options);
const radiusInMode = (options) =>
  emptyRadius(options) - half(options.emptyThickness + half(options.thickness) + options.lineMode.offset);
const radiusOutOverMode = (options) => emptyRadius - half(options.emptyThickness);
const radiusBottomOrTopMode = (options) => {
  if (options.emptyThickness <= options.thickness) {
    return baseRadius;
  }
  return emptyRadius - half(options.emptyThickness) + half(options.thickness);
};

export const radius = (options) => {
  const modes = {
    normal: () => radiusNormalMode(options),
    in: () => radiusInMode(options),
    "out-over": () => radiusOutOverMode(options),
    bottom: () => radiusBottomOrTopMode(options),
    top: () => radiusBottomOrTopMode(options),
  };
  const modeHandler = modes[options.lineMode.mode];
  return modeHandler ? modeHandler() : baseRadius(options);
};

export const emptyRadius = (options) => {
  const { offset } = options.lineMode;

  if (options.options.multiple) {
    return options.baseRadius - options.previousCirclesThickness;
  }

  const modes = {
    normal: () => normalLineModeRadius(options),
    in: () => normalLineModeRadius(options),
    "in-over": () => normalLineModeRadius(options),
    out: () => normalLineModeRadius(options),
    "out-over": () => normalLineModeRadius(options),
    bottom: () => normalLineModeRadius(options),
    top: () => normalLineModeRadius(options),
  };

  /* switch (options.lineMode.mode) {
    case "normal":
      return options.normalLineModeRadius;
    case "in":
      const dotSizeLimit = options.thickness / 2 + options.emptyThickness + offset;
      if (options.dotSize / 2 > dotSizeLimit) {
        return options.emptyBaseRadius - (options.dotSize / 2 - dotSizeLimit);
      }
      return options.emptyBaseRadius;
    case "in-over":
      if (options.dotToThicknessDifference > 0) {
        return options.emptyBaseRadius - options.dotToThicknessDifference / 2;
      }
      return options.emptyBaseRadius;
    case "out":
      return options.baseRadius - (options.thickness / 2 + options.emptyThickness / 2 + offset);
    case "out-over":
      if (options.emptyThickness <= options.thickness) {
        return options.baseRadius - options.thickness / 2 + options.emptyThickness / 2;
      }
      return options.emptyBaseRadius;
    case "bottom":
      if (options.emptyThickness < options.thicknessWithDot / 2) {
        return options.emptyBaseRadius - (options.thicknessWithDot / 2 - options.emptyThickness);
      }
      return options.emptyBaseRadius;
    case "top":
      return options.emptyBaseRadius - options.thicknessWithDot / 2;
    default:
      return options.emptyBaseRadius;
  } */
  const modeHandler = modes[options.lineMode.mode];
  return modeHandler ? modeHandler() : "";
};
