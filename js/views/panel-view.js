(function() {

	Views.Panel = Backbone.View.extend({
		events: function() {
			return {
				'click .gameselect': 'gameChosen',
				'click .userdio': 'useRdio',
				'click .useguest': 'useGuest',
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
		useRdio: function() {
			this.trigger('gordio');
			this.close();
			WCF.userPanel.show();
		},
		useGuest: function() {
			this.close();
			WCF.userPanel.show();
		},
		gameChosen: function(clickEvent) {
			// WCF.headerBar.toggleHeader();
			this.chosenDecade = $(clickEvent.target).html();
			this.trigger('gamechosen');
			this.close();
		},
		show: function() {
			this.$el.animate({top: '10em'}, 1500);
		},
		close: function() {
			this.$el.animate({top: '+=30em'}, 1000);
		}
	});
	
})();
