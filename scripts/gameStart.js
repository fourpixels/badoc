define(function(require, exports, module) {
  var GameStart = function(game) {
    this.game = game;
  };

  GameStart.prototype.update = function() {
    var game = this.game;

    var bar = game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, 0, game.width, game.height);

    text = game.add.text(0, 0, "Start Game", {
      font: "bold 32px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    });
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    text.setTextBounds(0, 0, game.width, game.height);

    var button = game.add.button(game.world.centerX, game.world.centerY, 'button', actionOnClick, this, 1, 0, 2);
  }

  function actionOnClick() {
    this.game.state.start('Game');
  }

  return GameStart;
});

