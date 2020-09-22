var path = require("path");

module.exports = {
  entry: ["./index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "scripts.js",
  },
  devServer: {
    contentBase: "public",
    compress: true,
    publicPath: "/",
    port: 9000,
  },
};
