module.exports = {
  babel: {
    plugins: [
      "babel-plugin-styled-components",
      [
        "react-intl",
        {
          idInterpolationPattern: "[sha512:contenthash:base64:10]",
          extractFromFormatMessageCall: true,
          ast: true,
        },
      ],
    ],
  },
};
