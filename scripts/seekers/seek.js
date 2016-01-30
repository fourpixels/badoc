define(function(require, exports, module) {
  var EasyStar = require('easystar');

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

  function defaultCallback(enemy, direction) {
    applyDirection(enemy, direction, 90);
  }

  return function seek(map, tileSize, target, enemies, callback) {
    if (!callback) {
      callback = defaultCallback;
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
  };
});
