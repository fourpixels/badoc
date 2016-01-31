define(function(require, exports, module) {
  var EasyStar = require('easystar');

  var TIMEOUT_TIME = 400;
  var ENEMY_SPEED = 50;

  function random(num) {
    return Math.round(Math.random() * num);
  }

  function normalize(num) {
    if (num < -1) return -1;
    if (num > 1) return 1;

    return Math.round(num);
  }

  return function seek(map, targets, enemies, callback) {
    var easystar = new EasyStar.js();

    easystar.setGrid(map.tiles);
    easystar.setIterationsPerCalculation(1000);
    easystar.setAcceptableTiles([0]);
    easystar.enableDiagonals();
    easystar.enableCornerCutting();

    var interval = setInterval(function(){

      enemies.forEach(function(enemy) {

        if (!enemy.alive) return;

        if (!enemy.target) {
          enemy.target = targets[random(targets.length - 1)];
        }

        // var targetX = map.tileX(enemy.target.body.position.x + enemy.width);
        var targetX = map.tileX(enemy.target.body.position.x);
        var targetY = map.tileY(enemy.target.body.position.y + enemy.target.height);
        // var currentX = map.tileX(enemy.body.position.x + enemy.width);
        var currentX = map.tileX(enemy.body.position.x);
        var currentY = map.tileY(enemy.body.position.y + enemy.height);

        easystar.findPath(currentX, currentY, targetX, targetY, function(path) {
          var nextX = 0;
          var nextY = 0;

          if (path && path[1]) {
            nextX = path[1].x;
            nextY = path[1].y;
          }


          enemy.body.velocity.x = normalize(nextX - currentX) * ENEMY_SPEED;
          enemy.body.velocity.y = normalize(nextY - currentY) * ENEMY_SPEED;
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
