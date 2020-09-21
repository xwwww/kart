const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.base.js')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const PORT = process.env.PORT && Number(process.env.PORT)
const HOST = process.env.HOST

console.log(PORT)
const devWebpackConfig = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: HOST || 'localhost',
    port: PORT || 8090,
    hot: true,
    historyApiFallback: true
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {}
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || 8090
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${
                devWebpackConfig.devServer.host
              }:${port}`
            ]
          }
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
