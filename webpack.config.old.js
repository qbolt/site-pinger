'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devtool = 'source-map'

const devServer = {
  historyApiFallback: true
}

const entry = {
  main: [
    'babel-polyfill',
    './src/main'
  ],
}

const output = {
  filename: '[name].js',
  path: __dirname + '/dist',
  publicPath: '/'
}

const extensions = [
  '.js',
  '.ts',
  '.css',
  '.html'
]

const modules = [
  'node_modules',
  'lib'
]

const rules = [{
  test: /.ts$/,
  exclude: /node_modules/,
  loaders: ['ts-loader']
}, {
  test: /.js$/,
  exclude: /node_modules/,
  loaders: ['babel-loader']
}, {
  test: /.css$/,
  loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
}, {
  test: /.html$/,
  exclude: /node_modules/,
  include: /static/,
  loader: 'html-loader'
}, {
  test: /.(ico|png|eot|svg|ttf|woff|woff2)$/,
  loader: 'url?limit=10000'
}]

const plugins = [
  new ExtractTextPlugin('[name].css'),
  new HtmlWebpackPlugin({
    hash: true,
    inject: 'head',
    template: 'static/index.html'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  })
]

module.exports = {
  devtool,
  devServer,
  entry,
  output,
  resolve: {
    extensions,
    modules
  },
  module: {
    rules
  },
  plugins
}
