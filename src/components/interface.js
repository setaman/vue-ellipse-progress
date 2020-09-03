const colorConfig = (defaultColor = "transparent") => ({
  type: [String, Object],
  required: false,
  default: defaultColor,
  validator: (value) => {
    if (typeof value === "string" && value) {
      return true;
    }
    if (typeof value === "object" && value.colors) {
      return value.colors.every((config) => config.color && config.offset);
    }
    return false;
  },
});

const props = {
  data: {
    type: Array,
    required: false,
    default: () => [],
  },
  progress: {
    type: Number,
    require: true,
    validator: (val) => val >= -100 && val <= 100,
  },
  legendValue: {
    type: [Number, String],
    required: false,
    validator: (value) => !Number.isNaN(parseFloat(value.toString().replace(",", "."))),
  },
  size: {
    type: Number,
    required: false,
    default: 200,
    validator: (value) => value >= 0,
  },
  thickness: {
    type: [Number, String],
    required: false,
    default: "5%",
    validator: (value) => parseFloat(value) >= 0,
  },
  emptyThickness: {
    type: [Number, String],
    required: false,
    default: "5%",
    validator: (value) => parseFloat(value) >= 0,
  },
  line: {
    type: String,
    required: false,
    default: "round",
    validator: (value) => ["round", "butt", "square"].includes(value),
  },
  lineMode: {
    type: String,
    required: false,
    default: "normal",
    validator: (value) => {
      const lineModeConfig = value.split(" ");
      const isValidType = ["normal", "out", "out-over", "in", "in-over", "top", "bottom"].includes(lineModeConfig[0]);
      const isValidOffset = lineModeConfig[1] ? !Number.isNaN(parseFloat(lineModeConfig[1])) : true;

      return isValidType && isValidOffset;
    },
  },
  color: colorConfig("#3f79ff"),
  emptyColor: colorConfig("#e6e9f0"),
  colorFill: colorConfig(),
  emptyColorFill: colorConfig(),
  fontSize: {
    type: String,
    required: false,
  },
  fontColor: {
    type: String,
    required: false,
  },
  animation: {
    type: String,
    required: false,
    default: "default 1000 400",
    validator: (value) => {
      const config = value.split(" ");
      const isValidType = ["default", "rs", "loop", "reverse", "bounce"].some((val) => val === config[0]);
      const isValidDuration = config[1] ? parseFloat(config[1]) >= 0 : true;
      const isValidDelay = config[2] ? parseFloat(config[2]) >= 0 : true;
      return isValidType && isValidDuration && isValidDelay;
    },
  },
  legend: {
    type: Boolean,
    required: false,
    default: true,
  },
  legendClass: {
    type: String,
    required: false,
  },
  angle: {
    type: [String, Number],
    required: false,
    default: -90,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  noData: {
    type: Boolean,
    required: false,
    default: false,
  },
  dash: {
    type: String,
    required: false,
    default: "",
    validator: (value) => {
      if (value.startsWith("strict")) {
        const config = value.split(" ");
        return parseFloat(config[1]) >= 0 && parseFloat(config[2]) >= 0;
      }
      return true;
    },
  },
  half: {
    type: Boolean,
    required: false,
    default: false,
  },
  gap: {
    type: Number,
    required: false,
    default: 0,
    validator: (val) => !Number.isNaN(parseInt(val, 10)),
  },
  determinate: {
    type: Boolean,
    required: false,
    default: false,
  },
  dot: {
    type: [String, Number, Object],
    required: false,
    default: 0,
    validator: (value) => {
      if (typeof value === "object") {
        if (value.size !== undefined) {
          return !Number.isNaN(parseFloat(value.size));
        }
        return false;
      }
      return !Number.isNaN(parseFloat(value));
    },
  },
  reverse: {
    type: Boolean,
    required: false,
    default: false,
  },
};

const simplifiedProps = {};

for (const p in props) {
  simplifiedProps[p] = {
    type: props[p].type,
    default: props[p].default,
  };
}

export { props, simplifiedProps };
