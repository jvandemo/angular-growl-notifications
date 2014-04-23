var growlNotificationsFiles = require('../../files');
var commonConfig = require('./common.conf');

module.exports = function (config) {
    commonConfig(config);

    config.set({
        files: growlNotificationsFiles.mergeFilesFor('karma-dist-min')
    });
};
