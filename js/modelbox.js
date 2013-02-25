(function() {
	window.Models = {
	};
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

	window.Views = {
	};
	Views.homeView = Backbone.View.extend({});
	Views.gameSelectView = Backbone.View.extend({});
	Views.gameLobbyView = Backbone.View.extend({});
	Views.roundView = Backbone.View.extend({});
	Views.headsUpPanel = Backbone.View.extend({});
})();