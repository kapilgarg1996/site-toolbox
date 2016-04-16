//description : Main Toolbox which holds all the tools

define(['./backtotop'], function(backtotop){

var Toolbox = (function(){
	var Toolbox = {} ;
	var tools = [] ;	
	Toolbox.addTool = function(){
		console.log(arguments[0]) ;
		var tool = backtotop(arguments[0]) ;
		Toolbox.backtotop = tool ;
		return tool ;
	} ;

	Toolbox.removeTool = function(){

	} ;

	return Toolbox ;
}()) ;

return Toolbox ;

}) ;
