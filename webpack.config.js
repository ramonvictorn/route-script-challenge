const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: "./src/web/private/js/index.js",
    output: {
        path: path.resolve(__dirname, "src/web/public/assets/js"),
        filename: "index.js"
    },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/,/core/],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
};