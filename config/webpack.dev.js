const path = require("path")
const { merge } = require("webpack-merge")
const common = require("./webpack.common")

module.exports = (env, mode) =>
  merge(common(env, mode), {
    devtool: "eval-cheap-module-source-map",
    target: "web",
    devServer: {
      // open: true,
      static: { directory: path.resolve(__dirname, "../dist") },
      host: "local-ip",
    },
    output: {
      asyncChunks: true,
      filename: `[name].js`,
      publicPath: "auto",
      path: path.resolve(__dirname, "../dist"),
    },
  })
