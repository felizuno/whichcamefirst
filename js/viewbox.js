(function() {
	window.Views = {};
	Views.coreUI = Backbone.View.extend({
		events: function() {
			return {
				'click .header': 'toggleHeader',
				'click .social': 'reportSocialInteraction'
			}
		},

		initialize: function() {
			//Close buttons
			$('.close').click(function() {
				$(this).closest('.panel').slideUp('fast');
			});		
		},

		toggleHeader0: function() {
			var $el = $('.header');

			if ($el.hasClass('hiding')) {
				$el.animate({left: '+=90%'});
			} else {
				$el.animate({left: '-=90%'});					
			}

			$el.toggleClass('hiding');
		},

		reportSocialInteraction: function(/*event??*/) {
			// message the user model social things are getting clicked
		}x
	});
	Views.gameSelectView = Backbone.View.extend({});
	Views.gameLobbyView = Backbone.View.extend({});
	Views.roundView = Backbone.View.extend({
		render: function() {},
		switchAlbumPosition: function() {},
		updatePlaybackIndicators: function() {},
		toggleLeaveRoundBanner: function() {}
	});
	Views.headsUpPanel = Backbone.View.extend({});
})();