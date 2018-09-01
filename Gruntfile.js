module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-run');
	grunt.initConfig({
		run: {
			spider: {
				options: {},
				exec: 'node ./spider/'
			}
		}
	});
	grunt.registerTask('spider', [ 'run:spider' ]);
};