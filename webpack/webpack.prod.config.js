const path = require('path')
const webpack = require('webpack')
const pluginsConfig = require("./webpack.plugins.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

let cssLoaders =  [
   MiniCssExtractPlugin.loader,
  {loader : 'css-loader'},
  {loader : 'postcss-loader',
    options: {
      plugins: (loader) =>[
        require('autoprefixer')({
          browsers: ["last 2 versions", 'ie > 8']
        })
      ]
    }
  }
]

let config = {
  devtool: 'source-map',

  entry:  {
    app: ['./src/assets/scss/app.scss', './src/app.js'],
    page2: ['./src/assets/scss/page2.scss', './src/assets/scripts/page2.js']
},
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
        test: /\.scss$/,
        use: [
          ...cssLoaders,
          {
          loader: 'sass-loader',
            options: {
              sourceMap: true,
              include: __dirname + './node_modules/flexboxgrid'
            },
           
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:7].[ext]',
              limit: 8192
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: pluginsConfig,
}

module.exports = config;
