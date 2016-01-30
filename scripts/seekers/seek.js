define(function(require, exports, module) {
  // 0 - empty space
  // 1 - cactus 1
  // 2 - cactus 2

  var EasyStar = require('easystar');

  var MAP = [
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0],
    [0,0,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]
  ];

  var TILE_SIZE = 35;

  var DIRECTIONS = {
    N:    {x: -1, y: -1},
    S:    {x:  1, y:  1},
    E:    {x:  1, y: -1},
    W:    {x: -1, y:  1},
    SE:   {x:  1, y:  0},
    NW:   {x: -1, y:  0},
    SW:   {x:  0, y:  1},
    NE:   {x:  0, y: -1},
    STOP: {x:  0, y:  0},
  };

  function applyDirection(object, name, speed) {
    var direction = DIRECTIONS[name] || DIRECTIONS['STOP'];

    object.body.velocity.x = direction.x * speed;
    object.body.velocity.y = direction.y * speed;
  }

  function seek(map, tileSize, target, enemies, callback) {
    if (!callback) {
      callback = function(enemy, direction) {
        applyDirection(enemy, direction, 90)
      }
    }

    function tilePosition(position) {
      position = Math.floor(position / tileSize);

      if (position < 0) return 0;
      if (position > 28) return 28;

      return position;
    }

    var easystar = new EasyStar.js();

    easystar.setGrid(map);
    easystar.setIterationsPerCalculation(1000);
    easystar.setAcceptableTiles([0]);
    easystar.enableDiagonals();

    var interval = setInterval(function(){
      var currentPlayerXtile = tilePosition(target.body.position.x);
      var currentPlayerYtile = tilePosition(target.body.position.y);

      enemies.forEach(function(enemy) {
        if (!enemy.visible) {
          return;
        }

        var currentCowboyXtile = tilePosition(enemy.body.position.x);
        var currentCowboyYtile = tilePosition(enemy.body.position.y);

        easystar.findPath(currentCowboyXtile, currentCowboyYtile, currentPlayerXtile, currentPlayerYtile, function(path) {
          if (!path) {
            return callback(enemy, 'STOP');
          }

          var currentNextPointX = path[1].x;
          var currentNextPointY = path[1].y;

          if (currentNextPointX < currentCowboyXtile && currentNextPointY < currentCowboyYtile) {
            return callback(enemy, "NW");
          }

          if (currentNextPointX == currentCowboyXtile && currentNextPointY < currentCowboyYtile) {
            return callback(enemy, "N");
          }

          if (currentNextPointX > currentCowboyXtile && currentNextPointY < currentCowboyYtile) {
            return callback(enemy, "NE");
          }

          if (currentNextPointX < currentCowboyXtile && currentNextPointY == currentCowboyYtile) {
            return callback(enemy, "W");
          }

          if (currentNextPointX > currentCowboyXtile && currentNextPointY == currentCowboyYtile) {
            return callback(enemy, "E");
          }

          if (currentNextPointX > currentCowboyXtile && currentNextPointY > currentCowboyYtile) {
            return callback(enemy, "SE");
          }

          if (currentNextPointX == currentCowboyXtile && currentNextPointY > currentCowboyYtile) {
            return callback(enemy, "S");
          }

          if (currentNextPointX < currentCowboyXtile && currentNextPointY > currentCowboyYtile) {
            return callback(enemy, "SW");
          }

          return callback(enemy, 'STOP');
        });
      });

      easystar.calculate();
    }, 200);

    return function() {
      if (interval) {
        clearInterval(interval);
        interval = null;
        easystar = null;
      }
    };
  }

  var Seek = function (game) {
    this.game = game;
  };

  Seek.prototype = {
    preload: function () {
      this.game.load.image('obstacle1', 'assets/test/obstacle1.png');
      this.game.load.image('obstacle2', 'assets/test/obstacle2.png');

      this.game.load.image('tile', 'assets/test/ground.png');

      this.game.load.image('E', 'assets/test/controls/E.png');
      this.game.load.image('N', 'assets/test/controls/N.png');
      this.game.load.image('NE', 'assets/test/controls/NE.png');
      this.game.load.image('NW', 'assets/test/controls/NW.png');
      this.game.load.image('S', 'assets/test/controls/S.png');
      this.game.load.image('SE', 'assets/test/controls/SE.png');
      this.game.load.image('SW', 'assets/test/controls/SW.png');
      this.game.load.image('W', 'assets/test/controls/W.png');

      this.game.load.spritesheet('characterAnim','assets/test/character.png');
      this.game.load.spritesheet('creep','assets/test/enemy.png');

      this.game.time.advancedTiming = true;
      this.game.world.setBounds(0, 0, MAP.length * TILE_SIZE, MAP[0].length * TILE_SIZE);
    },
    create: function () {
      var floorGroup = this.game.add.group();

      this.obstacleGroup = this.game.add.group();

      for (var yt = 0; yt < MAP.length; yt++) {
        var tile = MAP[yt];
        for (var xt = 0; xt < tile.length; xt++) {
          var floorTile = this.game.add.sprite(xt * TILE_SIZE, yt * TILE_SIZE, 'tile');
          floorGroup.add(floorTile);

          if (tile[xt] == 1 || tile[xt] == 2) {
            var obstacle = this.game.add.sprite(xt * TILE_SIZE, yt * TILE_SIZE, 'obstacle' + tile[xt]);
            this.obstacleGroup.add(obstacle);

            this.game.physics.arcade.enable(obstacle);

            obstacle.body.collideWorldBounds = true;
            obstacle.body.immovable = true;
          }
        }
      }

      var controls = this.game.add.group();

      controls.add(addButton.call(this, this.game.add.sprite(0, 100, 'NW')));
      controls.add(addButton.call(this, this.game.add.sprite(0, 176, 'W')));
      controls.add(addButton.call(this, this.game.add.sprite(0, 252, 'SW')));
      controls.add(addButton.call(this, this.game.add.sprite(76, 100, 'N')));
      controls.add(addButton.call(this, this.game.add.sprite(76, 252, 'S')));
      controls.add(addButton.call(this, this.game.add.sprite(152, 100, 'NE')));
      controls.add(addButton.call(this, this.game.add.sprite(152, 176, 'E')));
      controls.add(addButton.call(this, this.game.add.sprite(152, 252, 'SE')));
      controls.alpha = 0.6;

      this.player = this.game.add.sprite(350, 280, 'characterAnim');

      this.obstacleGroup.add(this.player);

      this.game.physics.arcade.enable(this.player);

      this.player.body.collideWorldBounds = true;

      this.game.camera.follow(this.player);

      this.enemies = [[6, 10], [10, 2]].map(function(tile) {
        var enemy = this.game.add.sprite(tile[0] * TILE_SIZE, tile[1] * TILE_SIZE, 'creep');

        this.obstacleGroup.add(enemy);

        this.game.physics.arcade.enable(enemy);

        enemy.body.collideWorldBounds = true;
        enemy.body.bounce.set(0.2, 0.2, 0);
        enemy.body.drag.set(100, 100, 0);

        return enemy;
      }, this);

      seek(MAP, TILE_SIZE, this.player, this.enemies);
    },
    update: function () {
      applyDirection2(this.player, 100);

      this.game.physics.arcade.collide(this.obstacleGroup);
    },
  };

  var DIRECTIONS = {
    N:    {x: -1, y: -1},
    S:    {x:  1, y:  1},
    E:    {x:  1, y: -1},
    W:    {x: -1, y:  1},
    SE:   {x:  1, y:  0},
    NW:   {x: -1, y:  0},
    SW:   {x:  0, y:  1},
    NE:   {x:  0, y: -1},
    STOP: {x:  0, y:  0},
  };

  function applyDirection2(object, speed) {
    var direction = DIRECTIONS[object.direction] || DIRECTIONS['STOP'];

    object.body.velocity.x = direction.x * speed;
    object.body.velocity.y = direction.y * speed;
  }

  function addButton(button) {
    button.fixedToCamera = true;
    button.inputEnabled = true;
    button.events.onInputDown.add(onDown, this);
    button.events.onInputOver.add(onDown, this);
    button.events.onInputUp.add(onUp, this);
    button.events.onInputOut.add(onUp, this);

    return button;
  }

  // create control functions for the control buttons
  function onDown(sprite, pointer) {
    this.player.direction = sprite.key;
  }

  function onUp(sprite, pointer) {
    this.player.direction = 'STOP';
  }

  return function() {
    var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'test', null, false, true);
    game.state.add('Seek', Seek);
    game.state.start('Seek');
  };
});
