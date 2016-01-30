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

  var TILE_SIZE = 100;

  function random(num) {
    return Math.round(Math.random() * num);
  }

  var seek = require('seek');

  var Demo = function (game) {
    this.game = game;
  };

  Demo.prototype = {
    preload: function () {
      this.game.load.image('obstacle_0', 'assets/map/obstacle_0.jpg');
      this.game.load.image('obstacle_1', 'assets/map/obstacle_1.jpg');
      this.game.load.image('obstacle_2', 'assets/map/obstacle_2.jpg');
      this.game.load.image('obstacle_3', 'assets/map/obstacle_3.jpg');

      this.game.load.image('ground_0', 'assets/map/ground_0.jpg');
      this.game.load.image('ground_1', 'assets/map/ground_1.jpg');
      this.game.load.image('ground_2', 'assets/map/ground_2.jpg');
      this.game.load.image('ground_3', 'assets/map/ground_3.jpg');
      this.game.load.image('ground_4', 'assets/map/ground_4.jpg');
      this.game.load.image('ground_5', 'assets/map/ground_5.jpg');

      this.game.load.image('E', 'assets/test/controls/E.png');
      this.game.load.image('N', 'assets/test/controls/N.png');
      this.game.load.image('NE', 'assets/test/controls/NE.png');
      this.game.load.image('NW', 'assets/test/controls/NW.png');
      this.game.load.image('S', 'assets/test/controls/S.png');
      this.game.load.image('SE', 'assets/test/controls/SE.png');
      this.game.load.image('SW', 'assets/test/controls/SW.png');
      this.game.load.image('W', 'assets/test/controls/W.png');

      this.game.load.spritesheet('character','assets/test/character.png');
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
          var floorTile = this.game.add.sprite(xt * TILE_SIZE, yt * TILE_SIZE, 'ground_' + random(5));
          floorGroup.add(floorTile);

          if (tile[xt] == 1 || tile[xt] == 2) {
            var obstacle = this.game.add.sprite(xt * TILE_SIZE, yt * TILE_SIZE, 'obstacle_' + random(3));
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

      this.player = this.game.add.sprite(350, 280, 'character');

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
    game.state.add('Demo', Demo);
    game.state.start('Demo');
  };
});

