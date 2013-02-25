(function() {
	// USED TO CREATE THE CHARTS FOR EACH YEAR
	var chartByYear = {
		lastFMDataStore: {},

		makeChart: function() {},

		getTracksByTag: function() {
			var self = this;

			var rawLastFMCall = function(url, yearString) {
				console.log('Asking last FM for the ' + yearString + ' list');
			 	$.getJSON(url, function(data) {
			 		self.lastFMDataStore[yearString] = data.toptracks.track;
					
					if (yearString == '2013') {
						// NEED A BETTER WAY TO MAKE SURE WE UNPACK AFTER THE LISTS ARE ALL HERE
						self._UnpackLastFMData();
					}
			 	});
			};

			var politeLastFMCall = _.throttle(rawLastFMCall, 100);

			for (var year = 1960; year <= 2013; year++) {
				var yearString = year.toString();
				var url = 'http://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=' 
						+ yearString
						+ '&limit=250&api_key=d43e672a5af20763d43866fcbbf2d201&format=json&callback=?';

				politeLastFMCall(url, yearString);
			}
		},

		//	FOR TESTING
		testLastFMCall: function(year) {
			var self = this;
			var yearString = year.toString();

			var url = 'http://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=' 
					+ yearString
					+ '&limit=250&api_key=d43e672a5af20763d43866fcbbf2d201&format=json&callback=?';

			$.getJSON(url, function(data) {
				self.lastFMDataStore[yearString] = data.toptracks.track;
			});

			// self._UnpackLastFMData();
		},

		//
		//	NOW THAT WE HAVE 250 TRACKS/YEAR FROM LAST.FM
		//	WE NEED TO GO TO RDIO AND VERIFY THE RELEASE YEAR,
		//	GET THEIR RDIO KEYS, AND REPLACE THEIR IMAGE URLS 
		//	WITH THE RDIO URLS (200, 400, 600, 1200).
		//

		_UnpackLastFMData: function() {
			_.each(this.lastFMDataStore, function(v, k) {
				console.log('Unpacking the ' + k + ' list')
				// v is an array of last.fm track objects that look like this:
				// {
				// 	"name":"Yet Again",				
				// 	"duration":"318",				
				// 	"mbid":"f4c95df8-4307-438f-9536-9b7064e9370c",				
				// 	"url":"http:\/\/www.last.fm\/music\/Grizzly+Bear\/_\/Yet+Again",				
				// 	"streamable":
				// 		{
				// 			"#text":"0",				
				// 			"fulltrack":"0"
				// 		},				
				// 	"artist":
				// 		{
				// 			"name":"Grizzly Bear",				
				// 			"mbid":"59a7fbcb-ff74-494d-abd0-9c82359040c9",
				// 			"url":"http:\/\/www.last.fm\/music\/Grizzly+Bear"
				// 		},
				// 	"image":
				// 		[
				// 			{
				// 				"#text":"http:\/\/userserve-ak.last.fm\/serve\/34s\/81830759.png",
				// 				"size":"small"
				// 			},
				// 			{
				// 				"#text":"http:\/\/userserve-ak.last.fm\/serve\/64s\/81830759.png",
				// 				"size":"medium"
				// 			},
				// 			{
				// 				"#text":"http:\/\/userserve-ak.last.fm\/serve\/126\/81830759.png",
				// 				"size":"large"
				// 			},
				// 			{
				// 				"#text":"http:\/\/userserve-ak.last.fm\/serve\/300x300\/81830759.png",
				// 				"size":"extralarge"
				// 			}
				// 		],

				// 	"@attr":
				// 		{
				// 			"rank":"1"
				// 		}
				// }
			});
		}
	};// end chartMaker

	_.extend(WCF.Utils.chartMaker, chartByYear);

})();