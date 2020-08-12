const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const HTML_MINIFY_OPTIONS = {
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

const CSS_MINIFY_OPTIONS = {
  discardComments: { removeAll: true },
};

module.exports = {
  bail: true,
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'inlined-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'inlined-styles.css',
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', CSS_MINIFY_OPTIONS],
      },
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      inject: false,
      minify: HTML_MINIFY_OPTIONS,
    }),
    new HtmlWebpackPlugin({
      template: './404.html',
      filename: '404.html',
      inject: false,
      minify: HTML_MINIFY_OPTIONS,
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: './keybase.txt' },
        { from: './.well-known', to: '.well-known' },
        // Hardcode [hash:8] to ab56e196 until we have a better way to keep this
        // in sync with the HTML. Keep it hashed for long-term caching.
        { from: './favicon.gif', to: 'icons-ab56e196/favicon.gif' },
      ],
    }),

    new PurgecssPlugin({
      paths: ['./src/index.html'],
    }),
  ],
};
