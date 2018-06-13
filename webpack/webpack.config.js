const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "production",
  output: {
    path: path.dirname(__dirname) + '/assets/static/gen',
    filename: "[name].js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
      chunkFilename: "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'sass-loader'
        ]
      }
    ]
  }
};