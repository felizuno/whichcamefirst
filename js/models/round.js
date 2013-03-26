(function() {
  
  Models.Round = Backbone.Model.extend({
    initialize: function(difficulty) {
      this.set('albums', []);
      this.getAlbums(difficulty);
      this.initRoundView();
    },
    
    initRoundView: function(dateRange) {
      this.set('dateRange', dateRange)
      this.set('roundView', new Views.RoundView({ model: this }));
      this.listenTo(this.get('roundView'), 'playback', this.handlePlayback);
      this.listenTo(this.get('roundView'), 'submitanswer', this.analyzeAnswer);
      this.listenTo(this.get('roundView'), 'endround', this.end);
    },

    getAlbums: function(difficulty) {
      var self = this;
      var range = this.get('dateRange') || [2000, 2009];
      var _years = [];
      
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

      _years.push(getRandom(range[0], range[1]));
      _years.push(getSecondRandom(range[0], range[1], _years[0]));
      _.each(_years, function(v, i) {
        var url = 'http://ws.audioscrobbler.com/2.0/?method=tag.getTopAlbums&tag=' 
            + v.toString()
            + '&limit=50&api_key=d43e672a5af20763d43866fcbbf2d201&format=json&callback=?';

        $.getJSON(url, function(data) {
          var rand = getRandom(0, 50); // only asking for 50 albums right now
          var album = data.topalbums.album[rand];
          album.year = v;
          self.get('albums').push(album);
          self.trigger('update:round');
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
