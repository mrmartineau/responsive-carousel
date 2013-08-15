/*!
 * Rescar v0.1
 * Responsive Carousel
 * MIT License
 * by Zander Martineau
 */

( function( window ) {

'use strict';

	// -------------------------- helpers -------------------------- //
	Function.prototype.debounce = function (milliseconds) {
		var baseFunction = this,
			timer = null,
			wait = milliseconds;

		return function () {
			var self = this,
				args = arguments;

			function complete() {
				baseFunction.apply(self, args);
				timer = null;
			}

			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(complete, wait);
		};
	};

	// Wrap an HTMLElement around each element in an HTMLElement array.
	HTMLElement.prototype.wrap = function(elms) {
		// Convert `elms` to an array, if necessary.
		if (!elms.length) elms = [elms];

		// Loops backwards to prevent having to clone the wrapper on the
		// first element (see `child` below).
		for (var i = elms.length - 1; i >= 0; i--) {
			var child = (i > 0) ? this.cloneNode(true) : this;
			var el    = elms[i];

			// Cache the current parent and sibling.
			var parent  = el.parentNode;
			var sibling = el.nextSibling;

			// Wrap the element (is automatically removed from its current
			// parent).
			child.appendChild(el);

			// If the element had a sibling, insert the wrapper before
			// the sibling to maintain the HTML structure; otherwise, just
			// append it to the parent.
			if (sibling) {
				parent.insertBefore(child, sibling);
			} else {
				parent.appendChild(child);
			}
		}
	};

	function $(el) {
		return document.querySelectorAll(el);
	}

	function $$(el) {
		return document.querySelector(el);
	}

	// Get/Set CSS styles with ease
	function styler(el) {
		return {
			/* Get CSS style
			 * @prop : String - CSS property name e.g 'width', 'height'
			 * @int  : Boolean
			 */
			get : function(prop, int) {
				/* TODO:
				 * Get multiple CSS properties. prop could be comma separated list
				 * Allow get all css values
				 * Throw errors when args not in correct format
				 */
				var int = int || false;

				if (int === true) {
					return parseInt(window.getComputedStyle(el, null).getPropertyValue(prop), 10);
				} else{
					return window.getComputedStyle(el, null).getPropertyValue(prop);
				}
			},

			/* Set CSS style
			 * @prop : String - CSS property name e.g 'width', 'height'
			 * @val  : String - CSS property value e.g. '200px'
			 */
			set : function(prop, val) {
				/* TODO:
				 * Set multiple CSS properties. prop could be comma separated list
				 * Throw errors when args not in correct format
				 */
				return el.style[prop] = val;
			}
		};
	};



	// -------------------------- init -------------------------- //

	// TODO:
	// * KEEP IT SIMPLE
	// * Use plain js
	// * Get carouselItemSize dynamically
	// * Allow speed to be set
	// * Allow more than one carousel on the page
	// * Enable/disable right or left button
	// * IE8+ support
	// * Progressive enhancement
	// - * Add buttons dynamically
	// - * Wrap <ul> with .rescar-viewport

	function Rescar(itemWidth, speed, buttonR, buttonL) {
		this.rescarViewport      = document.querySelectorAll('.rescar-viewport');
		this.rescar              = document.querySelectorAll('.rescar');
		this.rescarItemSize      = this.itemWidth ? this.itemWidth : 200;
		this.smallestSize        = Math.round( this.rescarViewportWidth / this.rescarItemSize );

		window.onresize          = this.resize.debounce(150);
		this.resize();
		this.buttonListener();
	};

	// On window/viewport resize
	Rescar.prototype.resize = function() {
		this.rescarViewportWidth = this.rescarViewport.offsetWidth;
		this.rescarWidth         = this.rescar.offsetWidth;

		if ( !this.itemWidth ) {
			// itemWidth fall back to item of first element
			this.itemWidth = firstItemElem ? getSize( firstItemElem ).outerWidth :
				// or size of container
				this.size.innerWidth;
		}
		this.buttonToggle();

		console.log('this.rescarViewportWidth: ', this.rescarViewportWidth);
		console.log('this.rescarWidth: ', this.rescarWidth);
		console.log('this.smallestSize: ', this.smallestSize);
	};

	// Get rescar width
	Rescar.prototype.getResCarWidth = function() {

	};

	// Get rescar item widths
	Rescar.prototype.getRescarItemWidth = function() {

	};

	//
	Rescar.prototype.buttonListener = function() {
		var buttons = document.querySelectorAll('.rescar-button');

		buttons.addEventListener('click', function(event) {
			// if (next is clicked) {
				var style = window.getComputedStyle(this.rescar, null);
				console.log(style);
				if ( this.rescarViewportWidth - this.rescarWidth < ( parseInt(this.rescar.css('left'), 10) + smallestSize ) ) {
					this.rescarViewport.find('.rescar').animate({
						left: '-=200px'},
						'slow'
					);
					console.log('move carousel');
				} else {
					this.rescarViewport.find('.rescar').animate({
						left: '0px'},
						'slow'
					);
					console.log('move carousel back to beginning');
				}
			// } else {

			// }

		}, false);
	};

	//
	Rescar.prototype.getRescarItemWidth = function() {

	};

	// Show/hide next button
	Rescar.prototype.buttonToggle = function() {
		if ( this.rescarViewportWidth > this.rescarWidth + 30 ){
			$('.rescar-button').hide();
		} else {
			$('.rescar-button').show();
		}
	};

})( window );