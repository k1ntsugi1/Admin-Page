const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"),
  output: {
    publicPath: "/",
    filename: "[name].bundle.js",
    path: path.join(__dirname, "../dist"),
    chunkFilename: "[name]-[id].js",
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".scss", ".js", ".jsx"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(c|s[ac])ss$/i,
        use: [
          "style-loader",
          "css-loader",
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: {
          //       localIdentName: '[hash:base64:5]--[local]'
          //     }
          //   }
          // },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
      title: "test-task",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
