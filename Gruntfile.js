module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/js/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    uglify: {
      min: {
        files: {
          'src/min/main.min.js': ['src/js/main.js']
        }
      }
    },
    cssmin: {
      min: {
        files: {
          'src/min/main.min.css': ['src/css/main.css']
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Register tasks
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'watch']);

};
