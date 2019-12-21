const getValueIfDefined = prop => {
  if (prop !== undefined && prop !== null && !Number.isNaN(prop)) {
    return prop;
  }
  return false;
};

const isValidNumber = prop => prop !== undefined && prop !== null && !Number.isNaN(parseFloat(prop));

export { getValueIfDefined, isValidNumber };
