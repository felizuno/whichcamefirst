(function() {
	window.WCF = {
		Utils: {},
		init: function() {
			var self = this;
			
			this.user = new Models.User(this.Utils.fakeUserConfig);
			this.currentGame = new Models.Game({difficulty: 'easy'}); // this.Utils.fakeGameConfig);

			this.headerBar = new Views.HeaderBar({});
			this.appPanel = new Views.Panel({
				title: 'You log in using one of your existing accounts:',
				id: 'apppanel',
				package: $.trim($('#login-view-template').html())
			});

			this.userPanel = new Views.Panel({
				title: 'New Game - Choose a game type:',
				id: 'userpanel',
				package: $.trim($('#game-type-chooser-template').html())
			});

			setTimeout(function() {
				self.appPanel.show();
			}, 2000);
		}
	};

	$(document).ready(function() {
		WCF.init();
	});
})();