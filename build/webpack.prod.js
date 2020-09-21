const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.base')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssertsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        }
      }
    },
    minimizer: [
      new OptimizeCssAssertsPlugin({}),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          wranings: false,
          output: {
            comments: false
          }
        }
      })
    ],
  },
  module: {
    rules: [{
      test: /\.(gif|png|jpe?g|svg)$/i,
      loader: 'file-loader',
      options: {
        name: 'images/[name].[ext]'
      }
    }]
  }
})