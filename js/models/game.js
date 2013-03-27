(function() {
  
  Models.Game = Backbone.Model.extend({
    initialize: function(config) {
      this.set('pastRounds', []); // TODO: this should be a Backbone collection
      this.on('change:dateRange', this.setNewRound);
      
      // Set up the panel where the user will input info into the game (i.e. decade choice)
      this.set('userPanel', new Views.Panel({ // TODO: rename to inputPanel (used for user input related to the game)
        title: 'New Game - Choose a game type:',
        id: 'userpanel',
        package: $.trim($('#game-type-chooser-template').html())
      }));
      // ... and listen to it for when choices are made
      this.listenTo(this.get('userPanel'), 'gamechosen', this.updateDecade);

      // player
      this.set('player', new Models.Player({model: this}));
    },

    updateDecade: function() {
      var decadeKey = this.get('userPanel').chosenDecade;   // will be in the format ###0s
      var open = parseInt(decadeKey.replace('s', ''));      // i.e. 1990s -> 1990
      var close = parseInt(decadeKey.replace('0s', '9'));   // i.e. 1990s -> 1999
      this.set('dateRange', [open, close]);
    },

    setNewRound: function() {
      // Stash the old round if there is one
      if (!!this.get('currentRound')) {
       this.get('pastRounds').push(this.get('currentRound'));
       this.set('currentRound', null);
      }
      
      // Set the new round, which will manage most of the user actions and notify us
      // when it ends with the 'roundover' event
      this.set('currentRound', new Models.Round({model: this}));
      this.listenTo(this.get('currentRound'), 'roundover', this.endOfCurrentRound);
    },

    endOfCurrentRound: function() {
      this.trigger('roundover');
      var youWon = this.get('currentRound').get('win');
      if (youWon) {
        this.trigger('win');
      }
      this.setNewRound();
    }
  });

})();
