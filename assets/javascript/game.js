var Game = (function() {
	var Game = {
		level: 1
		player: 1
	};

	Game.prototype.constructor = Game;

	Game.ptototype.keypressHandler = function(event) {
		console.log(event.keyCode);
	};

	return Game;
})();