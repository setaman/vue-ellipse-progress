module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["prettier"],
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "plugin:prettier/recommended"],
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
    "vue/multi-word-component-names": 0,
    "no-promise-executor-return": 0,
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        mocha: true,
      },
    },
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
};
