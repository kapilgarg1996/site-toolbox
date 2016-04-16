//description : Main Toolbox which holds all the tools

define(['./global', './backtotop'], function(Toolbox, backtotop){

(function(Toolbox){
	
	Toolbox.tools = [] ;	
	Toolbox.addTool = function(){
		console.log(arguments[0]) ;
		var tool = backtotop(arguments[0]) ;
		Toolbox.tools.push(tool) ;
		return tool ;
	} ;

	Toolbox.removeTool = function(){

	} ;

	return Toolbox ;
}(Toolbox)) ;

}) ;
