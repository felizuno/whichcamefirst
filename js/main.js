(function() {
	window.WCF = {
		Utils: {},
		init: function() {
			this.user = new Models.User(this.Utils.fakeUserConfig);
			this.currentGame = new Models.Game(this.Utils.fakeGameConfig);

			this.gameSelectView = new Views.GameSelectView({
				el: $('#gametypechooser')
			});
			this.headerBar = new Views.HeaderBar({
				el: $('.header')
			});
		}
	};


	$(document).ready(function() {
		WCF.init();
	});
})();