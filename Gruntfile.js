module.exports = function(grunt){
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['css/**/*.css'],
				dest: 'dist/<%= pkg.name%><%= pkg.version%>.css'
			}
		},
		uglify : {
			js:{
				options : {
					banner : '/* <%= pkg.name %> <%= pkg.version %>\nA cool Toolbox with some awesome tools\n Build Date : <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				build : {
					src : 'dist/<%= pkg.name%><%= pkg.version%>.js',
					dest : 'dist/<%= pkg.name%><%= pkg.version%>.min.js'
				}
			},
			css:{
				options : {
					banner : '/* <%= pkg.name %> <%= pkg.version %>\nCSS file for Toolbox\n Build Date : <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				build : {
					src : 'dist/<%= pkg.name%><%= pkg.version%>.css',
					dest : 'dist/<%= pkg.name%><%= pkg.version%>.min.css'
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					name: '../external/almond',
					baseUrl: "utilities",
					include: ['init'],
					out: 'dist/<%= pkg.name%><%= pkg.version%>.js',
					optimize : 'none',
					wrap : {
						startFile : 'build/buildstart.js',
						endFile : 'build/buildend.js'
					}
				}
			},
			alone: {
				options: {
					baseUrl: "utilities",
					name: 'init',
					out: 'dist/<%= pkg.name%>-alone<%= pkg.version%>.min.js',
				}
				
			}
		}
	}) ;
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['requirejs', 'concat', 'uglify']);

};
