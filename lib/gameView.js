(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var GameView = SpaceInvaders.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    // this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.MOVES = {
    "left": [-1, 0],
    "right": [1, 0]
  };

  GameView.prototype.start = function () {
    var gameView = this;

    // this.timerId = setInterval(
    //   function () {
        gameView.game.draw(gameView.ctx);
    //   }, 1000/SpaceInvaders.Game.FPS
    //   );
  };
  
})();
