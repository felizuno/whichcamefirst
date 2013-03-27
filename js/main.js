(function() {
	window.Utils = {};
	window.Models = {};
	window.Views = {};
	window.WCF = {
		init: function() {
			var self = this;

			this.headerBar = new Views.HeaderBar({});
			this.appPanel = new Views.Panel({
				title: 'You log in using one of your existing accounts:',
				id: 'apppanel',
				package: $.trim($('#login-view-template').html())
			});

			this.currentGame = new Models.Game(); // this.Utils.fakeGameConfig);
			
			setTimeout(function() {
				self.currentGame.get('userPanel').show();
			}, 1000);
		}
	};

	$(document).ready(function() {
		WCF.init();
	});
})();