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
			this.$el = $('<div>')
				.addClass('headerbar title')
				.appendTo('body');
			this.render();
		},

		render: function() {
			var template = _.template($.trim($('#header-template').html()));
			this.$el.html(template);
		},

		toggleHeader: function() {
			if (!this.hiding) {
				this.$el.animate({
					left: '-=90%'
				});
				this.hiding = true;
			} else {
				this.$el.animate({
					left: '+=90%'
				});
				this.hiding = false;
			}
		}
	});

	//////////////////////////////////////////////////////////////////////
	Views.Panel = Backbone.View.extend({
		events: function() {
			return {
				'click .close': 'close'
			};
		},   
		initialize: function(config) {
			console.log(config);
			var template = _.template($.trim($('#panel-template').html()), config);
			this.$el = $('<div>')
				.addClass('panel ' + config.id)
				.html(template)
				.appendTo('body');
		},
		render: function() {
			this.$el.html(template);
		},
		socialAction: function() {
			// Do some other stuff
			this.close();
		},

		close: function() {
			this.$el.fadeOut('fast');
		}
	});

	//////////////////////////////////////////////////////////////////////
	Views.SocialSelectView = Backbone.View.extend({
		events: function() {
			return {
				'click .close': 'close'
			};
		},   
		initialize: function() {
			this.$el = $('<div>')
				.addClass('loginpanel panel')
				.appendTo('body');
			this.render();
		},
		render: function() {
			var template = _.template($.trim($('#login-view-template').html()));
			this.$el.html(template);
		},
		socialAction: function() {
			// Do some other stuff
			this.close();
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
			this.template = _.template($.trim($('#game-type-chooser-template').html()));
			this.$el.addClass('gametypechooser panel');
			this.render();
		},
		render: function() {
			this.$el.html(this.template).appendTo('body');
		},
		gameChosen: function() {
			WCF.headerBar.toggleHeader(); // this has to go
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