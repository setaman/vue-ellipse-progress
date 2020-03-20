const colorConfig = (defaultColor = "transparent") => ({
  type: [String, Object],
  required: false,
  default: defaultColor,
  validator: value => {
    if (value && typeof value === "string") {
      return true;
    }
    if (typeof value === "object" && value.colors) {
      return value.colors.filter(config => config.color && config.offset).length > 0;
    }
    return false;
  }
});

export default {
  data: {
    type: Array,
    required: false,
    default: () => []
  },
  progress: {
    type: Number,
    require: true,
    validator: val => val >= 0 && val <= 100
  },
  legendValue: {
    type: Number,
    required: false
  },
  size: {
    type: Number,
    required: false,
    default: 200,
    validator: value => value >= 0
  },
  thickness: {
    type: [Number, String],
    required: false,
    default: "5%",
    validator: value => parseFloat(value) >= 0
  },
  emptyThickness: {
    type: [Number, String],
    required: false,
    default: "5%",
    validator: value => parseFloat(value) >= 0
  },
  line: {
    type: String,
    required: false,
    default: "round",
    validator: value => ["round", "butt", "square"].includes(value)
  },
  lineMode: {
    type: String,
    required: false,
    default: "normal",
    validator: value => ["normal", "out", "out-over", "in", "in-over", "top", "bottom"].includes(value.split(" ")[0])
  },
  color: colorConfig("#3f79ff"),
  emptyColor: colorConfig("#e6e9f0"),
  colorFill: colorConfig(),
  emptyColorFill: colorConfig(),
  fontSize: {
    type: String,
    required: false
  },
  fontColor: {
    type: String,
    required: false
  },
  animation: {
    type: String,
    required: false,
    default: "default 1000 400",
    validation: value => {
      const config = value.split(" ");
      const isValidType = ["default", "rs", "loop", "reverse", "bounce"].includes(config[0]);
      const isValidDuration = config[0] ? parseFloat(config[1]) > 0 : true;
      const isValidDelay = config[2] ? parseFloat(config[2]) > 0 : true;

      return isValidType && isValidDuration && isValidDelay;
    }
  },
  legend: {
    type: Boolean,
    required: false,
    default: true
  },
  legendClass: {
    type: String,
    required: false
  },
  angle: {
    type: [String, Number],
    required: false,
    default: -90
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  noData: {
    type: Boolean,
    required: false,
    default: false
  },
  dash: {
    type: String,
    required: false,
    default: "",
    validator: value => {
      if (value.startsWith("strict")) {
        const config = value.split(" ");
        return parseFloat(config[1]) >= 0 && parseFloat(config[2]) >= 0;
      }
      return true;
    }
  },
  half: {
    type: Boolean,
    required: false,
    default: false
  },
  gap: {
    type: Number,
    required: false,
    default: 0
  },
  determinate: {
    type: Boolean,
    required: false,
    default: false
  }
};
