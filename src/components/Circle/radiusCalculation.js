export const radius = () => {
  const { offset } = this.lineMode;

  if (this.options.multiple) {
    return this.baseRadius - this.previousCirclesThickness;
  }

  switch (this.lineMode.mode) {
    case "normal":
      return this.normalLineModeRadius;
    case "in":
      return this.emptyRadius - (this.emptyThickness / 2 + this.thickness / 2 + offset);
    case "out-over":
      if (this.emptyThickness <= this.thickness) {
        return this.baseRadius;
      }
      return this.emptyRadius - this.emptyThickness / 2 + this.thickness / 2;
    case "bottom" || "top":
      return this.emptyRadius - this.emptyThickness / 2;
    default:
      return this.baseRadius;
  }
};

export const emptyRadius = () => {
  const { offset } = this.lineMode;

  if (this.options.multiple) {
    return this.baseRadius - this.previousCirclesThickness;
  }

  switch (this.lineMode.mode) {
    case "normal":
      return this.normalLineModeRadius;
    case "in":
      const dotSizeLimit = this.thickness / 2 + this.emptyThickness + offset;
      if (this.dotSize / 2 > dotSizeLimit) {
        return this.emptyBaseRadius - (this.dotSize / 2 - dotSizeLimit);
      }
      return this.emptyBaseRadius;
    case "in-over":
      if (this.dotToThicknessDifference > 0) {
        return this.emptyBaseRadius - this.dotToThicknessDifference / 2;
      }
      return this.emptyBaseRadius;
    case "out":
      return this.baseRadius - (this.thickness / 2 + this.emptyThickness / 2 + offset);
    case "out-over":
      if (this.emptyThickness <= this.thickness) {
        return this.baseRadius - this.thickness / 2 + this.emptyThickness / 2;
      }
      return this.emptyBaseRadius;
    case "bottom":
      if (this.emptyThickness < this.thicknessWithDot / 2) {
        return this.emptyBaseRadius - (this.thicknessWithDot / 2 - this.emptyThickness);
      }
      return this.emptyBaseRadius;
    case "top":
      return this.emptyBaseRadius - this.thicknessWithDot / 2;
    default:
      return this.emptyBaseRadius;
  }
};
const baseRadius = () => {
  return this.options.size / 2 - this.thicknessWithDot / 2;
};
const emptyBaseRadius = (size, emptyThickness) => {
  return size / 2 - emptyThickness / 2;
};
const normalLineModeRadius = () => {
  if (this.thicknessWithDot < this.emptyThickness) {
    return this.emptyBaseRadius;
  }
  return this.baseRadius;
};

const thicknessWithDot = (options) => {
  return Math.max(options.thickness, options.dot.size);
};
