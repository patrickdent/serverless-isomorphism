const path = require('path')
const webpack = require('webpack')
const nodeExternals = require("webpack-node-externals")

module.exports =  {
  target: 'node',
  node: {
    __dirname: false
  },
  entry: ['./index.js'],
  externals: [nodeExternals()],
  output: {
    libraryTarget: "commonjs",
    filename: 'index.js'
  },
  mode: "development",
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
