module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.initConfig({
		uglify: {
			my_target: {
				files: {
					'public/javascripts/script.js': ['_/js/*.js']
				}
			}
		},
		compass: {
			dev: {
				options: {
					config: 'config.rb'
				} 
			} 
		}, 
		watch: {
			scripts: {
				files: ['_/js/*.js'],
				tasks: ['uglify']				
			},
			sass: {
				files: ['_/sass/*.scss'],
				tasks: ['compass:dev']
			}
		}
	})
	grunt.registerTask('default', 'watch');
}