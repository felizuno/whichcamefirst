(function() {
  
  Models.Game = Backbone.Model.extend({
    initialize: function(config) {
      this.set('pastRounds', []); // TODO: this should be a Backbone collection
      this.set('roundCount', 1);
      this.on('change:dateRange', this.setNewRound);
      this.listenTo(WCF, 'gamechosen', this.updateDecade);
    },

    updateDecade: function() {
      var decadeKey = WCF.userPanel.chosenDecade;   // will be in the format ###0s
      var useRdio = /Rdio/.test(decadeKey);
console.log('Use Rdio?: ' + useRdio);
      if (!useRdio) {
        var open = parseInt(decadeKey.replace('s', ''));      // i.e. 1990s -> 1990
        var close = parseInt(decadeKey.replace('0s', '9'));   // i.e. 1990s -> 1999
        this.set('dateRange', [open, close]);
      } else {
        // We're using an Rdio collection, so just launch the round
        this.setNewRound();
      }
    },

    setNewRound: function() {
       var roundNumber = this.get('roundCount') + 1;
      // Stash the old round if there is one
      if (!!this.get('currentRound')) {
        this.get('pastRounds').push(this.get('currentRound'));
        this.set('roundCount', roundNumber);
        this.set('currentRound', null);
      }
      
      // Set the new round, which will manage most of the user actions and notify us
      // when it ends with the 'roundover' event
      this.set('currentRound', new Models.Round({model: this, number: roundNumber}));
      this.listenTo(this.get('currentRound'), 'roundover', this.endOfCurrentRound);

      this.trigger('newround');
    },

    endOfCurrentRound: function() {
      var youWon = this.get('currentRound').get('win');

      if (youWon) {
        this.trigger('win');
      } else {
        this.trigger('loss');
      }
      
      this.setNewRound();
    }
  });

})();
