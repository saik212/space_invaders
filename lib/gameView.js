(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var GameView = SpaceInvaders.GameView = function (ctx) {
    this.game;
    this.ctx = ctx;
    this.ship;
    this.timerId = null;
    this.gamePresent = false;
  };

  GameView.MOVES = {
    "left": -15,
    "right": 15
  };


  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    key("space", function () { ship.fireBullet() });

  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        if (gameView.game.lose() === true) {

          gameView.game.drawLose(gameView.ctx);
          gameView.stop();
          gameView.gamePresent = false;
          setTimeout(function () {gameView.startScreen()}, 2500);

        } else {

          gameView.game.draw(gameView.ctx);
          gameView.game.step();
          
        }
      }, 1000/SpaceInvaders.Game.FPS
      );

    this.bindKeyHandlers();
  };

  GameView.prototype.startScreen = function () {
    var gameView = this;

    key("enter", function () { 
      if (!gameView.gamePresent) {
        gameView.game = new SpaceInvaders.Game();
        gameView.gamePresent = true;
        gameView.ship = gameView.game.addShip();
        gameView.start();
      }
    });
        gameView.startMenu(gameView.ctx);

  }

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  }

  GameView.prototype.startMenu = function (ctx) {
    ctx.clearRect(0,0, SpaceInvaders.Game.DIM_X, SpaceInvaders.Game.DIM_Y);
    ctx.fillStyle = SpaceInvaders.Game.BG_COLOR;
    ctx.fillRect(0,0,SpaceInvaders.Game.DIM_X, SpaceInvaders.Game.DIM_Y);

    ctx.font = "16px serif";
    ctx.fillStyle = "#f00";
    ctx.fillText("Press ENTER To Play", SpaceInvaders.Game.DIM_X/2 - 40, SpaceInvaders.Game.DIM_Y/2);
  }
  
})();
