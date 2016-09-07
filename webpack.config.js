/**
 * Webpack configuration file
 * Created by Michael DESIGAUD on 24/03/2016.
 */

//region Required tools
// Webpack core
var webpack = require('webpack');
// Used to format path
var path = require('path');
// Autoprefixer
var autoprefixer = require('autoprefixer');
// Precss
var precss       = require('precss');
// Used to merge configuration object (common + env)
var MergePlugin = require('webpack-merge');
// Used to clean build directories
var CleanWebpackPlugin = require('clean-webpack-plugin');
// Used to copy static resources
var CopyWebpackPlugin = require('copy-webpack-plugin');
// Used to generate index.html file
var HtmlWebpackPlugin = require('html-webpack-plugin');
// Type script transpilator
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
// Used to compress resources with gzip
var CompressionPlugin = require("compression-webpack-plugin");
// Deduplicate resources
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
// Uglify (minimize and aggregate) JS
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
// Order chunk to optimiser loading
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
// Group chunk in specifics files
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
//endregion

//region Project variables
// npm command --environment=(dev|prod|test)
var ENV = process.env.npm_config_environment || 'dev';
// npm environment variable
var DIST = process.env.npm_config_dist_path || './dist';
// Project name, for package
var NAME = process.env.npm_package_name;
// Project description, for title
var DESCRIPTION = process.env.npm_package_description;
// Project version, for package
var VERSION = process.env.npm_package_version;
// *****************************************************
//endregion

/**
 * Webpack configuration by environment
 */
