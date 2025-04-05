import { isValidNumber } from "@/utils";
import type { ParsedPreviousCircle, ParsedProps } from "@/components/Circle/useParsedProps.ts";
import { type LineMode, LineModes } from "@/types.ts";
import { lineModeParser, type linePositionParser } from "@/components/optionsParser.ts";

export type RadiusCalculationOptions = Pick<
  ParsedProps,
  "thickness" | "emptyThickness" | "size" | "lineMode"
> & {
  dotSize: number;
};

const half = (val: number) => val / 2;

const thicknessWithDot = (thickness: number, dotSize: number) => {
  return Math.max(thickness, dotSize);
};

export const baseRadius = (size: number, thickness: number, dotSize: number) => {
  return half(size) - half(thicknessWithDot(thickness, dotSize));
};

const emptyBaseRadius = (size: number, emptyThickness: number) => {
  return half(size) - half(emptyThickness);
};

const centerLineModeRadius = (
  size: number,
  thickness: number,
  dotSize: number,
  emptyThickness: number
) => {
  if (thicknessWithDot(thickness, dotSize) < emptyThickness) {
    return emptyBaseRadius(size, emptyThickness);
  }
  return baseRadius(size, thickness, dotSize);
};

export const previousCirclesThickness = (
  index: number,
  gap: number,
  globalGap: number,
  previousCircles: ParsedPreviousCircle[],
  globalDotSize: number,
  globalThickness: number
) => {
  if (index === 0) return 0;
  const currentCircleGap = isValidNumber(gap) ? gap : globalGap;
  const preCirclesThickness = [];
  for (let i = 0; i < previousCircles.length; i++) {
    const data = previousCircles[i];
    const dot = data.dot ? data.dot.size : globalDotSize;
    const thickness = isValidNumber(data.thickness) ? data.thickness : globalThickness;
    const gap = isValidNumber(data.gap) ? data.gap : globalGap;
    const completeThickness = Math.max(dot, thickness);
    preCirclesThickness.push(i > 0 ? completeThickness + gap : completeThickness);
  }
  return preCirclesThickness.reduce((acc, current) => acc + current) + currentCircleGap;
};

const radiusCenterMode = (
  size: number,
  thickness: number,
  dotSize: number,
  emptyThickness: number
) => centerLineModeRadius(size, thickness, dotSize, emptyThickness);

const radiusInMode = (
  size: number,
  emptyThickness: number,
  thickness: number,
  dotSize: number,
  lineMode: ReturnType<typeof lineModeParser>
) =>
  emptyRadius({ size, emptyThickness, thickness, dotSize, lineMode }) -
  (half(emptyThickness) + half(thickness) + lineMode.offset);

const radiusOutOverMode = (
  size: number,
  emptyThickness: number,
  thickness: number,
  dotSize: number
) => {
  if (emptyThickness <= thickness) {
    return baseRadius(size, thickness, dotSize);
  }
  return emptyBaseRadius(size, emptyThickness) - half(emptyThickness) + half(thickness);
};

const radiusTopMode = (options: RadiusCalculationOptions) =>
  emptyRadius(options) + half(options.emptyThickness);

const radiusBottomMode = (options: RadiusCalculationOptions) =>
  emptyRadius(options) - half(options.emptyThickness);

const emptyRadiusCenterMode = (
  size: number,
  thickness: number,
  dotSize: number,
  emptyThickness: number
) => centerLineModeRadius(size, thickness, dotSize, emptyThickness);

const emptyRadiusInMode = (
  size: number,
  thickness: number,
  dotSize: number,
  emptyThickness: number,
  lineModeOffset: number
) => {
  const dotSizeLimit = half(thickness) + emptyThickness + lineModeOffset;
  if (half(dotSize) > dotSizeLimit) {
    return emptyBaseRadius(size, emptyThickness) - (half(dotSize) - dotSizeLimit);
  }
  return emptyBaseRadius(size, emptyThickness);
};

