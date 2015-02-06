(function () {
	if (typeof SpaceInvaders === "undefined") {
		window.SpaceInvaders = {};
	}

	var Bullet = SpaceInvaders.Bullet = function (options) {
		options.pos = options.pos;
		options.radius = Bullet.RADIUS;
		options.color = Bullet.COLOR;
		options.vel = options.vel;
		this.bulletType = options.bulletType;

		SpaceInvaders.MovingObject.call(this, options);
	};

	Bullet.COLOR = "#0c6"
	Bullet.RADIUS = 4;

	SpaceInvaders.Util.inherits(Bullet, SpaceInvaders.MovingObject)


	Bullet.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

	Bullet.prototype.move = function () {
		this.pos[1] += this.vel[1]; 
	}

	Bullet.prototype.collideWith = function (otherObj) {
		if (otherObj instanceof SpaceInvaders.Invader) {
			if (this.bulletType === "ship") {
				this.game.shipBullets -= 1;
				this.remove();
				otherObj.remove();
				
			}
		} else if (otherObj instanceof SpaceInvaders.Ship) {
			if (this.bulletType === "invader") {
				this.remove();
				if (otherObj.lives === 1) {
					otherObj.remove();
				} else {
					otherObj.lives -= 1;
				}
				
			}
		}
	}

})();