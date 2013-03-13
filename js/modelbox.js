(function() {
  window.Models = {};
  /*
  * User - The global player - WCF.user
  *
  * Game - The global game object - WCF.currentGame
  *
  * Round - Contained by the game, which has the following rounds after init
  *     WCF.currentGame.rounds - An array of the rounds needed for all the games players
  *     WCF.currentGame.currentRound - The round that the player is about to play 
  *                     (or is currently playing)
  *     WCF.currentGame.nextRound - The round that should be played next if the player
  *                     enters a new round.
  *
  */

  ////////////////////////////////////////////////////////////////////////////////
  Models.User = Backbone.Model.extend({
    initialize: function() {},
    
    events: function() {
      return {
        'socialAction': 'respondToSocialAction'
      };
    },

    respondToSocialAction: function() {
      // Respond to whatever, I need to pass more arguments
    }
  });
  
  ////////////////////////////////////////////////////////////////////////////////
  Models.Game = Backbone.Model.extend({
    initialize: function() {
      this.set('competitorScores', []);
      this.resumeLastPlayedRound();
    },
    
    events: function() {
      return {
        'currentRoundOver': 'changeRound'
      };
    },

    // Round Behavior
    // ==============
    resumeLastPlayedRound: function() {
      var self = this;

      _.each(this.get('players'), function(v, i) {
        var playerData = v.split(':');
        
        var playerId = playerData[0];
        var playerCurrentRound = playerData[1];
        var playerWins = playerData[2];

        var userWinRatio = Math.floor((playerWins / (playerCurrentRound -1)) * 100);

        if (playerId == WCF.user.get('id')) {
          var lastRoundIndex = Math.floor(playerData[1] - 1);
          var lastRoundConfig = self.get('rounds')[lastRoundIndex];
          var lastPlayedRound = new Models.Round(lastRoundConfig);
          
          console.log(playerData[1]);
          self.set('currentRound', lastPlayedRound);
          self.set('userWinRate', userWinRatio);
        } else {
          self.get('competitorScores').push([playerId, userWinRatio]);
        }
      });
    },
    
    changeRound: function() {
      var nextRoundNumber = this.get('currentRoundNumber') + 1;
      var roundModel = _.find(this.get('rounds'), function(round) {
        return round.roundNumber == nextRoundNumber;
      });

      if (!roundModel) {
        this.set('currentRound', null);
        this._createNewEdgeRound();
      } else {
        this.set('currentRound', roundModel);
      }
    },

    // Internal utils
    // ==============
    _createNewEdgeRound: function(callback) {
      var _pushNewRound = function() {};
      var newRoundConfig = {
        roundNumber: this.get('rounds').length() + 1
      };

      var newRound = new Models.Round(newRoundConfig);
      this.get('rounds').push(newRound); // Is this really how to do this?

      if (!this.currentRound) {
        this.set('currentRound', newRound);
      }
    }
  });

  ////////////////////////////////////////////////////////////////////////////////
  Models.Round = Backbone.Model.extend({
    initialize: function() {
      this.set('roundView', new Views.RoundView({
        model: this,
        el: $('body')
      }));
      // Make a round view using the round
    },
    playSong: function() {},
    compareAge: function() {},
    endRound: function() {
      this.trigger('currentRoundOver'); // THIS LOOKS GHETTO AND WRONG
    },    
  });

})();
