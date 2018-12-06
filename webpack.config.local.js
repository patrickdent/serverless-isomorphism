const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

const shared = {
  mode: 'development',
  watch: true,
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
  }
}

// This configuration runs our local server for us and enable hot module
// reloading while we are developing.
const server = {
  ...shared,
  entry: [
      'webpack/hot/poll?1000',
      './local/server'
  ],
  target: 'node',
  externals: [nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
  })],
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

// This configuration bundles up our React app so that it can be served to the
// browser.
var browser = {
  ...shared,
  entry: './src/browser.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'browser.js'
  }
}

module.exports = [server, browser]
