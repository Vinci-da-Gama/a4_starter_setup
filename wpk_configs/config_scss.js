var nPath = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    module: {
        loaders: 
        [
            {
                test: /\.css$/,
                exclude: nPath.resolve('src/app'),
                loader: ExtractTextPlugin.extract('css-loader')
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, 
                exclude: nPath.resolve('./src'),
                loader: 'file-loader?name=fonts/[name]-[hash:6].[ext]'
            },
            {
                test: /\.scss/,
                exclude: /node_modules/,
                loader: 'raw-loader!sass-loader?sourceMap'
            }
        ]
    }
}
