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
  Game.NUM_INVADERS = 39;
  Game.BOUNDS = {
      boundX: Game.DIM_X / 5,
      boundY: Game.DIM_Y / 10,
      boundX_MAX: Game.DIM_X * .8,
      gameOver: Game.DIM_Y - 2*(SpaceInvaders.Ship.RADIUS)
    };

  Game.COUNTER = 0;



  // Adding Objects

  Game.prototype.add = function (obj) {
    if (obj instanceof SpaceInvaders.Invader) {
      this.invaders.push(obj);
    } else if (obj instanceof SpaceInvaders.Ship) {
      this.ship.push(obj);
    } else if (obj instanceof SpaceInvaders.Bullet) {
      this.bullets.push(obj);
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
        game: this,
        lives: 2
      }));

    this.add(ship);

    return ship;
  };

  Game.prototype.addBullets = function () {
    var ship = this.ship[0];
    this.add(new SpaceInvaders.Bullet({
      pos: [ship.pos[0], ship.pos[1]],
      game: this,
      vel: [0, -5]
    }));

    return this.bullets;

  }

  Game.prototype.allObjects = function () {
    return []
            .concat(this.ship)
            .concat(this.invaders)
            .concat(this.bullets);
  }


 

  // Drawing Objects
Game
  .prototype.drawAll = function(ctx) {
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
    this.bullets.forEach(function (obj){
      obj.move();
    })
  };

  Game.prototype.step = function () {
    Game.COUNTER += 1
    this.moveInvaders();
    this.moveShip();
    this.moveBullet();
    this.checkCollisions();
    if (Game.COUNTER % 100 === 0) {
      this.invaderFire();  
    }
    
  };

  Game.prototype.lose = function () {
    var game = this;
    var bool = false;
    if (this.ship.length === 0) {
      bool = true;
    } else {
      this.invaders.forEach(function (obj) {
          if (obj.pos[1] >= Game.DIM_Y - 2*(SpaceInvaders.Ship.RADIUS)) {
            bool = true;
          }
        });
    }
    return bool;

  };

  // Checking Collisions

  Game.prototype.remove = function (object) {
    if (object instanceof SpaceInvaders.Invader) {
      this.invaders.splice(this.invaders.indexOf(object), 1)
    } else if (object instanceof SpaceInvaders.Bullet) {
        this.bullets.splice(this.bullets.indexOf(object), 1)
    } else if (object instanceof SpaceInvaders.Ship) {
        this.ship.splice(this.ship.indexOf(object), 1)
    } 
  }




  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 === obj2) {
          return ;
        } else {
          if (obj1.isCollidedWith(obj2)) {
            obj1.collideWith(obj2);
          }
        }
      })
    })
  }


  // Invader bullets

  Game.prototype.invaderCanFire = function () {
    var game = this;
    var invaderShooters = [];
    game.invaders.forEach(function (obj1) {
      var bool = true;
      game.invaders.forEach(function (obj2) {
        if (obj1 === obj2) {

        } else if ((obj2.pos[0] === obj1.pos[0]) && (obj2.pos[1] === obj1.pos[1] + 30)) {
          bool = false;
        }
      })
        if (bool) {
          invaderShooters.push(obj1);
        }
    })
    return invaderShooters;
  };

  Game.prototype.invaderFire = function () {
    var shooters = this.invaderCanFire();
    shooters.forEach(function (obj) {
      obj.fireBullet();
    })
  }

})();
