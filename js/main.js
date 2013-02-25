(function() {
	window.WCF = {
		Utils: {
			chartMaker: {}
		},

		init: function() {
			//Close buttons
			$('.close').click(function() {
				$(this).closest('.panel').fadeOut('fast');
			});

			// Header behavior
			$('.header').click(function() {
				var $el = $(this);

				if ($el.hasClass('hiding')) {
					$el.animate({left: '+=90%'});
				} else {
					$el.animate({left: '-=90%'});					
				}

				$el.toggleClass('hiding');
			});
		}
	};


	$(document).ready(function() {
		WCF.init();
	});
})();