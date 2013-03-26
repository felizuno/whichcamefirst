(function() {
	
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

})();
