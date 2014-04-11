/*
 * grunt-waitfor
 * https://github.com/dhable/grunt-waitfor
 *
 * Copyright (c) 2014 Dan Hable
 * Licensed under the MIT license.
 */

'use strict';

var fork = require("child_process");

module.exports = function(grunt) {

   grunt.registerMultiTask('waitfor', 'Block task execution until a condition passes.', function() {
      var child,
          options,
          errorTimer,
          executeTimer,
          done = this.async(),
          cmd = this.data.cmd;

 
      options = this.options({
         exitCode: 0,
         timeout: 60000,
         delay: 1000,
         verbose: false
      });


      errorTimer = setTimeout(function() {
         clearTimeout(executeTimer);
         grunt.log.error("waitFor hit max error timeeout without success.");
         done(false);
      }, options.timeout);


      grunt.verbose.subhead("Waiting until %s is successful.", cmd);
      function executeTask() {
         grunt.verbose.writeln("Attempting cmd execution");
         child = fork.exec(cmd);

         if(options.verbose) {
            child.stdout.on("data", function(data) { grunt.log.write(data); });
            child.stderr.on("data", function(data) { grunt.log.error(data); });
         }

         child.on("exit", function(code) {
            if(code == options.exitCode) {
               clearTimeout(errorTimer);
               return done();
            }
            executeTimer = setTimeout(executeTask, options.delay);
         });
      }
      executeTask();
   });

};
