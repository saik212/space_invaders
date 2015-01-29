(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }


  var Invader = SpaceInvaders.Invader = function (options) {
    options.vel = options.vel;
    options.pos = options.pos;
    options.radius = Invader.RADIUS;
    options.color = Invader.COLOR;

    options.lives = options.lives;

    this.direction = options.direction;

    SpaceInvaders.MovingObject.call(this, options);
  };

  Invader.RADIUS = 10;
  Invader.COLOR = "#000";

  SpaceInvaders.Util.inherits(Invader, SpaceInvaders.MovingObject);

  Invader.prototype.move = function () {

    this.pos = [this.pos[0] + this.direction, this.pos[1] ];
  
  };

  Invader.prototype.moveDown = function () {
    this.direction *= -1;
    this.pos = [this.pos[0] + this.direction, this.pos[1] + 30];
  }

  Invader.prototype.fireBullet = function () {
    var bulletVel = [0, 5];
    var bullet = new SpaceInvaders.Bullet({
      pos: [this.pos[0], this.pos[1]],
      vel: bulletVel,
      game: this.game,
      bulletType: "invader"
    });
    this.game.add(bullet);
  }

  Invader.prototype.collideWith = function (otherObject) {
    // if (typeof otherObject === "Ship" ) {
    //   if (otherObject.lives === 0) {
    //     otherObject.remove();
    //   } else {
    //     otherObject.relocate();
    //   }
    // }
  };


})();
