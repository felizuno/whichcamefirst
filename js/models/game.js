(function() {
  
  Models.Game = Backbone.Model.extend({
    initialize: function(config) {
      this.set('pastRounds', []); // this should be a Backbone collection
      this.set('userPanel', new Views.Panel({
        title: 'New Game - Choose a game type:',
        id: 'userpanel',
        package: $.trim($('#game-type-chooser-template').html())
      }));
      this.listenTo(this.get('userPanel'), 'gamechosen', this.updateDecade);
      this.on('change:dateRange', this.setNewRound);
    },

    updateDecade: function() {
      var decadeKey = this.get('userPanel').chosenDecade;
      var open = decadeKey.replace('s', '');
      var close = decadeKey.replace('0s', '9');
      this.set('dateRange', [open, close]);
    },

    setNewRound: function() {
      console.log('$$$$$$$$$');
      if (this.get('currentRound')) {
       this.get('pastRounds').push(this.get('currentRound'));
       this.set('currentRound', null);
      } 
      this.set('currentRound', new Models.Round(this.get('dateRange')));
      this.listenTo(this.get('currentRound'), 'roundover', this.setNewRound);
    }
  });

})();
