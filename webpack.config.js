const path = require("path")

module.exports = {
  mode: "production", // optimizations
  entry: "./loadTest.js", // entry script
  output: {
    // where to put the files
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs", // language target
    filename: "[name].bundle.js",
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader" }], // convert js files
  },
  target: "web", // target platform
  externals: /k6(\/.*)?/, // what dependencies not to bundle
  devtool: "source-map",
}
