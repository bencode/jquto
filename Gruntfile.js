module.exports = function (grunt) {

  "use strict";

  var gzip = require("gzip-js");
  var pkg = grunt.file.readJSON("package.json");

  grunt.initConfig({
    pkg: pkg,
    jshint: {
      dist: {
        src: [ "build/<%= pkg.name %>.js" ],
        options: {
          jshintrc: "src/.jshintrc"
        }
      },
      grunt: {
        src: [ "Gruntfile.js" ],
        options: {
          jshintrc: "src/.jshintrc"
        }
      }
    },
    compare_size: {
      files: [ "dist/<%= pkg.name %>-debug.js", "dist/<%= pkg.name %>.js" ],
      options: {
        compress: {
          gz: function (contents) {
            return gzip.zip(contents, {}).length;
          }
        }
      }
    },
    concat: {
      build: {
        dest: "build/jquto.js",
        src: [
          "src/intro.js",
          "src/core.js",
          "src/selector-native.js",
          "src/callbacks.js",
          "src/deferred.js",
          "src/support.js",
          "src/data.js",
          "src/queue.js",
          "src/attributes.js",
          "src/event.js",
          "src/traversing.js",
          "src/manipulation.js",
          "src/css.js",
          "src/serialize.js",
          "src/ajax.js",
          "src/ajax/script.js",
          "src/ajax/jsonp.js",
          "src/ajax/xhr.js",
          "src/offset.js",
          "src/dimensions.js",
          "src/zepto/fx.js",
          "src/zepto/fx_methods.js",
          "src/zepto/touch.js",
          "src/exports.js",
          "src/outro.js"
        ]
      }
    },
    uglify: {
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    transport: {
      all: {
        files: [
          {
            cwd: 'build',
            src: '*.js',
            dest: 'dist'
          }
        ]
      }
    }
  });

  grunt.registerTask('replace', function () {
    var data = grunt.file.read('build/jquto.js');
    data = data.replace(/@VERSION/g, pkg.version)
      .replace("@DATE", function () {
        // YYYY-MM-DD
        return ( new Date() ).toISOString().replace(/T.*/, "");
      });
    grunt.file.write('build/jquto.js', data);
  })

  // Load grunt tasks from NPM packages
  grunt.loadNpmTasks("grunt-cmd-transport");
  grunt.loadNpmTasks("grunt-compare-size");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-concat");

  // Default grunt
  grunt.registerTask("build", ["concat", "replace", "transport", "uglify", "compare_size" ]);
  grunt.registerTask("default", ["build"]);
};
