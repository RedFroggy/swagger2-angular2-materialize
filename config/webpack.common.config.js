/**
 * Webpack common configuration
 * Created by mdesigaud on 16/11/2016.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'vendor': './src/app/vendor.ts',
        'app': './src/app/boot.ts'
    },

    resolve: {
        extensions: ['','.ts', '.js']
    },

    module: {
        preLoaders: [
            // Generate source map for debugging
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [helpers.root('./node_modules/rxjs'), helpers.root('./node_modules/jquery')]
            }
        ],
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.json$/, loader: 'json-loader'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file?name=assets/[name].[hash].[ext]?limit=100000'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw'
            },
            {
                test: /materialize-css\/bin\//,
                loader: 'imports?jQuery=jquery, $=jquery'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor']}),
        new HtmlWebpackPlugin({template: 'src/index.html'}),
        new webpack.ProvidePlugin({
            "$":'jquery',
            "jQuery":'jquery',
            "window.jQuery": "jquery",
            "root.jQuery": "jquery",
            "hljs":'highlight.js/lib/highlight'
        })
    ]
};