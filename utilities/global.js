define(function(){
	var Toolbox = function(){
		this.id = 1 ;
	} ;
	Toolbox.prototype.extendDefaults = function(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				if(property === 'className'){
					source[property] += properties[property] ;
				}
				else{
					source[property] = properties[property];
				}
			}
		}
		return source;
	} ;

	return new Toolbox() ;
}) ;
