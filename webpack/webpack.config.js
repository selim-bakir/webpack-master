const webpack = require('webpack');
const path = require('path');
const pluginsConfig = require("./webpack.plugins.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const dev = false;

//CSS LOADER
let cssLoaders = [
    dev ? {
        loader: 'style-loader',
        options: {
            sourceMap: true
        }
    } : MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            sourceMap: true,
        }
    }
];
if (dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')({
                    browsers: ["last 2 versions", 'ie > 8']
                })
            ]
        }
    });
}



//START CONFIG
let config = {
    devtool: dev ? 'cheap-eval-source-map' : false,
    devServer: {
        contentBase: path.resolve(__dirname, "src"),
        host: "localhost",
        port: "8090",
        disableHostCheck: false,
        open: true,
        hot: true,
        quiet: true,
    },
    resolve: {
        alias: {
            'assets': path.resolve('src/assets/'),
            'components-scss': path.resolve('src/assets/scss/components/'),
            'pages-scss': path.resolve('src/assets/scss/pages/'),
            'vendors-scss': path.resolve('src/assets/scss/vendors/'),
        }
    },
    watch: true,
    entry: {
        index: ['./src/assets/scss/app.scss', './src/assets/scripts/index.js'],
        page2: ['./src/assets/scss/pages/page2.scss', './src/assets/scripts/page2.js']
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].bundle.js',
        chunkFilename: '[id].bundle_[chunkhash].js',
        sourceMapFilename: '[file].map'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [{
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    {
                        loader: "eslint-loader",
                        options: {
                            fix: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: cssLoaders,
            },
            {
                test: /\.scss$/,
                use: [
                    ...cssLoaders,
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [
                                require('path').resolve(__dirname, 'node_modules')
                            ]
                        },

                    }
                ]
            },

            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'images/[name].[hash:7].[ext]',
                        limit: 8192
                    },
                }, ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                }
            }
        ]
    },
    plugins: pluginsConfig,
};

module.exports = config;
