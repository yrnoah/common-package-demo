module.exports = {
  ignorePatterns: ["lib/*"],
  extends: [
    "react-app",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
    "plugin:storybook/recommended",
  ],
  rules: {
    "import/no-duplicates": "error",
  },
};
