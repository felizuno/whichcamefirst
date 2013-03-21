(function() {
	window.WCF = {
		Utils: {},
		init: function() {
			this.user = new Models.User(this.Utils.fakeUserConfig);
			this.currentGame = new Models.Game2(); // this.Utils.fakeGameConfig);

			this.socialSelectView = new Views.SocialSelectView({
				el: $('#loginpanel')
			});
			
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