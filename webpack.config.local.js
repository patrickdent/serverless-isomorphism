const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

const server = {
  entry: [
      'webpack/hot/poll?1000',
      './local/server'
  ],
  watch: true,
  mode: 'development',
  target: 'node',
  externals: [nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
  })],
  module: {
      rules: [{
          test: /\.jsx?$/,
          loader: 'babel-loader',
          options: {
            presets: ["@babel/react", ["@babel/preset-env", {"modules": false}]]
          },
          exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
      new StartServerPlugin('cloud.js'),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
          "process.env": {
              "BUILD_TARGET": JSON.stringify('cloud')
          }
      })
  ],
  output: {
      path: path.join(__dirname, 'build'),
      filename: 'cloud.js'
  }
}

var browser = {
  entry: './src/browser.js',
  watch: true,
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'browser.js'
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: ["@babel/react", ["@babel/preset-env", {"modules": false}]]
      },
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  stats: 'errors-only'
}

module.exports = [server, browser]
