(function() {
  ////////////////////////////////////////////////////////////////////////////////
  Models.Game2 = Backbone.Model.extend({
    initialize: function() {
    	this.otherPlayers = [];
    	this.rounds =[{}]; // make [0] the player:round map, and then after that the roundNumber = [i]
    	this.player = WCF.user;
    	this.listenTo(WCF.user, 'change', this.updateUserInfo);
    	this.$header = WCF.headerBar;
    	// Make sure the UI is init before this in WCF.init()
    },

    updateUserInfo: function(isThisAThing) {
    	this.set('player', WCF.user); // This feels terrible
    	if (isThisAThing) {
	    	console.log('Game:upsateUserInfo - ', isThisAThing);
    	}
    }
  });

})();
