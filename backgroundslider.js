// ------------------------------- //
// BACKGROUND SLIDER PLUGIN
// ------------------------------- //
(function($, window, document, undefined){

	"use strict";	
	
	$.Slider = function(options, element){
	
		this.$el = 		$(element);
		
		var slider = 	this;
		
		slider.init = function( options ){
			
			this.options =			 	$.extend(true, {}, $.Slider.defaults, options);	
			this.$slides = 				this.$el.children('.slide');			
			this.$toggleButton =		this.options.toggleButton;
			this.current =		 		this.options.currentSlide;
			this.total =					this.$slides.length;
			this.menu =			 		this.options.menuSize;
			this.isAnimating = 		false;
			this.$next =		  		this.options.nextButton;
			this.$prev =		  		this.options.prevButton;
			this.window =			 	$(window);
			
			// Initialise Functions
			this._initEvents();
			this._fitScreen(this.$slides);
			this._repositionSlides();
      
        // Set slides to specified/default height
        this.$slides.css("height", this.options.height+"px");
			
		};
		
		slider.init();
		
	}
	
	$.Slider.defaults = {
		nextButton:		 $('.button-right'),
		prevButton: 		$('.button-left'),
		menuSize: 		  0,
		currentSlide:	 0,
     // Slider height can also be specified by number
     height:				window.innerHeight,
		autoPlay:			false,
	};
		
	$.Slider.prototype = {
		
    // Destroy Instance of plugin
		destroy: function(){
			
			this.$el.removeData();
				
		},
		
    // Fit the current slide to the viewport size
		_fitScreen: function(slides){
		
			var _self = this;
      
			slides.css('max-width', _self.window.width() - _self.menu + 'px');
		},
		
    // Reposition the slides if the viewport size has changed
		_repositionSlides: function(){
		
			var position = -this.$slides.eq(this.current).position().left + this.menu;

			this.$el.css('left', position);
			  
		},
		
    // Next Slide
		_nextSlide: function(){
			
			if(this.current < this.total - 1){
			
			    this.$el.css('left', '-=' + this.$slides.eq(this.current + 1).outerWidth()+'');
			    
			    if(this.current !== this.total) this.current++;

			    this._repositionSlides();

			}
			
		},
		
    // Previous Slide
		_prevSlide: function(){
		
			if(this.current > 0 && this.current < this.total){
			
			    this.$el.css('left', '+=' + this.$slides.eq(this.current).outerWidth()+'');
			    
			    if(this.current !== this.total) this.current--;

			    this._repositionSlides();
		    } 
		    
		},
		
    // Refit and position slides within the viewport
		_updateLayout: function(){
		
			var _self = this;
			_self._fitScreen(_self.$slides);
			_self._repositionSlides();

		},
		
    // Unbind the keyboard events
		unbindEvents: function(){
      
			this.$next.unbind("click");
			this.$prev.unbind("click");
			this.$toggleButton.unbind("click");
			$(document).unbind("keydown keyup");
      
		},
		
    // Bind click and keyboard events
		_initEvents: function(){
			
			var _self = this;
			
			
			// Next Slide
			this.$next.on("click", function(e){ _self._nextSlide(); });
			
			// Prev Slide
			this.$prev.on("click", function(e){ _self._prevSlide(); });
			
			// Keypress slide changes
			$(document).on("keydown", function(e){
				
				e.stopPropagation();
				var keyCode = e.keyCode || e.which;
 
                switch (keyCode) {
                	// Left Arrow Key
                    case 37:
                        _self._prevSlide();
                        break;
                    // Right Arrow Key
                    case 39:
                        _self._nextSlide();
                        break;
                }
                
                return false;
			});
			
      // Update the layout on window resize
			this.window.on("resize", function(){
			
				_self._updateLayout();
				
			});
			
		}
	};
	
	
	$.fn.BackgroundSlider = function( options ) {
	
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				var instance = $.data( this, 'BackgroundSlider' );
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
			
				var instance = $.data( this, 'BackgroundSlider' );
				if ( !instance ) {
					$.data( this, 'BackgroundSlider', new $.Slider( options, this ) );
				}
			});
		
		}
		
		return this;
		
	};
	
})(jQuery, window, document);