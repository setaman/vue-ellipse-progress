import { isValidNumber } from "../../utils";

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
const centerLineModeRadius = (options) => {
  if (thicknessWithDot(options) < options.emptyThickness) {
    return emptyBaseRadius(options);
  }
  return baseRadius(options);
};

const previousCirclesThickness = (options) => {
  if (options.index === 0) return 0;
  const currentCircleGap = isValidNumber(options.gap) ? options.gap : options.globalGap;
  const preCirclesThickness = [];
  for (let i = 0; i < options.previousCircles.length; i++) {
    const data = options.previousCircles[i];
    const dot = data.dot ? data.dot.size : options.globalDot.size;
    const thickness = isValidNumber(data.thickness) ? data.thickness : options.globalThickness;
    const gap = isValidNumber(data.gap) ? data.gap : options.globalGap;
    const completeThickness = Math.max(dot, thickness);
    preCirclesThickness.push(i > 0 ? completeThickness + gap : completeThickness);
  }
  return preCirclesThickness.reduce((acc, current) => acc + current) + currentCircleGap;
};

const radiusCenterMode = (options) => centerLineModeRadius(options);
const radiusInMode = (options) =>
  emptyRadius(options) - (half(options.emptyThickness) + half(options.thickness) + options.lineMode.offset);
const radiusOutOverMode = (options) => {
  if (options.emptyThickness <= options.thickness) {
    return baseRadius(options);
  }
  return emptyBaseRadius(options) - half(options.emptyThickness) + half(options.thickness);
};
const radiusTopMode = (options) => emptyRadius(options) + half(options.emptyThickness);
const radiusBottomMode = (options) => emptyRadius(options) - half(options.emptyThickness);

const emptyRadiusCenterMode = (options) => centerLineModeRadius(options);
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
    multiple: () => baseRadius(options) - previousCirclesThickness(options),
    center: () => radiusCenterMode(options),
    in: () => radiusInMode(options),
    "out-over": () => radiusOutOverMode(options),
    bottom: () => radiusBottomMode(options),
    top: () => radiusTopMode(options),
  };
  const modeHandler = modes[options.lineMode.mode];
  return modeHandler ? modeHandler() : baseRadius(options);
};

export const emptyRadius = (options) => {
  const modes = {
    multiple: () => baseRadius(options) - previousCirclesThickness(options),
    center: () => emptyRadiusCenterMode(options),
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

export const fillRadius = (linePosition, thickness, lineCircleRadius) => {
  const { position, offset } = linePosition;
  if (position === "center") {
    return lineCircleRadius;
  }
  return position === "out" ? lineCircleRadius - offset - thickness / 2 : lineCircleRadius + thickness / 2;
};
