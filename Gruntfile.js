module.exports = function(grunt){
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			options : {
				banner : '/* <%= pkg.name %> <%= pkg.version %>\nA cool Toolbox with some awesome tools\n Build Date : <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build : {
				src : 'dist/<%= pkg.name%><%= pkg.version%>.js',
				dest : 'dist/<%= pkg.name%><%= pkg.version%>.min.js'
			}
		}
	}) ;

};
