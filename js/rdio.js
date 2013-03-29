(function() {

	window.Rdio = {
		defaults: {
			self: this,
			collectionSuccess: function(data) {
				self.userCollection = data.result;
				self.trigger('collectionarrived')
			}
		},

		_get: function(method, content, success) {
			R.ready(function() {
				R.request({
					method: method,
					contest: context:
					success: (success ? success : '')
				});
			});
		},

		authenticateUser: function(callback) {
			var self = this;
			R.ready(function() {
				R.authenticate(function() {
					self.trigger('userauthenticated');
					callback();
				});
			});
		},

		getUserCollection: function() {
			if (this.currentUser.isAnonymous()) {
				this.authenticateUser(this.getUserCollection);
			}

			if (this.currentUser.get()'key') {
				var userKey = R.currentUser.get('key')
				this._get('userCollection', {key: userKey, count: 400}, this.defaults.collectionSuccess);
			}
		},
	};

})();