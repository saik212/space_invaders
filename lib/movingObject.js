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
    this.direction = options.direction;
    this.image = new Image();
    this.image.src = "vendor/invader-sprite.png";
  };

  MovingObject.prototype.collideWith = function (otherObject) {
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.drawImage( this.image, 10, 5, 120, 120, this.pos[0] - 35/2, this.pos[1] - 35/2, 35, 35);
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = SpaceInvaders.Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };


  MovingObject.prototype.move = function () {
  };

  MovingObject.prototype.moveDown = function () {
  }

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
})();