var config = {
    //region Common configuration
    common: {
        metadata: {
            title: DESCRIPTION,
            gaId: "TODEFINE"
        },
        entry: {
            'vendor': path.resolve('./src/app/vendor.ts'),
            'app': path.resolve('./src/app/boot.ts')
        },
        output: {
            path: path.resolve(DIST),
            filename: '[name].bundle.js',
            sourceMapFilename: '[file].map',
            chunkFilename: '[name].[id].chunk.js'
        },
        resolve: {
            modulesDirectories: [path.resolve('./node_modules')],
            root:path.resolve('./src'),
            extensions: ['', '.ts', '.js'],
            alias:{
                "$":'jquery',
                "jQuery":'jquery'
            }
        },
        module: {
            preLoaders: [
                // Generate source map for debugging
                {
                    test: /\.js$/,
                    loader: 'source-map-loader',
                    // fixme : fixed with rxjs 5 beta.3 release (@from https://github.com/AngularClass/angular2-webpack-starter)
                    exclude: [
                        path.resolve('./node_modules/rxjs')
                    ]
                }
            ],
            loaders: [
                // Support for ts files.
                {
                    test: /\.ts$/,
                    loaders: ['awesome-typescript'],
                    exclude: [
                        /\.(spec|e2e)\.ts$/
                    ]
                },
                // Support for html files
                {
                    test: /\.html$/,
                    loaders: ['raw'],
                    exclude: [
                        path.resolve('./src/index.html')
                    ]
                },
                // Extract plain-ol' vanilla CSS
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader']
                },
                //Extract fonts
                { test: /\.(woff|woff2)($|\?)/,  loader: "url-loader?limit=10000&mimetype=app/font-woff" },
                { test: /\.ttf($|\?)/,    loader: "file-loader" },
                { test: /\.eot($|\?)/,    loader: "file-loader" },
                { test: /\.svg($|\?)/,    loader: "file-loader" }
            ]
        },
        plugins: [
            new ForkCheckerPlugin(),
            // Generate index.html with css and js injections
            new HtmlWebpackPlugin({
                filename: "index.html",
                inject:'head',
                template: path.resolve("./src/index.html"),
                favicon: path.resolve("./src/assets/icons/favicon.ico"),
                title: DESCRIPTION
            }),
            // Separate js files in multi package
            new webpack.optimize.CommonsChunkPlugin({
                name: ['app', 'vendor'],
                minChunks: Infinity
            }),
            new webpack.ProvidePlugin({
                "$":'jquery',
                "jQuery":'jquery',
                'window.jQuery': 'jquery',
                "hljs":'highlight.js/lib/highlight'
            }),
            // Copy static resources
            new CopyWebpackPlugin([
                {from: path.resolve('./src/assets/icons')},
                {from: path.resolve('./src/manifest.json')},
                {from: path.resolve('./src/robots.txt')}
            ])
        ]
    },
    //endregion
    //region Development configuration
    dev: {
        debug: true,
        devtool: 'cheap-module-eval-source-map',
        plugins: [
            // Clean dist directory
            new CleanWebpackPlugin([path.resolve(DIST + '/*')]),
            // Define JS global constants
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(VERSION + "-SNAPSHOT")
            })
        ],
        devServer: {
            port: 3000,
            host: 'localhost',
            inline:false,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            }
        }
    },
    //endregion
    //region Test configuration
    test: {
        devtool: 'inline-source-map',
        resolve: {
            extensions: ['', '.ts', '.js']
        },
        module: {
            preLoaders: [
                // Tslint loader support for *.ts files
                //
                // See: https://github.com/wbuchwalter/tslint-loader
                //{test: /\.ts$/, loader: 'tslint-loader', exclude: [helpers.root('node_modules')]},

                // Source map loader support for *.js files
                // Extracts SourceMaps for source files that as added as sourceMappingURL comment.
                //
                // See: https://github.com/webpack/source-map-loader
                {test: /\.js$/, loader: "source-map", exclude: [path.resolve('./node_modules/rxjs')]}
            ],
            loaders: [
                {
                    test: /\.ts$/,
                    loader: 'awesome-typescript',
                    query: {
                        "compilerOptions": {
                            "removeComments": true

                        }
                    },
                    exclude: [/\.e2e\.ts$/]
                }
            ],
            postLoaders: [

                // Instruments JS files with Istanbul for subsequent code coverage reporting.
                // Instrument only testing sources.
                //
                // See: https://github.com/deepsweet/istanbul-instrumenter-loader
                {
                    test: /\.(js|ts)$/, loader: 'istanbul-instrumenter',
                    include: path.resolve('./src'),
                    exclude: [
                        /\.(e2e|spec)\.ts$/,
                        /node_modules/
                    ]
                }

            ]
        },
        plugins: [
            // Clean reporting directory
            new CleanWebpackPlugin([path.resolve('./reports')], { verbose: false })
        ],

        node: {
            global: 'window',
            process: false,
            crypto: 'empty',
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    },
    //endregion
    //region Production configuration
    prod: {
        devtool: 'source-map',
        debug: false,
        output: {
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[name].[chunkhash].bundle.map',
            chunkFilename: '[name].[id].[chunkhash].chunk.js'
        },
        module: {
            loaders: [
                // Support for ts files.
                {
                    test: /\.ts$/,
                    loaders: ['awesome-typescript'],
                    query: {
                        'compilerOptions': {
                            'removeComments': true
                        }
                    },
                    exclude: [
                        /\.(spec|e2e)\.ts$/
                    ]
                }
            ]
        },
        plugins: [
            // Clean dist directory
            new CleanWebpackPlugin([path.resolve(DIST + '/*')]),
            // De duplicate source
            new DedupePlugin(),
            // Order chunk
            new OccurenceOrderPlugin(true),
            // Define JS global constants
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(VERSION)
            }),
            // Uglify generated js
            new UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    except: []
                },
                compress: {screw_ie8: true},
                comments: false
            }),
            // Compress generated resources
            new CompressionPlugin({
                test: /\.css$|\.html$|\.js$|\.map$/,
                threshold: 2048,
                minRatio: 0.8
            })
        ]
    }
    //endregion
};

// Load configuration for current environment
if (ENV === 'test') {
    module.exports = config[ENV];
} else {
    module.exports = MergePlugin(config['common'], config[ENV]);
}