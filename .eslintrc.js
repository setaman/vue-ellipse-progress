module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["prettier"],
  extends: ["plugin:vue/essential", "@vue/airbnb", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "warn",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "max-len": [2, 120, 8],
    "no-restricted-syntax": "off",
    "guard-for-in": "off",
    "no-case-declarations": "off",
    "no-use-before-define": "off",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
