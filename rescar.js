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

// TODO:
// * KEEP IT SIMPLE
// * Use plain js
// * Get carouselItemSize dynamically
// * Allow speed to be set
// * Allow more than one carousel on the page
// * Enable/disable right or left button
// * IE8+ support

$(function(){
	var
		carouselImgSize,
		carouselItemSize = 200,
		$carouselContainer = $('.rescar-viewport'),
		carWidth = $carouselContainer.width(),
		$carousel = $('.rescar'),
		carChildWidth = $carousel.width(),
		smallestSize = Math.round( carWidth / carouselItemSize )
	;

	$(window).resize(resize.debounce(150));

	function resize() {
		carWidth = $carouselContainer.width();
		carChildWidth = $carousel.width();
		buttonToggle();

		console.log('carWidth: ', carWidth);
		console.log('carChildWidth: ', carChildWidth);
		console.log('smallestSize: ', smallestSize);
	}

	resize();

	$('.rescar-button').click(function(event) {
		console.log($carousel.css('left'));
		if ( carWidth - carChildWidth < ( parseInt($carousel.css('left'), 10) + smallestSize ) ) {
			$carouselContainer.find('.rescar').animate({
				left: '-=200px'},
				'slow'
			);
			console.log('move carousel');
		} else {
			$carouselContainer.find('.rescar').animate({
				left: '0px'},
				'slow'
			);
			console.log('move carousel back to beginning');
		}

	});

	// Show/hide next button
	function buttonToggle() {
		if ( carWidth > carChildWidth + 30 ){
			$('.rescar-button').hide();
		} else {
			$('.rescar-button').show();
		}
	}

});