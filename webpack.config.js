const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry : {
    app : path.resolve(__dirname,'src/index.js'),
  },
  output : {
    path : path.resolve(__dirname,'dist'),
    filename : 'js/app.js',
    publicPath : '/'
  },
  devServer : {
    port : 8000,
    contentBase : path.resolve(__dirname,'dist'),
    hot : true
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
        use : ['style-loader','css-loader']
      }
    ]
  },
  plugins : [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template : path.resolve(__dirname,'src/index.html'),
      filename :'./index.html'
    })
  ]
}