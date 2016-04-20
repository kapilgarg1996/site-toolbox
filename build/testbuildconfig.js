({
    baseUrl: '.',
	name : '../external/almond.js',
	include : ['init'],
	optimize : 'uglify',
    out: 'toolbox-build.min.js', //The output file
	wrap : {
		startFile : 'buildstart.js',
		endFile : 'buildend.js'
	}
    
})
