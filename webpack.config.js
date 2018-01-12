var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackUncssPlugin = require('html-webpack-uncss-plugin');
var path = require('path');
var webpack = require('webpack');

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

var CSS_MINIFY_OPTIONS = {
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
        loaders: [
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?' +
                            JSON.stringify({ minimize: CSS_MINIFY_OPTIONS }),
                        'sass-loader',
                    ],
                }),
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 1,
                },
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('inlined-styles.css'),
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

        new CopyWebpackPlugin([
            { from: './keybase.txt' },
            // Hardcode [hash:8] to ab56e196 until we have a better way to keep this
            // in sync with the HTML. Keep it hashed for long-term caching.
            { from: './favicon.gif', to: 'icons-ab56e196/favicon.gif' },
        ]),

        new HtmlWebpackInlineSourcePlugin(),
        new HtmlWebpackUncssPlugin(),

        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
};
