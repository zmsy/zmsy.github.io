var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var options = {
  entry: {
    'app': './js/main.js',
    'styles': './scss/main.scss'
  },
  output: {
    path: path.dirname(__dirname) + '/assets/test/gen',
    filename: '[name].js'
  },
  devtool: '#cheap-module-source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, './node_modules/'),
          path.resolve(__dirname, './scss/')
        ],
        loader: ExtractTextPlugin.extract({
          use: ['sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g\|\.gif$/,
        loader: 'file'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = options;
