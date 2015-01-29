(function () {
	if (typeof SpaceInvaders === "undefined") {
		window.SpaceInvaders = {};
	}

	function randomColor () {
		var hexDigits = "0123456789ABCDEF";

		var color = "#";
		for (var i = 0; i < 3; i++) {
			color += hexDigits[Math.round((Math.random() * 16))];
		}

		return color;
	}

	var Ship = SpaceInvaders.Ship = function (options) {
		options.radius = Ship.RADIUS;
		options.vel = options.vel || [0, 0];
		options.color = options.color || randomColor();
		SpaceInvaders.MovingObject.call(this, options)
	};

	Ship.RADIUS = 15;

	SpaceInvaders.Util.inherits(Ship, SpaceInvaders.MovingObject);

	Ship.prototype.move = function () {
		this.pos[0] += this.vel[0];
	}
	Ship.prototype.power = function (impulse) {
		this.vel[0] += impulse;
	}


	Ship.prototype.relocate = function () {
		this.pos = this.game.shipPosition();
		this.vel = [0, 0];
	};



})();