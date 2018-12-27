const path = require('path')
const webpack = require('webpack')
const pluginsConfig = require("./webpack.plugins.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const dev = false;

//CSS LOADER

let cssLoaders = [
  dev ? {loader: 'style-loader',options: { sourceMap: true, convertToAbsoluteUrls: true,} } :  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader'
  }
]
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
  })
}



//START CONFIG
let config = {
  devtool: dev ? 'cheap-eval-source-map' : false,

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    host: "localhost",
    port: "8090",
    open: true,
    hot: true,

  },
  watch: true,
  entry: {
    app: ['./src/assets/scss/app.scss', './src/app.js'],
    page2: ['./src/assets/scss/pages/page2.scss', './src/assets/scripts/page2.js']
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
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
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
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
            },

          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[hash:7].[ext]',
            limit: 8192
          },
        }, ],
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