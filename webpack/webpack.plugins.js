 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 const LiveReloadPlugin = require('webpack-livereload-plugin');
 const NotifierPlugin = require('friendly-errors-webpack-plugin');
 const notifier = require('node-notifier');
 const ICON = path.resolve(__dirname, 'icon.png');

 module.exports = [
     new HtmlWebpackPlugin({
         filename: 'index.html',
         template: 'src/index.html',
         chunks: ['index']
     }),
     new HtmlWebpackPlugin({
         filename: 'page2.html',
         template: 'src/page2.html',
         chunks: ['page2']
     }),
     new MiniCssExtractPlugin({
         filename: "css/[name].css",
     }),
     new CleanWebpackPlugin(__dirname + '../../dist', {
         allowExternal: true
     }),
     new FriendlyErrorsWebpackPlugin(),
     new LiveReloadPlugin(),
     new NotifierPlugin({
        onErrors: (severity, errors) => {
          if (severity !== 'error') {
            return;
          }
          const error = errors[0];
          notifier.notify({
            title: "Webpack error",
            message: severity + ': ' + error.name,
            subtitle: error.file || '',
            icon: ICON
          });
        }
      }),
    
 ];