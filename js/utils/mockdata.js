(function() {
	_.extend(WCF.Utils, {
		fakeUserConfig: {
			authToken: '8df7g6as9as8fguh',
			id: 'userId1',
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
				'userId1:3:1',
				'userId2:2:1',
				'userId3:2:0',
				'userId4:1:0'
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
					albumA: 'a1522320',
					albumB: 'a690755',
					results: [
						'%%%'
					]
				}
			],
			settings: {
				dateRanges: [1994, 2013],
				isPrivate: true
			}
		}
	});
})();