(function() {
  
  Models.Round = Backbone.Model.extend({
    initialize: function() {
      this.set('albums', []);                               // Later the albums from last.fm will go in here
      this.getAlbums(this.get('model').get('dateRange'));   // This kicks off the calls to last.fm, passes the game's date range
      this.initRoundView();                                 // Init the round view now, so that as the albums come in it can render
    },
    
    initRoundView: function() {
      this.set('roundView', new Views.RoundView({ model: this }));
      this.listenTo(this.get('roundView'), 'playback', this.handlePlayback);
      this.listenTo(this.get('roundView'), 'submitanswer', this.analyzeAnswer);
      this.listenTo(this.get('roundView'), 'endround', this.end);
    },

    getAlbums: function(rangeArray) {
      var self = this;      
      var start = rangeArray[0];
      var end = rangeArray[1];
      
      var getRandom = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      var getSecondRandom = function(min, max, taken) {
        var result = getRandom(min, max);
        if (result === taken) {
          return getSecondRandom(min, max, taken); // Check with Ian if the return is required, or just the call
        } else {
          return result;
        }
      };

      var albums = [];
      var randomYears = [];
      randomYears.push(getRandom(start, end));
      randomYears.push(getSecondRandom(start, end, randomYears[0])); 
      _.each(randomYears, function(v, i) {
        // build last.fm api url
        var url = 'http://ws.audioscrobbler.com/2.0/?method=tag.getTopAlbums&tag=' 
            + v.toString()
            + '&limit=50&api_key=d43e672a5af20763d43866fcbbf2d201&format=json&callback=?';

        // get the data from last.fm
        $.getJSON(url, function(data) {
          var rand = getRandom(0, 49); // only asking for 50 albums right now
          var album = data.topalbums.album[rand];
          album.year = v; // this is the year we asked last.fm for
          albums.push(album);
          if (albums.length == 2) {
            self.set('albums', albums);
          }
        });
      });
      
    },

    handlePlayback: function() {
      // play the appropriate song
    },

    analyzeAnswer: function() {
      var answer = this.get('roundView').answer;
      var answerAge = 0;
      var otherAge = 0;
      _.each(this.get('albums'), function(v, i) {
        (v.name == answer) ? (answerAge = v.year) : (otherAge = v.year);
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
