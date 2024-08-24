module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["chore", "build", "ci", "docs", "feat", "fix", "refactor", "revert", "test", "release"],
    ],
  },
};
