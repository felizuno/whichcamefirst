(function() {
  ////////////////////////////////////////////////////////////////////////////////
  Models.Game2 = Backbone.Model.extend({
    initialize: function() {
    	this.otherPlayers = [];
    	this.rounds = [{}]; // make [0] the player:round map, and then after that the roundNumber = [i]
    	this.player = WCF.user;
    	this.$header = WCF.headerBar;
    	// Make sure the UI is init before this in WCF.init()
    },

    createNextRound: function(config) {
    }
  });

  Models.GameRound = Backbone.Model.extend({
  	initialize: function() {
  		this.getAlbums();
  		this.initRoundView();
  	},
  	// getAlbums: function(/*) {
  	// 	var album1 = this.
  	// 	var self = this;
  	// 	R.ready(function() {
  	// 		R.request({
  	// 			method: 'search',
  	// 			content: {
  	// 				query: albumName,
  	// 				type: 'Album',
  	// 				extras: '-*,icon,key,artistKey'
  	// 			},
  	// 			success: function(data) {
  	// 				var album = data.result.results[0];
  	// 			}
  	// 		})
  	// 	});
  	// }*/
  });

})();
