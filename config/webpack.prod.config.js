/**
 * Webpack prod configuration
 * Created by mdesigaud on 16/11/2016.
 */
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var commonConfig = require('./webpack.common.config.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    debug: false,
    output: {
        path: helpers.root('dist'),
        publicPath: '',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    htmlLoader: {
        minimize: false // workaround for ng2
    },

    plugins: [
        // Clean dist directory
        new CleanWebpackPlugin([helpers.root('dist')]),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        /*new webpack.optimize.UglifyJsPlugin({ // Does not work for now
            mangle: {
                keep_fnames: true
            }
        }),*/
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
});