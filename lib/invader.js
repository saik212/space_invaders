(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }


  var Invader = SpaceInvaders.Invader = function (options) {
    options.vel = options.vel;
    options.position = options.pos;
    options.radius = Invader.RADIUS;
    options.color = Invader.COLOR;

    options.lives = options.lives;

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
