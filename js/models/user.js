(function() {
	
	Models.Player = Backbone.Model.extend({
		initialize: function() {
			this.name = 'Player 1'; // + Math.rand().toString();
			this.round = 1;
			this.wins = 0;
			this.on('change:wins', this.updateWinRate);
			this.listenTo(this.get('model'), 'win', this.updateWinRate);
		},

		addWin: function() {
			var wins = this.get('wins') + 1;
			this.set('wins', wins);
		},
		
		updateWinRate: function() {
			this.set('winRate', (this.get('wins') / (this.get('round') - 1)));
		}

	});

})();