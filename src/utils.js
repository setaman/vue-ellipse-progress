const isValidNumber = (prop) => prop !== undefined && prop !== "" && prop !== null && !Number.isNaN(parseFloat(prop));

const getNumberIfValid = (prop) => {
  if (isValidNumber(prop)) {
    return parseFloat(prop);
  }
  return false;
};

export { getNumberIfValid, isValidNumber };
