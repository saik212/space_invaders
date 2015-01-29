(function () {
	if (typeof SpaceInvaders === "undefined") {
		window.SpaceInvaders = {};
	}

	var Bullet = SpaceInvaders.Bullet = function (options) {
		options.pos = options.pos;
		options.radius = Bullet.RADIUS;
		options.color = Bullet.COLOR;
		options.vel = options.vel;

		SpaceInvaders.MovingObject.call(this, options);
	};

	Bullet.COLOR = "#0c6"
	Bullet.RADIUS = 4;

	SpaceInvaders.Util.inherits(Bullet, SpaceInvaders.MovingObject)

	Bullet.prototype.move = function () {
		this.pos[1] += this.vel[1]; 
	}

	Bullet.prototype.collideWith = function (otherObj) {
		if (otherObj instanceof SpaceInvaders.Invader) {
			this.remove();
			console.log('in collide with');
			console.log(otherObj);
			console.log('in collide with');
			otherObj.remove();
		}
	}

})();