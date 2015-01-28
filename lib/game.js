(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Game = SpaceInvaders.Game = function () {
    this.invaders = [];
    this.ship = [];
    this.bullets = [];
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 800;
  Game.BG_COLOR = "#CCFFFF";
  Game.FPS = 32;
  Game.NUM_INVADERS = 3;
  Game.BOUNDS = {
      boundX: Game.DIM_X/10,
      boundY: Game.DIM_Y/10
    };

  Game.prototype.add = function (obj) {
    if (obj instanceof SpaceInvaders.Invader) {
      this.invaders.push(obj);
    } else if (obj instanceof SpaceInvaders.Ship) {
      this.ship.push(obj);
    }
  };

  Game.prototype.addInvaders = function () {

    for (var i = 0; i < Game.NUM_INVADERS; i++) {
      this.add(
        new SpaceInvaders.Invader({ 
          game: this,
          pos: this.invaderPosition()
        })
      )
    }

    return this.invaders;
  };

  Game.prototype.addShip = function () {
    this.add(new SpaceInvaders.Ship({
        pos: this.shipPosition(),
        game: this
      }));

      return this.ship;
  };

  Game.prototype.allObjects = function () {
    return []
            .concat(this.ship)
            .concat(this.invaders);
  }

  Game.prototype.drawAll = function(ctx) {
    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    })
  }



  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);

    this.addShip();
    this.addInvaders();
    this.drawAll(ctx);
  };



  Game.prototype.shipPosition = function () {
    return [
      Game.DIM_X * (1/2),
      Game.DIM_Y - 2*(SpaceInvaders.Ship.RADIUS)
    ];
  };

  Game.prototype.invaderPosition = function () {
    if (this.invaders.length === 0) {
      return [Game.BOUNDS.boundX, Game.BOUNDS.boundY];
    } else {
      var lastInvader = this.invaders[this.invaders.length-1];
      var lastInvaderX = lastInvader.pos[0];
      var lastInvaderY = lastInvader.pos[1];
      if (this.isWithinBounds(lastInvaderX)) {
        return [( 30 + lastInvaderX), (lastInvaderY)];
      } else {
        return [Game.BOUNDS.boundX, lastInvaderY + 30];
      }
    }
  };

  Game.prototype.isWithinBounds = function (posX) {
    return ((posX <= (Game.DIM_X - Game.BOUNDS.boundX))
             && (posX >= Game.BOUNDS.boundX)); 
  }
  // Game.prototype.moveObjects = 
})();
