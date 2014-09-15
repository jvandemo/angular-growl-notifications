module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ''
      },
      library: {
        src: [
          'src/growlNotifications/growlNotifications.js',
          'src/growlNotifications/directives/**/*.js',
          'src/growlNotifications/services/**/*.js'
        ],
        dest: 'dist/angular-growl-notifications.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      library: {
        files: {
          'dist/angular-growl-notifications.min.js': ['<%= concat.library.dest %>']
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

    watch: {
      options: {
        livereload: true
      },
      files: [
        'Gruntfile.js',
        'src/**/*'
      ],
      tasks: ['default']
    }

  });

  grunt.registerTask('default', ['jshint:beforeConcat', 'concat', 'jshint:afterConcat', 'uglify']);
  grunt.registerTask('livereload', ['default', 'watch']);

};
