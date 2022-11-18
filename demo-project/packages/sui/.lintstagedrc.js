module.exports = {
  "*.js": ["prettier --write", "eslint"],
  "*.ts?(x)": ["prettier --write", "eslint", "stylelint"],
  "*.y?(a)ml": ["prettier --write"],
};
