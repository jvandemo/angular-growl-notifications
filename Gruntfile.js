module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    var files = require('./files').files;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ''
            },
            library: {
                src: [
                    'src/growlNotifications/growlNotifications.prefix',
                    'src/growlNotifications/growlNotifications.js',
                    'src/growlNotifications/directives/**/*.js',
                    'src/growlNotifications/filters/**/*.js',
                    'src/growlNotifications/services/**/*.js',
                    'src/growlNotifications/growlNotifications.suffix'
                ],
                dest: 'dist/growl-notifications.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            jid: {
                files: {
                    'dist/growl-notifications.min.js': ['<%= concat.library.dest %>']
                }
            }
        },
        jshint: {
            beforeConcat: {
                src: ['gruntfile.js', 'growlNotifications/**/*.js']
            },
            afterConcat: {
                src: [
                    '<%= concat.library.dest %>'
                ]
            },
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    angular: true
                },
                globalstrict: false
            }
        },
        connect: {
            server: {
                options: {
                    port      : 9000,
                    base      : './',
                    hostname  : 'localhost',
                    keepalive : true,
                    livereload: true
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            files: [
                'Gruntfile.js',
                'src/**/*'
            ],
            tasks: ['default']
        },
        karma: {
          unit: {
            browsers: [ grunt.option('browser') || 'PhantomJS' ],
            configFile: 'config/karma/src.conf.js',
            singleRun: true
          },
          debug: {
            singleRun: false,
            background: false,
            configFile: 'config/karma/src.conf.js',
            browsers: [ grunt.option('browser') || 'Chrome' ]
          },
          dist: {
            browsers: [ grunt.option('browser') || 'PhantomJS' ],
            configFile: 'config/karma/dist.conf.js',
            singleRun: true
          },
          'dist-min': {
            browsers: [ grunt.option('browser') || 'PhantomJS' ],
            configFile: 'config/karma/dist.min.conf.js',
            singleRun: true
          }
        }
    });

    grunt.registerTask('default', ['karma:unit', 'jshint:beforeConcat', 'concat', 'jshint:afterConcat', 'karma:dist', 'uglify', 'karma:dist-min']);
    grunt.registerTask('serve', ['connect']);
    grunt.registerTask('livereload', ['default', 'watch']);

};
