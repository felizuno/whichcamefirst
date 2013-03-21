(function() {
	window.Views = {};

	//////////////////////////////////////////////////////////////////////
	Views.HeaderBar = Backbone.View.extend({
		events: function() {
			return {
				'click': 'toggleHeader'
			}
		},

		initialize: function() {
			this.hiding = false;
			this.listenTo(WCF.gameSelectView, 'gameChosen', this.toggleHeader);
		},

		toggleHeader: function() {
			if (!this.hiding) {
				this.$el.animate({left: '-=90%'});
				this.hiding = true;
			} else {
				this.$el.animate({left: '+=90%'});
				this.hiding = false;
			}
		}
	});

	//////////////////////////////////////////////////////////////////////
	Views.SocialSelectView = Backbone.View.extend({
		events: function() {
			return {
				'click .social': 'socialAction',
				'click .close': 'close'
			};
		},  
		initialize: function() {
			var self = this;
			// this.listenTo(WCF.socialSelectView, 'all', close);
		},
		socialAction: function() {
		},

		close: function() {
			this.$el.fadeOut('fast');
		}
	});

	//////////////////////////////////////////////////////////////////////
	Views.GameSelectView = Backbone.View.extend({
		events: function() {
			return {
				'click .gameselect': 'gameChosen',
				'click .close': 'close'
			};
		},
		initialize: function() {
			var self = this;
			// this.listenTo(WCF.socialSelectView, 'all', close);
		},
		gameChosen: function() {
			this.trigger('gameChosen');
			this.close();
		},
		close: function() {
			this.$el.fadeOut('fast');
		}
	});

	//////////////////////////////////////////////////////////////////////
	Views.GameLobbyView = Backbone.View.extend({});
	Views.RoundView = Backbone.View.extend({
		initialize: function() {
			// this.listenTo(this.model, "change:currentRound", _.bind(this.doSomething, this));
			this.roundModel = this.model.get('currentRound');
			this.listenTo(this.roundModel, 'change:roundNumber', this.render);
		},
		render: function() {
			WCF.headerBar.toggleHeader();
			var rawTemplate = $("#round-view-template").text();
			var template = _.template(rawTemplate);
			var html = template(this.roundModel.attributes);

			if ($('.roundview')) {
				$('.roundview').remove();
			}

			var $el = $('<div>')
				.addClass('roundview')
				.html(html)
				.appendTo('body');

			this.el = $el;
		},
		swapAlbumPosition: function() {},
		updatePlaybackIndicators: function() {},
		toggleLeaveRoundBanner: function() {}
	});

	//////////////////////////////////////////////////////////////////////
	Views.ReadsUpPanel = Backbone.View.extend({});
	//////////////////////////////////////////////////////////////////////
})();