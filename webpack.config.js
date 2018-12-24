const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const dev = process.env.NODE_ENV === 'dev'

module.exports = {
    entry : './assets/js/app.js',
    watch: true,
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
    plugins : [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // new ExtractTextPlugin({
        //     filename: '[name].css',
        //     disable : dev
        // })
    ]
}