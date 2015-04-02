//>>description : Adds back to top button in sites
//>>label : backToTop
//>>group : utilities
(function($) {
    $.fn.createit = function(){
        var $el = $(this) ;
        var x = $el.offset().left + $el.innerWidth() - 20 ;
	    var y = $el.offset().top + 10 ;
        var $btn = $("<div class='goTop'>Top</div>").appendTo("body") ;
        x = x - $btn.outerWidth() ;
        $btn.css({"top":y , "left":x}).hide() ;
        attachit = function(){
        $el.bind("scroll", check) ;
        } ;
    check = function() {
        if($(this).scrollTop() > 100){
            $btn.fadeIn("slow") ;
             handleClick() ;
        }
        else{
            $btn.stop().fadeOut("slow") ;
        }
    } ;
    handleClick = function(){
            $btn.on("click",event, showit) ;
    } ;
    showit = function(event){
        event.preventDefault() ;
        $el.stop().animate({
            scrollTop: 0}, 500, hideit) ;
    } ;
    hideit = function() {
        $btn.stop().fadeOut("slow") ;
    } ;
        attachit() ;
    };
})(jQuery);	
