var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackUncssPlugin = require('html-webpack-uncss-plugin');
var path = require('path');


module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: 'dist',
    filename: 'inlined-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader?' + JSON.stringify({discardComments: {removeAll: true}}),
            'sass-loader',
          ],
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1,
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        query: {
          minimize: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './favicon.ico',
      template: './index.html',
      inlineSource: '.(css|js)$',
    }),
    new ExtractTextPlugin('inlined-styles.css'),
    new HtmlWebpackInlineSourcePlugin(),
    new HtmlWebpackUncssPlugin(),
  ]
};
