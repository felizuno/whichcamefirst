(function() {
	window.Views = {};
	Views.homeView = Backbone.View.extend({
		initialize: function() {
			//Close buttons
			$('.close').click(function() {
				$(this).closest('.panel').slideUp('fast');
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
	});
	Views.gameSelectView = Backbone.View.extend({});
	Views.gameLobbyView = Backbone.View.extend({});
	Views.roundView = Backbone.View.extend({});
	Views.headsUpPanel = Backbone.View.extend({});
})();