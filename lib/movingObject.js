(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var MovingObject = SpaceInvaders.MovingObject = function (options) {
    this.pos = options.pos;
    this.initialX = this.pos[0]; 
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.lives = options.lives;
    this.direction = 1;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    ; // default do nothing
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = SpaceInvaders.Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  // MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.move = function () {

    // if (this.game.isWithinBounds(this.pos[0] + this.direction, 0)) {
      this.pos = [this.pos[0] + this.direction, this.pos[1] ];
    // } else {
      // this.pos = [this.pos[0], this.pos[1] + 30];
      // this.direction *= -1;
    // }

    // this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];




    // if (this.game.isOutOfBounds(this.pos)) {
    //   if (this.isWrappable) {
    //     this.pos = this.game.wrap(this.pos);
    //   } else {
    //     this.remove();
    //   }
    // }
  };

  MovingObject.prototype.moveDown = function () {
    this.direction *= -1;
    this.pos = [this.pos[0] + this.direction, this.pos[1] + 30];
  }

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
})();
