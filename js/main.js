(function() {
	window.WCF = {
		Utils: {
			chartMaker: {}
		},
		init: function() {
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