module.exports = function (config) {
    config.set({
        basePath      : '../../',
        frameworks    : ['jasmine'],
        plugins       : [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher'
        ],
        exclude       : [],
        reporters     : ['dots'],
        port          : 9876,
        runnerPort    : 9100,
        colors        : true,
        logLevel      : config.LOG_INFO,
        autoWatch     : true,
        browsers      : ['PhantomJS'],
        captureTimeout: 60000,
        singleRun     : false
    });
};
