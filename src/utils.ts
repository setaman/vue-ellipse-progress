import type { Dot, Thickness, VeProgressProps } from "@/types.ts";

export type PreviousCircle = Pick<VeProgressProps, "thickness" | "gap" | "dot">;
export interface MultipleCirclesProps {
  index: number;
  globalDot?: Dot;
  globalThickness?: Thickness;
  //FIXME: loosed somewhere
  globalGap?: number;
  multipleCircles?: boolean;
  previousCircles?: PreviousCircle[];
}

export interface CircleProps extends VeProgressProps, MultipleCirclesProps {}

const isValidNumber = (prop: unknown) =>
  prop !== undefined && prop !== "" && prop !== null && !Number.isNaN(parseFloat(prop as string));
export const isString = (prop: unknown) => typeof prop === "string" || prop instanceof String;

const getNumberIfValid = (prop: unknown) => {
  if (isValidNumber(prop)) {
    return parseFloat(prop as string);
  }
  return false;
};

export const defaultCounterTick = {
  currentValue: 0,
  countProgress: 0,
  currentFormattedValue: "0",
  currentRawValue: 0,
  duration: 0,
  previousCountStepValue: 0,
  start: 0,
  end: 0,
  difference: 0,
  currentDifference: 0,
  oneStepDifference: 0,
  startTime: 0,
  elapsed: 0,
};

export const DEFAULT_THICKNESS = "5%";
export const DEFAULT_SIZE = 200;
export const DEFAULT_COLOR = "#3f79ff";
export const DEFAULT_EMPTY_COLOR = "#e6e9f0";
export const DEFAULT_FILL_COLOR = "transparent";
export const DEFAULT_ANGLE = -90;
export const DEFAULT_GAP = 0;

export { getNumberIfValid, isValidNumber };
