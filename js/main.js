(function() {
	window.WCF = {
		Utils: {
			chartMaker: {},
			fakeUser: {
				authToken: '8df7g6as9as8fguh',
				id: 'foo',
				vanityName: 'John Doe',
				games: [
					'gameId123',
					'gameId456',
					'gameId789'
				],
				currentGame: 'gameId123',
				settings: {
					extraHard: false
				}
			},

			fakeGame: {
				players: [
					'userId1:3',
					'userId2:2',
					'userId3:2',
					'userId4:0'
				],
				rounds: [
					{
						albumA: 'albumId',
						albumB: 'albumId2',
						results: [
							'userId1',
							'userId2',
							'%%%',
							'userId3'
						]
					},
					{
						albumA: 'albumId',
						albumB: 'albumId2',
						results: [
							'userId1',
							'userId3',
							'%%%',
							'userId2'
						]
					},
					{
						albumA: 'albumId',
						albumB: 'albumId2',
						results: [
							'userId1',
							'%%%'
						]
					}
				],
				nextRound: {
					albumA: 'albumId',
					albumB: 'albumId2',
					results: [
						'%%%'
					]					
				},
				settings: {
					dateRange: [1994, 2013],
					isPrivate: true
				}
			}
		},

		init: function() {
			this.homeView = new Views.homeView();
			
			this.user = new Models.User(this.Utils.fakeUser);
			this.currentGame = new Models.Game(this.Utils.fakeGame);
		}
	};


	$(document).ready(function() {
		WCF.init();
	});
})();