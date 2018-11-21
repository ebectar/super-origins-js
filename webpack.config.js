const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: { main: './src/js/app.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './dist/index.html',
      filename: 'index.html'
    }),
  ]
};