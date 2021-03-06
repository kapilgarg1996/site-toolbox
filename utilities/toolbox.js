//description : Main Toolbox which holds all the tools

define(['./global', './backtotop', './prefetcher'], function(Toolbox){

(function(Toolbox){
	Toolbox.tools = {} ;

	Toolbox.addTool = function(tool_id, tooltype, tool_config){
		console.log(tool_id, tooltype, tool_config) ;
		tool_config = tool_config || {} ;
		if(this.tools[tool_id] != undefined){
			if(this.tools[tool_id].tooltype === tooltype){
				this.tools[tool_id].tool.modify(tool_config) ;
				this.tools[tool_id].tool_config = tool_config ;
				return this.tools[tool_id].tool ;
			}
			else{
				throw 'Cannot assign same id to different tooltype' ;
				return ;
			}
		}
		var tool = this[tooltype] ;
		var addtool = new tool() ;
		addtool.create(tool_config) ;
		var tool_info = {
			id : tool_id,
			tooltype : tooltype,
			tool_config : tool_config,
			tool : addtool
		} ;
		Toolbox.tools[tool_id] = tool_info ;
		return addtool ;
	} ;

	Toolbox.removeTool = function(tool_id){
		delete Toolbox.tools[tool_id]
	} ;

	return Toolbox ;
}(Toolbox)) ;

}) ;
