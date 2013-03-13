(function() {
	window.Views = {};
	Views.CoreUI = Backbone.View.extend({
		events: function() {
			return {
				'click .social': 'reportSocialInteraction'
			}
		},

		initialize: function() {
			var self = this;

			$('.gameselect').click(function() {
				self.trigger('toggleHeader'); // IS THIS HOW YOU DO IT?
			});
		},

		reportSocialInteraction: function(/*event??*/) {
			this.trigger('socialAction');
		}
	});
	Views.HeaderBar = Backbone.View.extend({
		events: function() {
			return {
				'click .header': 'toggleHeader'
			}
		},

		initialize: function() {
			var self = this;
			this.on('toggleHeader', this.toggleHeader);

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
		}
	});
	Views.GameSelectView = Backbone.View.extend({
		initialize: function() {
			var self = this;
			
			this.on('toggleHeader', this.toggleHeader);

			$('.gameselect').click(function() {
				self.trigger('toggleHeader'); // IS THIS HOW YOU DO IT?
			});
		},
	});
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
	Views.ReadsUpPanel = Backbone.View.extend({});
})();