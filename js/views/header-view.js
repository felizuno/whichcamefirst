 (function() {
	
	Views.HeaderBar = Backbone.View.extend({
		events: function() {
			return {
				'click': 'slideToggle'
			}
		},

		initialize: function() {
			this.listenTo(this.model, 'change:currentRound', _.debounce(this.updateRoundContent, 1000));
			this.hiding = false;
			this.$el = $('<div>')
				.addClass('headerbar title')
				.appendTo('body');
			this.render();
		},

		render: function() {
			var template = _.template($.trim($('#welcome-header-template').html()));
			this.$el.html(template);
		},

		slideToggle: function() {
			if (!this.hiding) {
				this._slideLeft();
			} else {
				this._slideRight();
			}
		},

		updateRoundContent: function() {
			var self = this;
			// _.debounce(function() {
				self._slideLeft();
				self._slideRight();
			
				var template = _.template($.trim($('#round-header-template').html()), self.model.attributes);
				setTimeout(function() {
					self.$el.html(template);
				}, 300);
			// }, 1000)();
		},

		_slideLeft: function() {
			this.$el.animate({
				left: '-=90%'
			});
			this.hiding = true;
		},

		_slideRight: function() {
			this.$el.animate({
				left: '+=90%'
			});
			this.hiding = false;
		}
	});

})();
