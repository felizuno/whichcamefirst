(function() {

	window.Utils = {
      getRandom: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },

      getSecondRandom: function(min, max, taken) {
        var result = getRandom(min, max);
        if (result === taken) {
          return getSecondRandom(min, max, taken);
        } else { return result; }
      }
	};

})();