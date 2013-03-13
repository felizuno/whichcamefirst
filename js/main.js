(function() {
	window.WCF = {
		Utils: {},
		init: function() {
			this.headerBar = new Views.HeaderBar({
				el: $('.header')
			});

			this.roundSelectView = new Views.GameSelectView({
				el: $('#gametypechooser')
			});

			this.user = new Models.User(this.Utils.fakeUserConfig);
			this.currentGame = new Models.Game(this.Utils.fakeGameConfig);
		}
	};


	$(document).ready(function() {
		WCF.init();
	});
})();