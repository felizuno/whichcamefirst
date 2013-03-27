(function() {
	
	Models.Player = Backbone.Model.extend({
		initialize: function() {
			this.set('name', 'Player 1'); // + Math.rand().toString());  // TODO: capture from user
			this.set('round', 1);
			this.set('wins', 0);
			this.on('change:wins', this.updateWinRate);
			this.listenTo(this.get('model'), 'win', this.addWin);
			this.listenTo(this.get('model'), 'loss', this.updateRoundCount); // can this listen for two events?
			this.set('shouldAutoSave', true);
			this.autoSave();
		},

		addWin: function() {
			this.updateRoundCount();
			var wins = this.get('wins') + 1;
			console.log(wins);
			this.set('wins', wins);
		},
		
		updateWinRate: function() {
			this.set('winRate', (this.get('wins') / (this.get('round') - 1)) * 100);
			// this.save();
		},

		updateRoundCount: function() {
			this.set('round', (this.get('round') + 1));
		},

		autoSave: function() {
			var self = this;
			if (this.get('shouldAutoSave')) {
				setTimeout(function() {
					// self.save();
					self.autoSave;
				});
			}
		},

	});

})();