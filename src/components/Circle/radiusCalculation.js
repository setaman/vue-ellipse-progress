const half = (val) => val / 2;

const thicknessWithDot = (options) => {
  return Math.max(options.thickness, options.dot.size);
};

const baseRadius = (options) => {
  return half(options.size) - half(thicknessWithDot(options));
};
const emptyBaseRadius = ({ size, emptyThickness }) => {
  return half(size) - half(emptyThickness);
};
const normalLineModeRadius = (options) => {
  if (thicknessWithDot(options) < options.emptyThickness) {
    return emptyBaseRadius(options);
  }
  return baseRadius(options);
};

const radiusNormalMode = (options) => normalLineModeRadius(options);
const radiusInMode = (options) =>
  emptyRadius(options) - half(options.emptyThickness + half(options.thickness) + options.lineMode.offset);
const radiusOutOverMode = (options) => emptyRadius(options) - half(options.emptyThickness);
const radiusBottomOrTopMode = (options) => {
  if (options.emptyThickness <= options.thickness) {
    return baseRadius(options);
  }
  return emptyRadius(options) - half(options.emptyThickness) + half(options.thickness);
};

const emptyRadiusNormalMode = (options) => normalLineModeRadius(options);
const emptyRadiusInMode = (options) => {
  const dotSizeLimit = half(options.thickness) + options.emptyThickness + options.lineMode.offset;
  if (half(options.dot.size) > dotSizeLimit) {
    return emptyBaseRadius(options) - (half(options.dot.size) - dotSizeLimit);
  }
  return emptyBaseRadius(options);
};
const emptyRadiusInOverMode = (options) => {
  const dotToThicknessDifference = options.dot.size - options.thickness;
  if (dotToThicknessDifference > 0) {
    return emptyBaseRadius(options) - half(dotToThicknessDifference);
  }
  return emptyBaseRadius(options);
};
const emptyRadiusOutMode = (options) =>
  baseRadius(options) - (half(options.thickness) + half(options.emptyThickness) + options.lineMode.offset);

const emptyRadiusOutOverMode = (options) => {
  if (options.emptyThickness <= options.thickness) {
    return baseRadius(options) - half(options.thickness) + half(options.emptyThickness);
  }
  return emptyBaseRadius(options);
};
const emptyRadiusBottomMode = (options) => {
  if (options.emptyThickness < half(thicknessWithDot(options))) {
    return emptyBaseRadius(options) - (half(thicknessWithDot(options)) - options.emptyThickness);
  }
  return emptyBaseRadius(options);
};
const emptyRadiusTopMode = (options) => emptyBaseRadius(options) - half(thicknessWithDot(options));

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
  const modes = {
    normal: () => emptyRadiusNormalMode(options),
    in: () => emptyRadiusInMode(options),
    "in-over": () => emptyRadiusInOverMode(options),
    out: () => emptyRadiusOutMode(options),
    "out-over": () => emptyRadiusOutOverMode(options),
    bottom: () => emptyRadiusBottomMode(options),
    top: () => emptyRadiusTopMode(options),
  };
  const modeHandler = modes[options.lineMode.mode];
  return modeHandler ? modeHandler() : emptyBaseRadius(options);
};
