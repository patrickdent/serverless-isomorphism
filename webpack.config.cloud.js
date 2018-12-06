const path = require('path')
const webpack = require('webpack')
const nodeExternals = require("webpack-node-externals")

const shared = {
  mode: 'production',
  module: {
      rules: [{
        test: /.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/react']
            }
          }
        ]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}

const cloud = {
  ...shared,
  target: 'node',
  node: {
    __dirname: false
  },
  entry: './src/cloud.jsx',
  externals: [nodeExternals()],
  output: {
    libraryTarget: "commonjs",
    filename: 'index.js'
  },
}

// This configuration bundles up our React app so that it can be served to the
// browser.
var browser = {
  ...shared,
  entry: './src/browser.jsx',
  output: {
    filename: 'browser.js'
  }
}

module.exports = [cloud, browser]
