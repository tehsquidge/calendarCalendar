module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		uglify: {
			my_target: {
				files: {
					'calendarCalendar.jquery.min.js': ['calendarCalendar.jquery.js']
				}
			}
		},
		watch: {
			style: {
				files: ["calendarCalendar.jquery.js"],
				tasks: ["uglify"]
      			}
		}
	});

	grunt.registerTask('default', ['watch']);

};
