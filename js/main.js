(function() {
	window.Utils = {};
	window.Models = {};
	window.Views = {};
	_.extend(window.WCF = {
		init: function() {
			var self = this;

			////////////////// MODELS ///////////////////
			this.currentGame = new Models.Game(); // this.Utils.fakeGameConfig);
		    this.user = new Models.Player({model: this.currentGame});

			////////////////// VIEWS ///////////////////
			this.header = new Views.HeaderBar({ model: this.currentGame});
			this.userPanel = new Views.Panel({ // TODO: rename to inputPanel (used for user input related to the game)
				title: 'New Game - Choose a game type:',
				id: 'userpanel',
				package: $.trim($('#game-type-chooser-template').html())
			});

			this.appPanel = new Views.Panel({
				title: 'Use your Rdio account?',
				id: 'apppanel',
				package: $.trim($('#login-view-template').html())
			});

			R.ready(function() {
				if (!!window.R) {
					if (R.currentUser.get('isAnonymous')) {
						setTimeout(function() {
							self.appPanel.show();
						}, 1000);
					} else if (!Rdio.get('userCollection')) {
						Rdio.getUserCollection();
						setTimeout(function() {
							self.userPanel.show();
						}, 1000);
					}
				} else {
					// THERE IS NO R! Just roll out the other game types for now
					self.userPanel.show();
				}
			});

			///////////////// EVENTS //////////////////
			this.listenToOnce(this.appPanel, 'gordio', function() {
				this.trigger('userdio');
			});

			this.listenTo(this.userPanel, 'gamechosen', function() { // NOT ONCE - see below
				this.trigger('gamechosen'); // TODO: Add a way to show the panel and change sources
			});
		} // end init
	}, Backbone.Events);

	$(document).ready(function() {
		WCF.init();
	});
})();