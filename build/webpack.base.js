const webpack = require('webpack')
const path = require('path')
const sass = require('sass')
const Fiber = require('fibers')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    alias: {
      'vue': '@vue/runtime-dom',
      'vuex': 'vuex/dist/vuex.esm-bundler',
      '@': resolve('src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 5000,
              name: 'imgs/[hash].[ext]'
            }
          }
        ]
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sassOptions: {
                fiber: Fiber,
              }
            }
          },
          'postcss-loader'
        ]
      }
    ]
  }
}