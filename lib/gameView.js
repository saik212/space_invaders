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

  GameView.MOVES = {
    "left": -15,
    "right": 15
  };


  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move) })
    })
  };

  GameView.prototype.start = function () {
    var gameView = this;
    console.log(this.game);
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
        if (gameView.game.lose() === true) {
          gameView.stop();
        }
      }, 1000/SpaceInvaders.Game.FPS
      );

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
      clearInterval(this.timerId);
  }
  
})();