const emptyRadiusInOverMode = (
  size: number,
  thickness: number,
  dotSize: number,
  emptyThickness: number
) => {
  const dotToThicknessDifference = dotSize - thickness;
  if (dotToThicknessDifference > 0) {
    return emptyBaseRadius(size, emptyThickness) - half(dotToThicknessDifference);
  }
  return emptyBaseRadius(size, emptyThickness);
};

const emptyRadiusOutMode = (
  size: number,
  thickness: number,
  emptyThickness: number,
  lineModeOffset: number
) =>
  baseRadius(size, thickness, emptyThickness) -
  (half(thickness) + half(emptyThickness) + lineModeOffset);

const emptyRadiusOutOverMode = (
  size: number,
  thickness: number,
  emptyThickness: number,
  dotSize: number
) => {
  if (emptyThickness <= thickness) {
    return baseRadius(size, thickness, dotSize) - half(thickness) + half(emptyThickness);
  }
  return emptyBaseRadius(size, emptyThickness);
};

const emptyRadiusBottomMode = (
  size: number,
  thickness: number,
  dotSize: number,
  emptyThickness: number
) => {
  if (emptyThickness < half(thicknessWithDot(thickness, dotSize))) {
    return (
      emptyBaseRadius(size, emptyThickness) -
      (half(thicknessWithDot(thickness, dotSize)) - emptyThickness)
    );
  }
  return emptyBaseRadius(size, emptyThickness);
};

const emptyRadiusTopMode = (
  size: number,
  thickness: number,
  dotSize: number,
  emptyThickness: number
) => emptyBaseRadius(size, emptyThickness) - half(thicknessWithDot(thickness, dotSize));

export const radius = ({
  size,
  thickness,
  dotSize,
  emptyThickness,
  lineMode,
}: RadiusCalculationOptions) => {
  const modes: Record<LineMode, () => number> = {
    [LineModes.center]: () => radiusCenterMode(size, thickness, dotSize, emptyThickness),
    [LineModes.in]: () => radiusInMode(size, emptyThickness, thickness, dotSize, lineMode),
    [LineModes.outOver]: () => radiusOutOverMode(size, emptyThickness, thickness, dotSize),
    [LineModes.bottom]: () =>
      radiusBottomMode({ size, thickness, dotSize, emptyThickness, lineMode }),
    [LineModes.top]: () => radiusTopMode({ size, thickness, dotSize, emptyThickness, lineMode }),
  };
  const modeHandler = modes[lineMode.mode];
  return modeHandler ? modeHandler() : baseRadius(size, thickness, dotSize);
};

export const emptyRadius = ({
  size,
  thickness,
  dotSize,
  emptyThickness,
  lineMode,
}: RadiusCalculationOptions) => {
  const modes: Record<LineMode, () => number> = {
    [LineModes.center]: () => emptyRadiusCenterMode(size, thickness, dotSize, emptyThickness),
    [LineModes.in]: () =>
      emptyRadiusInMode(size, thickness, dotSize, emptyThickness, lineMode.offset),
    [LineModes.inOver]: () => emptyRadiusInOverMode(size, thickness, dotSize, emptyThickness),
    [LineModes.out]: () => emptyRadiusOutMode(size, thickness, emptyThickness, lineMode.offset),
    [LineModes.outOver]: () => emptyRadiusOutOverMode(size, thickness, emptyThickness, dotSize),
    [LineModes.bottom]: () => emptyRadiusBottomMode(size, thickness, dotSize, emptyThickness),
    [LineModes.top]: () => emptyRadiusTopMode(size, thickness, dotSize, emptyThickness),
  };
  const modeHandler = modes[lineMode.mode];
  return modeHandler ? modeHandler() : emptyBaseRadius(size, emptyThickness);
};

export const fillRadius = (
  linePosition: ReturnType<typeof linePositionParser>,
  thickness: number,
  lineCircleRadius: number
) => {
  const { position, offset } = linePosition;
  if (position === "center") {
    return lineCircleRadius;
  }
  return position === "out"
    ? lineCircleRadius - offset - thickness / 2
    : lineCircleRadius + thickness / 2;
};
