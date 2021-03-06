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
		options.lives = options.lives;
		options.radius = Ship.RADIUS;
		options.vel = options.vel || [0, 0];
		options.color = options.color || randomColor();
		SpaceInvaders.MovingObject.call(this, options)
	};

	Ship.RADIUS = 15;

	SpaceInvaders.Util.inherits(Ship, SpaceInvaders.MovingObject);

	Ship.prototype.draw = function (ctx) {
		ctx.drawImage( this.image, 0 , 330 , 240, 120, this.pos[0] - 35, this.pos[1],
			70, 35);
	};

	Ship.prototype.move = function () {
		if (this.pos[0] <= SpaceInvaders.Game.BOUNDS.boundX) {
			if (this.vel[0] > 0) {
				this.pos[0] += this.vel[0];
			} else {
				this.vel[0] = 0
			}
		} else if (this.pos[0] >= SpaceInvaders.Game.BOUNDS.boundX_MAX) {
			if (this.vel[0] < 0) {
				this.pos[0] += this.vel[0];
			} else {
				this.vel[0] = 0
			}
		} else {
			this.pos[0] += this.vel[0];
			this.vel[0] = 0;
		}


		this.pos[0] += this.vel[0];
	}
	Ship.prototype.power = function (impulse) {
				this.vel[0] += impulse;
	}


	Ship.prototype.relocate = function () {
		this.pos = this.game.shipPosition();
		this.vel = [0, 0];
	};

	Ship.prototype.fireBullet = function () {
		if (this.game.shipBullets === this.game.maxBullets) {return ;}
		
		var bulletVel = [0, -10];
		var bullet = new SpaceInvaders.Bullet({
			pos: [this.pos[0], this.pos[1]],
			vel: bulletVel,
			game: this.game,
			bulletType: "ship"
		});
		this.game.add(bullet);
		this.game.shipBullets += 1;
	}

})();