const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = () =>
  merge(common(), {
    devtool: false,
    output: {
      clean: true,
      filename: "[name].[contenthash].js",
      publicPath: './',
      path: path.resolve(__dirname, "../dist"),
    },
  });
