(function() {
  window.Models = {};
  ////////////////////////////////////////////////////////////////////////////////
  Models.User = Backbone.Model.extend({
    initialize: function() {},
  });

  ////////////////////////////////////////////////////////////////////////////////
  Models.Game = Backbone.Model.extend({
    initialize: function(config) {
      this.difficulty = config.difficulty;
      this.setNewRound();
      this.pastRounds = []; // this should be a Backbone collection
    },

    setNewRound: function() {
      if (this.get('currentRound')) {
       // this.get('pastRounds').push(this.get('currentRound')); 
      }
      this.set('currentRound', new Models.Round(this.get('difficulty')));
    }
  });

  ////////////////////////////////////////////////////////////////////////////////
  Models.Round = Backbone.Model.extend({
    initialize: function(difficulty) {
      this.getAlbums(difficulty);
      // this.initRoundView();
    },
    getAlbums: function(difficulty) {
      var self = this;
      var years = [];
      var albums = [];
      
      var getRandomYear = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      var getSecondYear = function(min, max, taken) {
        var result = getRandomYear(min, max);
        if (result === taken) {
          return getSecondYear(min, max, taken);
        } else {
          return result;
        }
      };

      years.push(getRandomYear(1990, 1999));
      years.push(getSecondYear(1990, 1999, years[0]));

      _.each(years, function(v, i) {
        var url = 'http://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=' 
            + v.toString()
            + '&limit=250&api_key=d43e672a5af20763d43866fcbbf2d201&format=json&callback=?';

        $.getJSON(url, function(data) {
          console.log(data);
          // self.get('albums').push(data);
        });
      });

    }
  });
  
})();
