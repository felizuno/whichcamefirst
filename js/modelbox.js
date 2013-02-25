(function() {
	window.Models = {};
	Models.User = Backbone.Model.extend({
		initialize: function() {},
	});
	Models.Game = Backbone.Model.extend({
		initialize: function() {},
		resumePreviousRound: function() {
			var self = this;

			_.each(this.get('players'), function(v, i) {
				var player = v.split(':');
				if (player[0] == WCF.user.get('id')) {
					self.set('currentRound', self.get('rounds')[player[1]])
				}
			});
		},
		loadNextRound: function() {},
		startRound: function() {},
		playSong: function() {},
		compareAge: function() {},
		endRound: function() {},
		_trimRounds: function() {
			// USE THIS TO KEEP THE ROUNDS ARRAY SMALL
		}
	});
	Models.Round = Backbone.Model.extend({
		initialize: function() {},
	});
})();