(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Game = SpaceInvaders.Game = function () {
    this.invaders = [];
    this.ship = [];
    this.bullets = [];
  }

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.BG_COLOR = "#CCFFFF";
  Game.FPS = 32;
  Game.NUM_INVADERS = 8;


  Game.prototype.addInvaders = function () {
    for (var i = 0; i < NUM_INVADERS; i++) {
      this.invaders.push(
        new SpaceInvaders.Invader({ game: this})
      )
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle(Game.BG_COLOR);
    ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);
  };


  // Game.prototype.moveObjects = 
})
