module.exports = {
  extends: ["@commitlint/config-conventional"],
  "type-enum": [
    2,
    "always",
    ["build", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test", "release"],
  ],
};
