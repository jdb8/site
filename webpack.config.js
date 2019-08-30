var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var path = require('path');
var PurgecssPlugin = require('purgecss-webpack-plugin');
var PnpWebpackPlugin = require(`pnp-webpack-plugin`);

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
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer `dart-sass`
                            implementation: require('sass'),
                        }
                    }
                ],
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
    resolve: {
        plugins: [
            PnpWebpackPlugin,
        ],
    },
    resolveLoader: {
        plugins: [
            PnpWebpackPlugin.moduleLoader(module),
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
            { from: './.well-known', to: '.well-known' },
            // Hardcode [hash:8] to ab56e196 until we have a better way to keep this
            // in sync with the HTML. Keep it hashed for long-term caching.
            { from: './favicon.gif', to: 'icons-ab56e196/favicon.gif' },
        ]),

        new HtmlWebpackInlineSourcePlugin(),
        new PurgecssPlugin({
            paths: ['./src/index.html']
        }),
    ],
};
