var growlNotificationsFiles = require('../../files.js');
var commonConfig = require('./common.conf');

module.exports = function (config) {
    commonConfig(config);

    config.set({
        files  : growlNotificationsFiles.mergeFilesFor('karma-src'),
        exclude: growlNotificationsFiles.mergeFilesFor('karma-src-exclude')
    });
};

