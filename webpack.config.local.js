const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

module.exports = {
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
            test: /\.js?$/,
            loader: 'babel-loader',
            options: {
              presets: ["@babel/react", ["@babel/preset-env", {"modules": false}]]
            },
            exclude: /node_modules/
        }
      ]
    },
    plugins: [
        new StartServerPlugin('server.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify('server')
            }
        })
    ],
    output: {
        path: path.join(__dirname, '.build'),
        filename: 'server.js'
    }
}
