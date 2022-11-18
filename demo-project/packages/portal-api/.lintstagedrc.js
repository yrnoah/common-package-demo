module.exports = {
  "*.js": ["prettier --write", "eslint"],
  "*.ts?(x)": ["prettier --write", "eslint"],
  "*.y?(a)ml": ["prettier --write"],
};
