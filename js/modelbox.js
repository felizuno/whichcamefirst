(function() {
  window.Models = {};
  ////////////////////////////////////////////////////////////////////////////////
  Models.User = Backbone.Model.extend({
    initialize: function() {},
  });

  ////////////////////////////////////////////////////////////////////////////////
  Models.Game = Backbone.Model.extend({
    initialize: function(config) {
      this.set('difficulty', config.difficulty);
      this.set('pastRounds', []); // this should be a Backbone collection
      this.setNewRound();
    },

    setNewRound: function() {
      if (this.get('currentRound')) {
       this.get('pastRounds').push(this.get('currentRound')); 
      }
      this.set('currentRound', new Models.Round(this.get('difficulty')));
    }
  });

  ////////////////////////////////////////////////////////////////////////////////
  Models.Round = Backbone.Model.extend({
    initialize: function(difficulty) {
      this.set('albums', []);
      this.getAlbums(difficulty);
      this.initRoundView();
    },
    
    initRoundView: function() {
      this.set('roundView', new Views.RoundView({ model: this }));
      this.listenTo(this.get('roundView'), 'playback', this.handlePlayback);
    },

    getAlbums: function(difficulty) {
      var self = this;
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

      _years.push(getRandom(1990, 1999));
      _years.push(getSecondRandom(1990, 1999, _years[0]));
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
    }
  });
  
})();
