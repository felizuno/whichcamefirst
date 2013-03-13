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
			var self = this;
			this.on('toggleHeader', this.toggleHeader);
			$('.close').click(function() {
				$(this).closest('.panel').slideUp('fast');
			});

			$('.gameselect').click(function() {
				self.trigger('toggleHeader'); // IS THIS HOW YOU DO IT?
			});
		},

		toggleHeader: function() {
			var $el = $('.header');

			if ($el.hasClass('hiding')) {
				$el.animate({left: '+=90%'});
			} else {
				$el.animate({left: '-=90%'});					
			}

			$el.toggleClass('hiding');
		},

		reportSocialInteraction: function(/*event??*/) {
			this.trigger('socialAction');
		}
	});
	Views.gameSelectView = Backbone.View.extend({});
	Views.gameLobbyView = Backbone.View.extend({});
	Views.roundView = Backbone.View.extend({
		render: function() {
			$('<div>')
				.addClass('roundview')
				.appendTo($el);
		},
		switchAlbumPosition: function() {},
		updatePlaybackIndicators: function() {},
		toggleLeaveRoundBanner: function() {}
	});
	Views.headsUpPanel = Backbone.View.extend({});
})();