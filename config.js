const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const dev = process.env.NODE_ENV === "dev"
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


let config = {
  devtool: dev ? 'cheap-eval-source-map' :  'source-map',
  entry:  {
    main: './src/index.js',
    page2: './src/scripts/page2.js'
},
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    sourceMapFilename: '[file].map'
},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, 
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader', options: {importLoaders: 1}
          },
          {
            loader : 'postcss-loader',
            options: {
              plugins: (loader) =>[
                require('autoprefixer')({
                  browsers: ["last 2 versions", 'ie > 8']
                })
              ]
            }
          },
          'sass-loader'
        ],
      },
      // {
      //   test: /\.html$/,
      //   loader: "raw-loader"
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'page2.html',
      template: 'src/page2.html',
      chunks: ['page2']
    }),
    new CleanWebpackPlugin(__dirname + '/dist', { allowExternal: true }),
    new MiniCssExtractPlugin({      
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devServer: {
    hot: true
  }
}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new CleanWebpackPlugin(__dirname + '/../dist', { allowExternal: true })
    )
}