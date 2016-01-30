define(function(require, exports, module) {
  function random(num) {
    return Math.round(Math.random() * num);
  }

  function Map(options) {
    this.tileSize = options.tileSize;
    this.tiles = options.tiles;
    this.groundTypes = options.groundTypes;
    this.obsticlesTypes = options.obsticlesTypes;
    this.sizeWidth = this.tiles.length;
    this.sizeHeight = (this.tiles[0] || []).length;
  }

  Map.prototype.pointWidth = function() {
    return this.sizeWidth * this.tileSize;
  }

  Map.prototype.pointHeight = function() {
    return this.sizeHeight * this.tileSize;
  }

  Map.prototype.pointY = function(tileX) {
    return tileX * this.tileSize;
  }

  Map.prototype.pointX = function(tileX) {
    return tileX * this.tileSize;
  }

  Map.prototype.tileX = function(x) {
    position = Math.floor(x / this.tileSize);

    if (position < 0) return 0;
    if (position > this.sizeWidth) return this.sizeWidth - 1;

    return position;
  }

  Map.prototype.tileY = function(y) {
    position = Math.floor(y / this.tileSize);

    if (position < 0) return 0;
    if (position >= this.sizeHeight) return this.sizeHeight - 1;

    return position;
  }

  Map.prototype.loadFrom = function(game) {
    for(var i=0; i<this.obsticlesTypes; i++) {
      game.load.image('obstacle_' + i, 'assets/map/obstacle_' + i + '.jpg');
    }

    for(var i=0; i<this.groundTypes; i++) {
      game.load.image('ground_' + i, 'assets/map/ground_' + i + '.jpg');
    }
  }

  Map.prototype.buildGroupsFor = function(game) {
    var floorGroup = game.add.group();
    var obstacleGroup = game.add.group();

    for (var yt = 0; yt < this.sizeWidth; yt++) {
      var tile = this.tiles[yt];
      for (var xt = 0; xt < this.sizeHeight; xt++) {
        var floorTile = game.add.sprite(this.pointX(xt), this.pointY(yt), 'ground_' + random(this.groundTypes - 1));
        floorGroup.add(floorTile);

        floorTile.scale.x = this.tileSize / floorTile.width;
        floorTile.scale.y = this.tileSize / floorTile.height;

        if (tile[xt] == 1) {
          var obstacle = game.add.sprite(this.pointX(xt), this.pointY(yt), 'obstacle_' + random(this.obsticlesTypes - 1));
          obstacleGroup.add(obstacle);

          obstacle.scale.x = this.tileSize / obstacle.width;
          obstacle.scale.y = this.tileSize / obstacle.height;

          game.physics.arcade.enable(obstacle);

          obstacle.body.collideWorldBounds = true;
          obstacle.body.immovable = true;
        }
      }
    }

    return obstacleGroup;
  }

  return function(options) {
    return new Map(options);
  };
});
