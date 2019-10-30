const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode : 'production',
  entry : {
    app : path.resolve(__dirname,'src/index.js'),
  },
  output : {
    path : path.resolve(__dirname,'dist'),
    filename : 'js/app.js',
    // publicPath : './'
  },
  optimization : {
      minimizer :  [
        new TerserPlugin()
      ]
 },
  module : {
    rules : [
      {
        test : /js$/,
        exclude : /node_modules/,
        use : {
          loader : 'babel-loader'
        }
      },
      {
        test : /css$/,
        use : [{
          loader : miniCssExtractPlugin.loader
        },'css-loader']
      }
    ]
  },
  plugins : [
    new miniCssExtractPlugin({
      filename : 'css/app.css'
    }),
    new HtmlWebpackPlugin({
      template : path.resolve(__dirname,'src/index.html'),
      filename :'./index.html'
    })
  ]
}