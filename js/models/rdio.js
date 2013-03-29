(function() {

	Models.Rdio = Backbone.Model.extend({
		initialize: function() {
			this.listenToOnce(WCF, 'userdio', this.authenticateUser);
		},

		authenticateUser: function(callback) {
			var self = this;
			var k = callback || self.getUserCollection;
			R.ready(function() {
				R.authenticate(function() {
					self.trigger('userauthenticated');
					WCF.user.set('rdioKey', R.currentUser.get('key'));1
					k();
				});
			});
		},

		getUserCollection: function() {
			var collectionSuccess = function(data) {
				Rdio.set('userCollection', data.result);
				Rdio.trigger('collectionarrived')
			};

			var	fetch = function(method, content, success) {
				console.log(success);
				R.ready(function() {
					R.request({
						method: method,
						content: content,
						success: (success ? success : '')
					});
				});
			};

			if (R.currentUser.get('isAnonymous')) {
				Rdio.authenticateUser(Rdio.getUserCollection);
			}

			if (R.currentUser.get('key')) {
				var userKey = R.currentUser.get('key')
				// debugger;
				fetch('getAlbumsInCollection', {user: userKey, count: 400}, collectionSuccess);
			}
		},
	});

	window.Rdio = new Models.Rdio();

})();