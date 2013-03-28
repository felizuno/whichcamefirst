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
			// this.appPanel = new Views.Panel({
			// 	title: 'You log in using one of your existing accounts:',
			// 	id: 'apppanel',
			// 	package: $.trim($('#login-view-template').html())
			// });

			setTimeout(function() {
				self.userPanel.show();
			}, 1000);

			///////////////// EVENTS //////////////////
			this.listenTo(this.userPanel, 'gamechosen', function() {
				this.trigger('gamechosen');
			});


		}
	}, Backbone.Events);

	$(document).ready(function() {
		WCF.init();
	});
})();