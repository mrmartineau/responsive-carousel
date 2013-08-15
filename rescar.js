/*!
 * Rescar v0.1
 * Responsive Carousel
 * MIT License
 * by Zander Martineau
 */

// ( function( window ) {

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

	// Quick DOM methods
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

	var Rescar = (function() {
		'use strict';

		function Rescar(rescar, options) {
			// enforces new
			if (!(this instanceof Rescar)) {
				return new Rescar(rescar, options);
			}
			// constructor body

			this.options             = options;
			this.rescar              = rescar;
			this.rescarViewport      = $$('.rescar-viewport');

			window.onresize          = this.resize.debounce(150);
			this.resize();
			this.buttonListener();
		}

		// On window/viewport resize
		Rescar.prototype.resize = function() {
			this.elstyle             = window.getComputedStyle(this.rescar, null);
			this.parentStyle         = window.getComputedStyle(this.rescar.parentNode, null);
			this.rescarViewportWidth = styler(this.rescar.parentNode).get('width', true);
			this.rescarWidth         = styler(this.rescar).get('width', true);
			this.rescarItemSize      = this.options.itemWidth ? this.options.itemWidth : 200;
			this.smallestSize        = Math.round( this.rescarViewportWidth / this.rescarItemSize );

			// this.buttonToggle();

			// console.log('this.rescarViewportWidth: ', this.rescarViewportWidth);
			// console.log('this.rescarWidth: ', this.rescarWidth);
			// console.log('this.smallestSize: ', this.smallestSize);
		};

		//
		Rescar.prototype.buttonListener = function() {
			var buttons = $$('.rescar-button');
			var self = this;

			buttons.addEventListener('click', function(event) {
				// if (next is clicked) {
					var updatedStyle     = styler(self.rescar).get('left', true);

					if ( self.rescarViewportWidth - self.rescarWidth < updatedStyleLeft + self.smallestSize ) {
						// TODO: Animate left value
						self.rescar.style.left = (updatedStyleLeft - 200) + 'px';
						console.log('move carousel');
					} else {
						// TODO: Animate left value back to beginning
						self.rescar.style.left = '0px';
						console.log('move carousel back to beginning');
					}
				// } else {

				// }

			}, false);
		};

		// Show/hide next button
		Rescar.prototype.buttonToggle = function() {
			if ( this.rescarViewportWidth > this.rescarWidth + 30 ){
				$('.rescar-button').style.display = "none";
			} else {
				$('.rescar-button').style.display = "block";
			}
		};

		return Rescar;

	}());


// })( window );