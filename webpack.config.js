const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const dev = process.env.NODE_ENV === "dev"
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let cssLoaders =  [
  dev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {loader : 'css-loader', options: {importLoaders: 1}}
]

if (!dev){
  cssLoaders.push({
      loader : 'postcss-loader',
      options: {
        plugins: (loader) =>[
          require('autoprefixer')({
            browsers: ["last 2 versions", 'ie > 8']
          })
        ]
      }
  })
}

let config = {
  devtool: dev ? 'cheap-eval-source-map' :  'source-map',
  devServer: {
    hot: true
  },
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
        use: cssLoaders
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          ...cssLoaders,
          'sass-loader'
        ]
      }
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      disable: dev
    }),
    new CleanWebpackPlugin(__dirname + '/dist', { allowExternal: true }),
  ],
}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new CleanWebpackPlugin(__dirname + '/../dist', { allowExternal: true })
    )
}