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
				'click .gameselect': 'gameChosen',
				'click .social': 'socialAction',
				'click .close': 'close'
			};
		},   
		initialize: function(config) {
			var template = _.template($.trim($('#panel-template').html()), config);
			this.$el = $('<div>')
				.addClass('panel')
				.html(template)
				.appendTo('body');

			if (!!config.id) {
				this.$el.addClass(config.id);
			}
		},
		render: function() {
			this.$el.html(template);
		},
		socialAction: function() {
			this.close();
			WCF.userPanel.show();
		},
		gameChosen: function() {
			WCF.headerBar.toggleHeader();
			this.close();
		},
		show: function() {
			this.$el.animate({top: '10em'}, 1500);
		},
		close: function() {
			this.$el.animate({top: '+=20em'}, 1000);
		}
	});

	Views.RoundView = Backbone.View.extend({
		initialize: function() {
		},
		render: function() {
		},
		swapAlbumPosition: function() {},
		updatePlaybackIndicators: function() {},
	});

})();