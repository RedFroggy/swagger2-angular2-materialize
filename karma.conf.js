/**
 * Karma configuration file
 * Created by Michael DESIGAUD on 14/04/2016.
 */

var path = require('path');

module.exports = function(config) {
    var testWebpackConfig = require('./webpack.config.js');
    config.set({

        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files to exclude
        exclude: [ ],

        reporters: ['junit','html', 'coverage'],

        junitReporter: {
            outputDir: 'reports/junit',
            outputFile: 'test-results.xml',
            useBrowserName: false
        },
        htmlReporter: {
            outputDir: 'reports/html', // where to put the reports
            templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: true, // reports show failures on start
            namedFiles: false, // name files instead of creating sub-directories
            pageTitle: null, // page title for reports; browser info by default
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
            reportName: 'html_report', // report summary filename; browser info by default
            // experimental
            preserveDescribeNesting: false, // folded suites stay folded
            foldAll: false // reports start folded (only with preserveDescribeNesting)
        },

        // list of files / patterns to load in the browser
        // we are building the test environment in ./spec-bundle.js
        files: [
            { pattern: 'node_modules/jquery/dist/jquery.js', watched: false},
            { pattern: 'node_modules/materialize-css/dist/js/materialize.js', watched: false},
            { pattern: 'spec-bundle.js', watched: false }
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
        },

        // Webpack Config at ./webpack.test.config.js
        webpack: testWebpackConfig,

        coverageReporter: {
            dir : 'coverage/',
            reporters: [
                { type: 'text-summary', subdir: 'report-text' },
                { type: 'json', subdir: 'report-json' },
                { type: 'html', subdir: 'report-html' },
                { type: 'cobertura', subdir: 'report-cobertura' },
                { type: 'lcovonly', subdir: 'report-lcov', file: 'coverage.lcov' }
            ]
        },

        // Webpack please don't spam the console when running in karma!
        webpackServer: { noInfo: true },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        //reporters: [ 'mocha', 'coverage' ],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'PhantomJS'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });

};