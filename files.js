growlNotificationsFiles = {
    karma              : [
        'bower/angular/angular.js',
        'bower/angular-mocks/angular-mocks.js'
    ],
    'karma-dist'       : [
        '@karma',
        'dist/growl-notifications.js',
        '@karma-tests'
    ],
    'karma-dist-min'   : [
        '@karma',
        'dist/growl-notifications.min.js',
        '@karma-tests'
    ],
    'karma-src-exclude': [
        'src/growlNotifications/growlNotifications.prefix',
        'src/growlNotifications/growlNotifications.suffix'
    ],
    'karma-src'        : [
        '@karma',
        'src/growlNotifications/growlNotifications.js',
        'src/**/*.js',
        '@karma-tests'
    ],
    'karma-tests'      : [
        'test/unit/**/*.js'
    ]
};

if (exports) {
    exports.files = growlNotificationsFiles;
    exports.mergeFilesFor = function () {
        var files = [];

        Array.prototype.slice.call(arguments, 0).forEach(function (filegroup) {
            growlNotificationsFiles[filegroup].forEach(function (file) {
                // replace @ref
                var match = file.match(/^\@(.*)/);
                if (match) {
                    files = files.concat(growlNotificationsFiles[match[1]]);
                } else {
                    files.push(file);
                }
            });
        });

        return files;
    };
}
