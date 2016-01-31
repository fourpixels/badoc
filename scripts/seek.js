define(function(require, exports, module) {
  var EasyStar = require('easystar');

  var TIMEOUT_TIME = 400;
  var ENEMY_SPEED = 90;

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
    applyDirection(enemy, direction, ENEMY_SPEED);
  }

  function random(num) {
    return Math.round(Math.random() * num);
  }

  return function seek(map, targets, enemies, callback) {
    if (!callback) {
      callback = defaultCallback;
    }

    var easystar = new EasyStar.js();

    easystar.setGrid(map.tiles);
    easystar.setIterationsPerCalculation(1000);
    easystar.setAcceptableTiles([0]);
    easystar.enableDiagonals();
    easystar.enableCornerCutting();

    var interval = setInterval(function(){

      enemies.forEachAlive(function(enemy) {
        if (!enemy.target) {
          enemy.target = targets[random(targets.length - 1)];
        }

        var currentPlayerXtile = map.tileX(enemy.target.body.position.x);
        var currentPlayerYtile = map.tileY(enemy.target.body.position.y);
        var currentEnemyXtile = map.tileX(enemy.body.position.x);
        var currentEnemyYtile = map.tileY(enemy.body.position.y);

        easystar.findPath(currentEnemyXtile, currentEnemyYtile, currentPlayerXtile, currentPlayerYtile, function(path) {
          if (!path || !path[1]) {
            return callback(enemy, 'STOP');
          }

          var currentNextPointX = path[1].x;
          var currentNextPointY = path[1].y;

          if (currentNextPointX < currentEnemyXtile && currentNextPointY < currentEnemyYtile) {
            return callback(enemy, "NW");
          }

          if (currentNextPointX == currentEnemyXtile && currentNextPointY < currentEnemyYtile) {
            return callback(enemy, "N");
          }

          if (currentNextPointX > currentEnemyXtile && currentNextPointY < currentEnemyYtile) {
            return callback(enemy, "NE");
          }

          if (currentNextPointX < currentEnemyXtile && currentNextPointY == currentEnemyYtile) {
            return callback(enemy, "W");
          }

          if (currentNextPointX > currentEnemyXtile && currentNextPointY == currentEnemyYtile) {
            return callback(enemy, "E");
          }

          if (currentNextPointX > currentEnemyXtile && currentNextPointY > currentEnemyYtile) {
            return callback(enemy, "SE");
          }

          if (currentNextPointX == currentEnemyXtile && currentNextPointY > currentEnemyYtile) {
            return callback(enemy, "S");
          }

          if (currentNextPointX < currentEnemyXtile && currentNextPointY > currentEnemyYtile) {
            return callback(enemy, "SW");
          }

          return callback(enemy, 'STOP');
        });
      });

      easystar.calculate();
    }, TIMEOUT_TIME);

    return function() {
      if (interval) {
        clearInterval(interval);
        interval = null;
        easystar = null;
      }
    };
  };
});
