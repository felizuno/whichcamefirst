(function() {
	window.Models = {};
	Models.User = Backbone.Model.extend({
		initialize: function() {},
	});
	Models.Game = Backbone.Model.extend({
		initialize: function() {},
		unpack: function() {},
		getRound: function() {},
		playRound: function() {},
		playSong: function() {},
		compareAge: function() {},
		endRound: function() {}
	});
	Models.Round = Backbone.Model.extend({
		initialize: function() {},
	});
})();