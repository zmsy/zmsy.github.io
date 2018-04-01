    var webpack = require('webpack');
    var path = require('path');
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

    var options = {
      entry: {
        'main': './src/main.js'
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
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader'
          },
          {
            test: /\.scss$/,
            include: [
              path.resolve(__dirname, './node_modules/'),
              path.resolve(__dirname, './src/')
            ],
            loader: ExtractTextPlugin.extract({
              use: ['css-loader', 'sass-loader'],
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
        new ExtractTextPlugin('[name].min.css', {
          allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorOptions: { discardComments: { removeAll: true } }
        })
      ]
    };

    module.exports = options;
