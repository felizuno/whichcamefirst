(function() {
	
	Views.RoundView = Backbone.View.extend({
		events: function() {
			return {
				'click .switch': 'swapAlbumPositions',
				'click .album': 'updatePlaybackIndicators',
				'click .submit': 'submitAnswer',
				'click .nextround': 'endRound'
			};
		},
		initialize: function(config) {
			this.listenTo(this.model, 'change:albums', this.render);
			this.listenTo(this.model, 'change:win', this.revealRightAnswer);
			this.$el = $('<div>')
				.addClass('roundview')
				.appendTo('body');
		},
		render: function() {
			console.log('WHAT THE FUCK?');
			var albums = this.model.get('albums');
			// if (this.model.get('albums').length == 2) {
				var rawTemplate = $.trim($('#round-view-template').html());
				var template = _.template(rawTemplate, {albums: albums});
				this.$el.html(template);
			// }	
		},
		swapAlbumPositions: function(ms) {
			if (ms != 0) {
				this.$el.find('.right').animate({
						'margin-right': '-20em'
					});
				this.$el.find('.left').animate({
						'margin-left': '-20em'
					});
			}

			var $album1 = this.$el.find('.album1');
			var $album2 = this.$el.find('.album2');
			var leftToRight = $album1.parent().hasClass('left');
			var time = (ms == 0) ? ms : 300;
			setTimeout(function() {
				if (leftToRight) {
					$album1.appendTo('.right');
					$album2.appendTo('.left');
				} else {
					$album1.appendTo('.left');
					$album2.appendTo('.right');
				}
			}, time);

			if (ms != 0) {
				this.$el.find('.right').animate({
						'margin-right': '8em'
					});
				this.$el.find('.left').animate({
						'margin-left': '8em'
					});
			}
		},
		updatePlaybackIndicators: function(clicked) {
			this.playing = $(clicked).parent().attr('class');
			this.trigger('playback');
		},
		submitAnswer: function() {
			// this.stopListening('all');
			this.answer = this.$el.find('.right').find('.albumname').text();
			this.trigger('submitanswer');
			this.$el.find('.album').animate({
				'margin-top': '-30em'
			});
		},
		revealRightAnswer: function() {
			var self = this;
			setTimeout(function() {
				if (!self.model.get('win')) {
					self.swapAlbumPositions(0);
				}

				self.$el.find('.album').animate({
					'margin-top': '8em'
				}).find('.year').fadeIn('slow')
			}, 300);
			this.$el.find('.roundbutton').animate({
				'margin-top': '+=30em'
			});
		},
		endRound: function() {
			this.trigger('endround');
	        this.$el.remove();
		}
	});

})();