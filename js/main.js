(function() {
	window.WCF = {
		Utils: {},
		init: function() {
			this.coreUI = new Views.coreUI({
				el: $('body')
			});

			this.user = new Models.User(this.Utils.fakeUserConfig);
			this.currentGame = new Models.Game(this.Utils.fakeGameConfig);
		}
	};


	$(document).ready(function() {
		WCF.init();
	});
})();