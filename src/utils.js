const isValidNumber = (prop) => prop !== undefined && prop !== "" && prop !== null && !Number.isNaN(parseFloat(prop));

const getNumberIfValid = (prop) => {
  if (isValidNumber(prop)) {
    return parseFloat(prop);
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

export { getNumberIfValid, isValidNumber };
