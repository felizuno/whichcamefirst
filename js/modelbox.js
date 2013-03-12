(function() {
	window.Models = {};
	/*
	*	User - The global player - WCF.user
	*
	*	Game - The global game object - WCF.currentGame
	*
	*	Round - Contained by the game, which has the following rounds after init
	*			WCF.currentGame.rounds - An array of the rounds needed for all the games players
	*			WCF.currentGame.currentRound - The round that the player is about to play 
	*											(or is currently playing)
	*			WCF.currentGame.nextRound - The round that should be played next if the player
	*											enters a new round.
	*
	*/

	////////////////////////////////////////////////////////////////////////////////
	Models.User = Backbone.Model.extend({
		initialize: function() {},
	});
	
	////////////////////////////////////////////////////////////////////////////////
	Models.Game = Backbone.Model.extend({
		initialize: function() {
			this.resumeLastPlayedRound();
		},
		
		events: function() {
			"currentRoundOver": 'goToNextRound'
		},

		// Round Behavior
		// ==============
		resumeLastPlayedRound: function() {
			var self = this;

			_.each(this.get('players'), function(v, i) {
				var playerPlaceholder = v.split(':');
				
				if (playerPlaceholder[0] == WCF.user.get('id')) {
					var lastPlayedRound = self.get('rounds')[Math.floor(playerPlaceholder[1])];
					var userWinRatio = Math.floor((playerPlaceholder[2] / playerPlaceholder[1]) * 100);
					
					self.set('currentRound', lastPlayedRound);
					self.set('userScore', userWinRatio);
				}
			});
		},
		
		goToNextRound: function(lastRound) {
			var nextRoundNumber = this.get('currentRoundNumber') + 1;
			var roundModel = _.find(this.rounds, function(round) {
				return round.roundNumber == roundNumber;
			});

			if (!roundModel) {
				return;
			}


		},
		// Internal utils
		// ==============
		_createNewEdgeRound: function() {
			var newRoundConfig = {
				roundNumber = this.get('rounds').length;
			};

			var newRound = new Models.Round(newRoundConfig);
			this.get('rounds').push(newRound); // Is this really how to do this?
		},
		_pushNewRound: function() {},
		_trimRounds: function() {
			// USE THIS TO KEEP THE ROUNDS ARRAY SMALL
		}
	});

	////////////////////////////////////////////////////////////////////////////////
	Models.Round = Backbone.Model.extend({
		initialize: function() {
			// Make a round view using the round
		},
		playSong: function() {},
		compareAge: function() {},
		endRound: function() {
			this.trigger('currentRoundOver'); // THIS LOOKS GHETTO AND WRONG
		},
		
	});
})();