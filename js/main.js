(function() {
	window.WCF = {
		Utils: {
			chartMaker: {},
			fakeUserConfig: {
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

			fakeGameConfig: {
				owner: 'userdId1',
				players: [
					'userId1:3',
					'userId2:2',
					'userId3:2',
					'userId4:0'
				],
				rounds: [
					{
						roundNumber: 1,
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
						roundNumber: 2,
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
						roundNumber: 3,
						albumA: 'albumId',
						albumB: 'albumId2',
						results: [
							'userId1',
							'%%%'
						]
					}
				],
				nextRound: {
					roundNumber: 4,
					albumA: 'albumId',
					albumB: 'albumId2',
					results: [
						'%%%'
					]					
				},
				settings: {
					dateRanges: [1994, 2013],
					isPrivate: true
				}
			}
		},

		init: function() {
			this.homeView = new Views.homeView({
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