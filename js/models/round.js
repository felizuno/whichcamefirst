// Lots of the brains here need to move out to the controller. This model is too smart and hides important
// behavior
(function() {
  
  Models.Round = Backbone.Model.extend({
    initialize: function() {
      var _dr =  this.get('model').get('dateRange');
      // This is a bad choice, the round should be initialized with albums from the controller.
      this.getAlbums((_dr ? _dr : null));   // This kicks off the calls to last.fm, passes the game's date range
      this.initRoundView();    // Init the round view now, so that as the albums come in it can render
    },
    
    initRoundView: function() {
      this.set('roundView', new Views.RoundView({ model: this }));
      this.listenTo(this.get('roundView'), 'playback', this.handlePlayback);
      this.listenTo(this.get('roundView'), 'submitanswer', this.respondToPlayerAnswer);
      this.listenTo(this.get('roundView'), 'endround', this.end);
    },

    getAlbums: function(rangeArray) {
      var self = this;
      var useRdioCollection = function() {
        var sources = Rdio.get('userCollection');
            // debugger;   
        var max = sources.length - 1;
        var indecies = [];
        var albums = [];
        indecies.push(Utils.getRandom(0, max));
        indecies.push(Utils.getSecondRandom(0, max, indecies[0]));
        _.each(indecies, function(v, i) {
          albums.push(sources[v])
          if (albums.length == 2) {
            self.set('albums', albums);
            console.log(self.get('albums'), self);
          }
        });
      };
      
      if (!!rangeArray) {
        var albums = [];
        var start = rangeArray[0];
        var end = rangeArray[1];
        var randomYears = [];
        randomYears.push(Utils.getRandom(start, end));
        randomYears.push(Utils.getSecondRandom(start, end, randomYears[0])); 
        _.each(randomYears, function(v, i) {
          // build last.fm api url
          var url = 'http://ws.audioscrobbler.com/2.0/?method=tag.getTopAlbums&tag=' 
              + v.toString()
              + '&limit=50&api_key=d43e672a5af20763d43866fcbbf2d201&format=json&callback=?';

          // get the data from last.fm
          $.getJSON(url, function(data) {
            var rand = Utils.getRandom(0, 49); // only asking for 50 albums right now
            var album = data.topalbums.album[rand];
            album.year = v; // this is the year we asked last.fm for
            albums.push(album);
            if (albums.length == 2) {
              self.set('albums', albums);
            }
          });
        });
      } else { // this happens if initialized w/o a range array, which is bad
        var collection = Rdio.get('userCollection');
        if (!collection || !collection.length) {
          this.listenToOnce(Rdio, 'change:userCollection', useRdioCollection);
        } else {
          useRdioCollection();
        }
      }
    },

    handlePlayback: function() {
      // play the appropriate song
    },

    respondToPlayerAnswer: function() {
      var answer = this.get('roundView').answer;
      var answerAge = 0;
      var otherAge = 0;
      _.each(this.get('albums'), function(v, i) {
        (v.name == answer) ? (answerAge = v.year || v.releaseDate) : (otherAge = v.year || v.releaseDate);
      });

      if (answerAge > otherAge) {
        this.set('win', true);
      } else {
        this.set('win', false);
      }
    },

    end: function() {
      this.trigger('roundover');
    }
  });

})();
