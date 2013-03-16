(function() {
	window.Views = {};

	//////////////////////////////////////////////////////////////////////
	Views.HeaderBar = Backbone.View.extend({
		events: function() {
			return {
				'click .header': 'toggleHeader'
			}
		},

		initialize: function() {
			var self = this;
			this.listenTo(WCF.gameSelectView, 'toggleHeader', this.toggleHeader);

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
			var self = this; 
			// CAN'T MOVE THIS TO GAMESELECTVIEW!!!
			$('.gameselect').click(function() {
				WCF.currentGame.trigger('showRoundView'); // IS THIS HOW YOU DO IT?
			});
		},
	});

	//////////////////////////////////////////////////////////////////////
	Views.GameLobbyView = Backbone.View.extend({});
	Views.RoundView = Backbone.View.extend({
		initialize: function() {
			// this.listenTo(this.model, "change:currentRound", _.bind(this.doSomething, this));
			this.roundModel = this.model.get('currentRound');
			if (!$('.roundview')) {
				var $el = $('<div>')
					.addClass('roundview')
					.appendTo('body');

				this.el = $el;
			} else {
				this.el = $('.roundview');
			}


			this.listenTo(this.roundModel, 'change:roundNumber', this.render);
			// this.listenTo(this.roundModel, 'change:', _.bind( , this));
			// this.listenTo(this.roundModel, 'change:', _.bind( , this));
			// this.listenTo(this.roundModel, 'change:', _.bind( , this));
			// this.listenTo(this.roundModel, 'change:', _.bind( , this));
			// this.listenTo(this.roundModel, 'change:', _.bind( , this));
		},
		render: function() {
			WCF.headerBar.toggleHeader();
		},
		switchAlbumPosition: function() {},
		updatePlaybackIndicators: function() {},
		toggleLeaveRoundBanner: function() {}
	});

	//////////////////////////////////////////////////////////////////////
	Views.ReadsUpPanel = Backbone.View.extend({});
})();