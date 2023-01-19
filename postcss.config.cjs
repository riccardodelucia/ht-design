module.exports = {
  parser: require("postcss-comment"),
  plugins: [
    require("postcss-nested"),
    require("postcss-import"),
    require("autoprefixer"),
  ],
};
