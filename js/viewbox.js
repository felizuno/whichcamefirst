(function() {
	window.Views = {};

	//////////////////////////////////////////////////////////////////////
	Views.CoreUI = Backbone.View.extend({
		events: function() {
			return {
				'click .social': 'reportSocialInteraction'
			}
		},

		initialize: function() {
		},

		reportSocialInteraction: function(/*event??*/) {
			this.trigger('socialAction');
		}
	});

	//////////////////////////////////////////////////////////////////////
	Views.HeaderBar = Backbone.View.extend({
		events: function() {
			return {
				'click .header': 'toggleHeader'
			}
		},

		initialize: function() {
			var self = this;
			this.on('toggleHeader', this.toggleHeader);

			// CAN'T MOVE THIS TO GAMESELECTVIEW!!!
			$('.gameselect').click(function() {
				self.trigger('toggleHeader'); // IS THIS HOW YOU DO IT?
			});
		},

		toggleHeader: function() {
			var $header = this.$el;

			if ($header.hasClass('hiding')) {
				$header.animate({left: '+=90%'});
			} else {
				$header.animate({left: '-=90%'});					
			}

			$header.toggleClass('hiding');
		}
	});

	//////////////////////////////////////////////////////////////////////
	Views.GameSelectView = Backbone.View.extend({
		initialize: function() {
		},
	});

	//////////////////////////////////////////////////////////////////////
	Views.GameLobbyView = Backbone.View.extend({});
	Views.RoundView = Backbone.View.extend({
		render: function() {
			// $('<div>')
			// 	.addClass('roundview')
			// 	.appendTo($el);
		},
		switchAlbumPosition: function() {},
		updatePlaybackIndicators: function() {},
		toggleLeaveRoundBanner: function() {}
	});

	//////////////////////////////////////////////////////////////////////
	Views.ReadsUpPanel = Backbone.View.extend({});
})();