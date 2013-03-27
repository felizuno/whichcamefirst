(function() {
	
	Views.HeaderBar = Backbone.View.extend({
		events: function() {
			return {
				'click': 'slideToggle'
			}
		},

		initialize: function() {
			this.listenTo(this.model, 'change:currentRound', this.updateRoundContent)
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
			this.animating = false;
			if (!this.animating){
				this.animating = true;
				var self = this;
				var template = _.template($.trim($('#round-header-template').html()), this.model.attributes);
				this._slideLeft();
				setTimeout(function() {
					self.$el.html(template);
				}, 300);
				this._slideRight();
					self.animating = false;
			}
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
