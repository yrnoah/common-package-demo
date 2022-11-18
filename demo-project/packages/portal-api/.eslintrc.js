module.exports = {
  ignorePatterns: ["lib/*"],
  extends: ["react-app", "plugin:prettier/recommended"],
  rules: {
    "import/no-duplicates": "error",
  },
};
