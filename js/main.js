(function() {
	window.WCF = {
		Utils: {},
		init: function() {
			// this.user = new Models.User(this.Utils.fakeUserConfig);
			// this.currentGame = new Models.Game2(); // this.Utils.fakeGameConfig);
			this.headerBar = new Views.HeaderBar({});
			this.gameSelectView = new Views.GameSelectView({});
			this.socialSelectView = new Views.SocialSelectView({});
			this.appPanel = new Views.Panel({
				title: 'Which Came First? - App panel',
				id: 'apppanel',
				package: '<button>Test button</button>'
			});
			this.userPanel = new Views.Panel({
				title: 'Which Came First? - User Input Panel',
				id: 'userpanel',
				package: '<button>Test button</button>'
			});
		}
	};

	$(document).ready(function() {
		WCF.init();
	});
})();