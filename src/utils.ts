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

export { getNumberIfValid, isValidNumber };
