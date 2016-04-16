//description : Adds back to top button in sites
//label : backToTop
//group : utilities

define(['./global'], function(Toolbox){

var backtotop = (function(Toolbox) {
	//Constructor
	var plugin = function(){} ;

	var init = function(arguments){

		this.button = null ;

		var defaults = {
			content: null,
			container : null,
			speed : 'normal',
			icon : null,
			target : null,
			visibleTarget: null,
			autoHide : true,
			className : "toolbox-top",
			size : "normal",
			position : "bottom-right"
		} ;

		var settings = {
			eventTarget : window,	
		} ;
		if(arguments[0] && typeof arguments[0] === "object"){
			this.options = extendDefaults(defaults, arguments[0]) ;
		}
		else{
			this.options = defaults ;
		}
		this.settings = settings ;

	} ;

	plugin.prototype.create = function(arguments){
		init.call(this, arguments) ;
		console.log(this.options) ;
		if(this.options.container === null){
			this.options.container = document.createElement('div') ;
			while(document.body.firstChild){
				this.options.container.appendChild(document.body.firstChild) ;
			}
			document.body.appendChild(this.options.container) ;
		}
		else{
			this.settings.eventTarget = this.options.container ;
		}
		if(this.options.target === null){
			this.options.target = this.settings.eventTarget ;
		}
		buildButton.call(this) ;
		initialiseEvents.call(this) ;
		visible.call(this) ;
	} ;
	var visible = function(){
		if(this.settings.eventTarget === window){
			visibleContainer.call(this) ;
		}
		else{
			visibleContainer.call(this) ;
		}
	}
	var visibleContainer = function(){
		var target = this.settings.eventTarget ;
		var scrollTop = (target.scrollTop === undefined ?  target.pageYOffset : target.scrollTop) ;
		if(this.options.visibleTarget === null){
			var offset = (this.settings.eventTarget.offsetHeight === undefined ? this.settings.eventTarget.outerHeight : this.settings.eventTarget.offsetHeight);
			if(scrollTop > offset){
              
              if(this.button.className.indexOf("toolbox-top-hide")>-1){
				
                this.button.className = this.button.className.replace("toolbox-top-hide", "toolbox-top-show") ;
				}
				else if(this.button.className.indexOf("toolbox-top-show")===-1){
					this.button.className += " toolbox-top-show" ;
				}
			}
			else{
				if(this.button.className.indexOf("toolbox-top-show")>-1){
					this.button.className = this.button.className.replace("toolbox-top-show", "toolbox-top-hide") ;
				}
				else if(this.button.className.indexOf("toolbox-top-hide")===-1){
					this.button.className += " toolbox-top-hide" ;
				}

			}
		}
		else if(typeof(this.options.visibleTarget)==='number'){
			var givenoffset = this.options.visibleTarget ;
			if(scrollTop > givenoffset){
				if(this.button.className.indexOf("toolbox-top-hide")>-1){
					this.button.className = this.button.className.replace("toolbox-top-hide", "toolbox-top-show") ;
				}
				else if(this.button.className.indexOf('toolbox-top-show')===-1){
					this.button.className += " toolbox-top-show" ;
				}
			}
			else{
				if(this.button.className.indexOf("toolbox-top-show")>-1){
					this.button.className = this.button.className.replace("toolbox-top-show", "toolbox-top-hide") ;
				}
				else if(this.button.className.indexOf("toolbox-top-hide")===-1){
					this.button.className += " toolbox-top-hide" ;
				}
			}
		}
		else{
			var visibleTarget = this.options.visibleTarget ;
			var visibleTargetOffset = visibleTarget.offsetTop  ;
			var containerOffset = (this.settings.eventTarget.offsetTop === undefined ? 0 : this.settings.eventTarget.offsetTop) ;
			var height = (this.settings.eventTarget.offsetHeight === undefined ? this.settings.eventTarget.outerHeight : this.settings.eventTarget.offsetHeight) ;
			var requiredScroll = visibleTargetOffset - height ;
			if(scrollTop >= requiredScroll){
				if(this.button.className.indexOf("toolbox-top-hide")>-1){
					this.button.className = this.button.className.replace("toolbox-top-hide", "toolbox-top-show") ;
				}
				else if(this.button.className.indexOf("toolbox-top-show")===-1){
					this.button.className += " toolbox-top-show" ;
				}
			}
			else{
				if(this.button.className.indexOf("toolbox-top-show")>-1){
					this.button.className = this.button.className.replace("toolbox-top-show", "toolbox-top-hide") ;
				}
				else if(this.button.className.indexOf("toolbox-top-hide")===-1){
					this.button.className += " toolbox-top-hide" ;
				}
			}
		}
	} ;
	
	var scroll = function(){
		var time ;
		var acceleration = 10 ;
		var distance=0 ;
		switch (this.options.speed){
			case "normal":
				time = 0.5 ;
				break ;
			case "fast":
				time = 0.25 ;
				break ;
			case "slow":
				time = 1 ;
				break ;
			default:
				time = 0.5 ;
				break ;
		}
		var currentPos = (this.settings.eventTarget.scrollTop === undefined ? this.settings.eventTarget.pageYOffset : this.settings.eventTarget.scrollTop);
		var destinationPos = (this.options.target.offsetTop === undefined ? 0 : this.options.target.offsetTop) ;
		var requiredDistance = currentPos - destinationPos ;
		var reachedPos = currentPos ;
		if(requiredDistance < 0)
			return ;
		acceleration = (2*requiredDistance)/Math.log(1+time) ;
		var elapsedTime = 0 ;
		var setter = function(){
			if(distance <= requiredDistance){
			distance = (acceleration*Math.log(1+ elapsedTime))/2 ;
			if(distance >= requiredDistance){
				console.log(destinationPos) ;
				clearInterval(timer) ;
				if(this.settings.eventTarget === window){
					document.body.scrollTop = destinationPos ;
				}
				else{
					this.options.container.scrollTop = currentPos-distance ;
				}
				return ;
			}
			if(this.settings.eventTarget === window){
				document.body.scrollTop = currentPos - distance ;
				reachedPos = this.settings.eventTarget.pageYOffset ;
			}else{
				this.options.container.scrollTop = currentPos-distance ;
				reachedPos = this.options.container.scrollTop ;
			}
			elapsedTime += 0.005 ;
		}
		else{
			clearInterval(timer) ;
			if(this.settings.eventTarget === window){
				document.body.scrollTop = destinationPos ;
			}
			else{
				this.options.container.scrollTop = currentPos-distance ;
			}
		}
		}
		var timer = setInterval(setter.bind(this), 5) ;
	}

	function buildButton(){
		var icon, frag, wrapper, clone ;
		if(this.options.icon === null){
			icon = document.createElement("div") ;
			icon.innerHTML = "^" ;
			icon.className = "toolbox-top-caret" ;
		}
      
		else{
			icon = this.options.icon ;
		}
		
		wrapper = document.createElement("div") ;
		wrapper.className = 'toolbox-top-wrapper' ;
		wrapper.style.width = this.options.container.offsetWidth + "px" ;
		//clone = this.options.container.cloneNode(true) ;
		frag = document.createDocumentFragment() ;
		frag.appendChild(wrapper) ;
		this.options.container.parentNode.appendChild(frag) ;
		
		this.button = document.createElement("div") ;
		this.button.className = this.options.className ;
		this.button.appendChild(icon) ;
		
		setButtonSize.call(this) ;
		wrapper.appendChild(this.options.container) ;
		wrapper.appendChild(this.button) ;

		setButtonPosition.call(this) ;
		
	}

	function initialiseEvents(){
		var timer =0;
		var global = this ;
		this.transitionEnd = transitionSelect() ;
		
		this.button.addEventListener('click', scroll.bind(this)) ;
		
		this.settings.eventTarget.addEventListener('scroll', function(){
			if(!timer){
				timer = setTimeout(function(){
					visible.call(global) ;
					timer = 0 ;
				}, 60) ;
			}
		}) ;
	}
	
	function setButtonSize(){
		if(this.options.size === "normal"){
			this.button.className += " toolbox-top-normal" ;
		}
		else if(this.options.size === "small"){
			this.button.className += " toolbox-top-small" ;
		}
		else if(this.options.size === "large"){
			this.button.className += " toolbox-top-large" ;
		}
		else{
			this.button.className += " toolbox-top-normal" ;
		}

	}

	function setButtonPosition(){
		switch (this.options.position){
			case "bottom-right":
				if(this.settings.eventTarget === window){
					this.button.className += " toolbox-top-bottom-right-fixed" ;
				}
				else{
					this.button.className += " toolbox-top-bottom-right" ;
				}
				break ;
			case "bottom-left":
				if(this.settings.eventTarget === window){
					this.button.className += " toolbox-top-bottom-left-fixed" ;
				}
				else{
					this.button.className += " toolbox-top-bottom-left" ;
				}
				break ;
			case "top-right":
				if(this.settings.eventTarget === window){
					this.button.className += " toolbox-top-top-right-fixed" ;
				}
				else{
					this.button.className += " toolbox-top-top-right" ;
				}
				break ;
			case "top-left":
				if(this.settings.eventTarget === window){
					this.button.className += " toolbox-top-top-left-fixed" ;
				}
				else{
					this.button.className += " toolbox-top-top-left" ;
				}
				break ;
			default:
				if(this.settings.eventTarget === window){
					this.button.className += " toolbox-top-bottom-right-fixed" ;
				}
				else{
					this.button.className += " toolbox-top-bottom-right" ;
				}
		}
	}
	function transitionSelect() {
		var el = document.createElement("div");
		if (el.style.WebkitTransition) return "webkitTransitionEnd";
		if (el.style.OTransition) return "oTransitionEnd";
		return 'transitionend';
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
	
	var main = function(){
		var backtotop = new plugin() ;
		backtotop.create(arguments) ;
		return backtotop ;
	} ;
	return main ;
}(Toolbox));

return backtotop ;
}) ;
