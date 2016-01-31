define(function(require, exports, module) {
  var STYLE = {
    font: "bold 32px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle"
  };

  var GameOver = function(game) {
    this.game = game;
  };

  GameOver.prototype.update = function() {
    var game = this.game;

    var bar = game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, 0, game.width, game.height);

    text = game.add.text(0, 0, "Game Over", STYLE);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    text.setTextBounds(0, 0, game.width, game.height);

    var button = game.add.button(game.world.centerX, game.world.centerY, 'button', actionOnClick, this, 1, 0, 2);
  }

  function actionOnClick() {
    window.location.reload();
  }

  return GameOver;
});
