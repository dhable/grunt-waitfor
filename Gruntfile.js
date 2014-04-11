/*
 * grunt-waitfor
 * https://github.com/dhable/projects
 *
 * Copyright (c) 2014 Dan Hable
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // TODO: How the heck should this be tested?
  grunt.registerTask('test', []);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
