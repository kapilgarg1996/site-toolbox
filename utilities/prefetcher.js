define(['./global'], function(Toolbox){
	Toolbox.prefetcher = (function(Toolbox){
		
		var prefetcher = function(){
		} ;
		
		var init = function(){
			var defaults = {
				trigger : null,
				url : null,
				target : 'body',
				timeout : 10000,
				container : 'body',
				loader : true,
				multipage : false
			} ;

			this.settings = {
				pageLoaded : false,
				contentChanged : false,
				oldContent : [],
				newContent : null,
				newTitle : '',
				error : false,
				eventTriggered : false,
			} ;

			if(arguments[0] && typeof arguments[0] === 'object'){
				this.options = Toolbox.extendDefaults(defaults, arguments[0]) ;
			}
			else{
				throw 'Prefetcher needs the required parameters' ;
			}
			this.settings.oldContent.push($(this.options.container).html()) ;
			initialiseEvents.call(this) ;
			loadPage.call(this) ;
		} ;

		var loadPage = function(){
			var global = this ;
			$.ajax({
				url : global.options.url,
				dataType : 'html',
				timeout : global.options.timeout,
				success : function(data){
					global.settings.pageLoaded = true ;
					global.settings.newContent = data ;
				},
				error : function(xhr, rstatus, error){
					global.settings.error = true ;
				},
				complete : function(xhr, rstatus){
					requestCompleted.call(global) ;
				}
			});
		} ;
		
		var changePage = function(){
			filterTarget.call(this) ;
			$(this.options.container).html('') ;
			$(this.options.container).append(this.settings.newContent) ;
			if(this.options.multipage){
				this.settings.pageLoaded = false ;
				this.settings.error = false ;
				this.settings.eventTriggered = false ;
				this.settings.contentChanged = false ;
				this.settings.newContent = null ;
				init.call(this) ;
			}
		} ;
		
		var filterTarget = function(){
			var content = this.settings.newContent ;
			var filtered = $(content).find(this.options.target) ;
			this.settings.newContent = filtered ;
		} ;

		var showLoader = function(){
			var overlay, loader ;
			var width, height, otop, oleft, loadertop, loaderleft, loaderpos ;
			otop = $(this.options.container).offset().top ;
			oleft = $(this.options.container).offset().left ;
			width = $(this.options.container).width() ;
			height = $(this.options.container).height() ;
			loadertop = $(container).height() > $(window).height() ? $(window).height() : $(container).height() ;
			loaderleft = $(container).width() > $(window).width() ? $(window).width() : $(container).width() ;
			loaderpos = $(container).height() > $(window).height() ? 'fixed' : 'absolute' ;
			loaderleft = loaderleft/2 ;
			loadertop = loadertop/2 ;

			overlay = $('<div></div>') ;
			overlay.css({'width': width, 'height': height, 'position':'absolute', 'top':otop, 'left': oleft}) ;
			overlay.addClass('toolbox-fetcher-overlay') ;

			loader = $('<div></div>') ;
			loader.css({'position':loaderpos, 'top':loadertop, 'left':loaderleft, 'z-index':1000}) ;
			loader.addClass('toolbox-fetcher-loader') ;
			loader.append("<div class='toolbox-fetcher-loader-hand'></div>") ;
			overlay.append(loader) ;
			$(this.options.container).after(overlay) ;
		} ;

		var hideLoader = function(){
			var overlay = $('.toolbox-fetcher-overlay') ;
			overlay.remove() ;
		} ;

		var fallback = function(){
			window.location.assign(this.options.url) ;
		} ;

		var clickHandler = function(){
			this.settings.eventTriggered = true ;
			if(this.settings.pageLoaded){
				changePage.call(this) ;
			}
			else{
				if(this.settings.error){
					fallback.call(this) ;
				}
				else{
					if(this.options.loader){
						showLoader.call(this) ;
					}
				}
			}
		}
		
		var requestCompleted = function(){
			if(this.settings.eventTriggered){
				if(this.settings.error){
					if(this.options.loader){
						hideLoader.call(this) ;
					}
					fallback.call(this) ;
				}
				else{
					if(this.options.loader){
						hideLoader.call(this) ;
					}
					changePage.call(this) ;
				}
			}
		} ;

		var initialiseEvents = function(){
			var global = this ;
			console.log(this.options.trigger) ;
			$(this.options.trigger).bind('click', clickHandler.bind(global)) ;
		} ;

		prefetcher.prototype.create = function(){
			init.call(this, arguments[0]) ;
		} ;
		
		prefetcher.prototype.start = function(){
			loadPage.call(this) ;
		} ;

		return prefetcher ;
	}(Toolbox)) ;
});
