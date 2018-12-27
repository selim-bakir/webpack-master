 const HtmlWebpackPlugin = require('html-webpack-plugin')
 const CleanWebpackPlugin = require('clean-webpack-plugin')
 const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
 const MiniCssExtractPlugin = require("mini-css-extract-plugin")
 var LiveReloadPlugin = require('webpack-livereload-plugin');

 module.exports = [
     new HtmlWebpackPlugin({
         filename: 'index.html',
         template: 'src/index.html',
         chunks: ['app']
     }),
     new HtmlWebpackPlugin({
         filename: 'page2.html',
         template: 'src/page2.html',
         chunks: ['page2']
     }),
     new MiniCssExtractPlugin({
         filename: "[name].css",
     }),
     new CleanWebpackPlugin(__dirname + '../../dist', {
         allowExternal: true
     }),
     new FriendlyErrorsWebpackPlugin(),
 ]