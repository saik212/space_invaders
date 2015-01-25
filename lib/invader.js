(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }


  var Invader = SpaceInvaders.Invader = function (options) {
    this.vel = options.vel;
    this.position = options.pos;
    this.radius = Invader.RADIUS;
    this.color = Invader.COLOR;

    this.lives = options.lives;

    SpaceInvaders.MovingObject.call(this, options);
  };

  Invader.RADIUS = 10;
  Invader.COLOR = "#000";

  SpaceInvaders.Util.inherits(Invader, SpaceInvaders.MovingObject)

  Invader.prototype.collideWith = function (otherObject) {
    // if (typeof otherObject === "Ship" ) {
    //   if (otherObject.lives === 0) {
    //     otherObject.remove();
    //   } else {
    //     otherObject.relocate();
    //   }
    // }
  };



});
