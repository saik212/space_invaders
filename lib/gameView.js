(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var GameView = SpaceInvaders.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameVew.MOVES = {
    "left": [-1, 0],
    "right": [1, 0]
  };

  
});
