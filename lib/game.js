(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Game = SpaceInvaders.Game = function () {
    this.invaders = [];
    this.ship = [];
    this.bullets = [];

    this.addInvaders();
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 800;
  Game.BG_COLOR = "#CCFFFF";
  Game.FPS = 32;
  Game.NUM_INVADERS = 40;
  Game.BOUNDS = {
      boundX: Game.DIM_X / 5,
      boundY: Game.DIM_Y / 10,
      boundX_MAX: Game.DIM_X * .8,
      gameOver: Game.DIM_Y - 2*(SpaceInvaders.Ship.RADIUS)
    };




  // Adding Objects

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
    var ship = (new SpaceInvaders.Ship({
        pos: this.shipPosition(),
        game: this
      }));

    this.add(ship);

    return ship;
  };

  Game.prototype.allObjects = function () {
    return []
            .concat(this.ship)
            .concat(this.invaders);
  }


 

  // Drawing Objects

  Game.prototype.drawAll = function(ctx) {
    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    })
  }



  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);

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
      return [Game.BOUNDS.boundX*(1.25), Game.BOUNDS.boundY];
    } else {
      var lastInvader = this.invaders[this.invaders.length-1];
      var lastInvaderX = lastInvader.pos[0];
      var lastInvaderY = lastInvader.pos[1];
      if (this.isWithinBounds(lastInvaderX, .25)) {
        return [( 30 + lastInvaderX), (lastInvaderY)];
      } else {
        return [Game.BOUNDS.boundX*(1.25), lastInvaderY + 30];
      }
    }
  };

  Game.prototype.isWithinBounds = function (posX, percent) {
    return ((posX <= (Game.BOUNDS.boundX_MAX * (1-percent)))
             && (posX >= Game.BOUNDS.boundX * (1+percent)));  
  };



  // Object Movement

  Game.prototype.moveInvaders = function () {
    var bool = true;
    var game = this;
    this.invaders.forEach(function (obj) {
      if (!game.isWithinBounds(obj.pos[0], 0)) {
        bool = false;
      }
    })

    if (bool) {
      this.invaders.forEach(function (obj) {
        obj.move();
      });
    } else {
      this.invaders.forEach(function (obj) {
        bool = true;
        obj.moveDown();
      });

    }

  };

  Game.prototype.moveShip = function () {
    
      this.ship[0].move();


  };

  Game.prototype.moveBullet = function () {

  };

  Game.prototype.step = function () {
    this.moveInvaders();
    this.moveShip();
  };

  Game.prototype.lose = function () {
    var game = this;
    var bool = false;
    this.invaders.forEach(function (obj) {
        if (obj.pos[1] >= Game.DIM_Y - 2*(SpaceInvaders.Ship.RADIUS)) {
          bool = true;
        }
      });
    return bool;
  }

})();
