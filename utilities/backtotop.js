//description : Adds back to top button in sites
//label : backToTop
//group : utilities

define(['./global'], function(Toolbox){

Toolbox.backtotop = (function(Toolbox) {
	//Constructor
	var backtotop = function(){} ;

	var init = function(){

		this.button = null ;

		var defaults = {
			container : null,
			time : 1000,
			animation : 'swing',
			callback : function(){},
			icon : null,
			target : $(window),
			visibleTarget: null,
			className : "",
			size : "normal",
			position : "bottom-right"
		} ;

		var settings = {
			eventTarget : $(window),
			className : 'toolbox-top',
			custom : false
		} ;
		if(arguments[0] && typeof arguments[0] === "object"){
			this.options = extendDefaults(defaults, arguments[0]) ;
		}
		else{
			this.options = defaults ;
		}
		this.settings = settings ;

	} ;

	backtotop.prototype.create = function(){
		init.call(this, arguments[0]) ;
		if(this.options.container === null){
			this.options.container = $('<div class="toolbox-top-container"></div>') ;
			$('body').wrapInner(this.options.container) ;
		}
		else{
			this.options.container.addClass('toolbox-top-container') ;
			this.settings.custom = true ;
		}
		buildButton.call(this) ;
		initialiseEvents.call(this) ;
		visible.call(this) ;
		console.log(document.body) ;
	} ;

	var visible = function(){
		var target = this.settings.eventTarget ;
		var scrollTop = target.scrollTop() ;
		if(this.options.visibleTarget === null){
			var offset = this.settings.eventTarget.height() ;
			if(scrollTop > offset){
				this.button.removeClass('toolbox-top-hide').addClass('toolbox-top-show') ;
			}
			else{
				this.button.removeClass('toolbox-top-show').addClass('toolbox-top-hide') ;
			}
		}
		else if(typeof(this.options.visibleTarget)==='number'){
			var givenoffset = this.options.visibleTarget ;
			if(scrollTop > givenoffset){	
				this.button.removeClass('toolbox-top-hide').addClass('toolbox-top-show') ;
			}
			else{
				this.button.removeClass('toolbox-top-show').addClass('toolbox-top-hide') ;
			}
		}
		else{
			var visibleTarget = this.options.visibleTarget ;
			var visibleTargetOffset = visibleTarget.offset().top  ;
			var containerOffset = this.settings.eventTarget.offset().top ;
			var height = this.settings.eventTarget.height() ;
			var requiredScroll = visibleTargetOffset - height ;
			if(scrollTop >= requiredScroll){
				this.button.removeClass('toolbox-top-hide').addClass('toolbox-top-show') ;
			}
			else{
				this.button.removeClass('toolbox-top-show').addClass('toolbox-top-hide') ;
			}
		}
	} ;
	
	var scroll = function(){
		if(this.settings.eventTarget != this.options.container){
			$('body').animate({scrollTop : 0}, this.options.time, this.options.animation, this.options.callback) ;
		}
		else{
			this.options.container.animate({scrollTop : 0}, this.options.time, this.options.animation, this.options.callback) ;
		}
	}

	function buildButton(){
		var icon, frag, wrapper, clone ;
		if(this.options.icon === null){
			icon = $('<div></div>') ;
			icon.html("^") ;
			icon.addClass("toolbox-top-caret") ;
		} 
		else{
			icon = this.options.icon ;
		}
		icon.addClass('toolbox-top-icon') ;
		
		this.wrapper = $('<div></div>') ;
		this.wrapper.addClass('toolbox-top-wrapper') ;
		
		this.button = $('<div></div>') ;
		this.button.addClass(this.settings.className+' '+this.options.className) ;
		this.button.append(icon) ;
		$('.toolbox-top-container').wrapAll(this.wrapper) ;
		$('.toolbox-top-wrapper').append(this.button) ;
		this.options.container = $('.toolbox-top-container') ;
		this.button = $('.toolbox-top') ;
		this.wrapper = $('.toolbox-top-wrapper') ;
		if(this.settings.custom == true){
			this.settings.eventTarget = this.options.container ;
		}
		this.wrapper.width(this.settings.eventTarget.width()) ;
		setButtonSize.call(this, '') ;
		setButtonPosition.call(this, '') ;
		
	}

	function initialiseEvents(){
		var timer =0;
		var global = this ;
		
		this.button.bind('click', scroll.bind(this)) ;
		
		this.settings.eventTarget.bind('scroll', function(){
			if(!timer){
				timer = setTimeout(function(){
					visible.call(global) ;
					timer = 0 ;
				}, 60) ;
			}
		}) ;
	}
	
	function setButtonSize(old){
		if(this.options.size === "normal"){
			this.button.addClass('toolbox-top-normal') ;
		}
		else if(this.options.size === "small"){
			this.button.addClass('toolbox-top-small') ;
		}
		else if(this.options.size === "large"){
			this.button.addClass('toolbox-top-large') ;
		}
		else{
			this.button.addClass('toolbox-top-normal') ;
		}

	}

	function setButtonPosition(old){
		switch (this.options.position){
			case "bottom-right":
				if(this.settings.eventTarget != this.options.container){
					this.button.addClass('toolbox-top-bottom-right-fixed') ;
				}
				else{
					this.button.addClass('toolbox-top-bottom-right') ;
				}
				break ;
			case "bottom-left":
				if(this.settings.eventTarget != this.options.container){
					this.button.addClass('toolbox-top-bottom-left-fixed') ;
				}
				else{
					this.button.addClass('toolbox-top-bottom-left') ;
				}
				break ;
			case "top-right":
				if(this.settings.eventTarget != this.options.container){
					this.button.addClass('toolbox-top-top-right-fixed') ;
				}
				else{
					this.button.addClass('toolbox-top-top-right') ;
				}
				break ;
			case "top-left":
				if(this.settings.eventTarget != this.options.container){
					this.button.addClass('toolbox-top-top-left-fixed') ;
				}
				else{
					this.button.addClass('toolbox-top-top-left') ;
				}
				break ;
			default:
				if(this.settings.eventTarget != this.options.container){
					this.button.addClass('toolbox-top-bottom-right-fixed') ;
				}
				else{
					this.button.addClass('toolbox-top-bottom-right') ;
				}
		}
	}
	// Utility method to extend defaults with user options
	function extendDefaults(source, properties) {
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
	}

	//Toolbox.backtotop = plugin ;
	
	return backtotop ;
}(Toolbox));
}) ;
