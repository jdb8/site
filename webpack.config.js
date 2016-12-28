var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackUncssPlugin = require('html-webpack-uncss-plugin');
var path = require('path');


var HTML_MINIFY_OPTIONS = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
};


module.exports = {
  bail: true,
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
    ],
  },
  plugins: [
    new ExtractTextPlugin('inlined-styles.css'),
    new FaviconsWebpackPlugin({
      logo: './clown.svg',
      prefix: 'icons-[hash:8]/',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      }
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      inlineSource: '.(css|js)$',
      minify: HTML_MINIFY_OPTIONS,
    }),
    new HtmlWebpackPlugin({
      template: './404.html',
      filename: '404.html',
      inject: false,
      minify: HTML_MINIFY_OPTIONS,
    }),

    new HtmlWebpackInlineSourcePlugin(),
    new HtmlWebpackUncssPlugin(),
  ]
};
