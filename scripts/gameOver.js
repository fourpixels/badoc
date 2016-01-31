define(function(require, exports, module) {
  var GameOver = function(game) {
    this.game = game;
  };

  GameOver.prototype.preload = function() {
    this.game.load.image('button', 'assets/ui/buttonRestart.png');
    this.game.load.image('background','assets/ui/backgroundGameOver.png');
  }

  GameOver.prototype.create = function() {
    var game = this.game;

    game.stage.backgroundColor = '#986733';

    var imageX = game.world.centerX - 700/2;
    var imageY = game.world.centerY - 476/2;

    game.add.image(imageX, imageY, 'background');

    var buttonX = imageX + 260;
    var buttonY = imageY + 300;

    var button = game.add.button(buttonX, buttonY, 'button', actionOnClick, this);
  }

  function actionOnClick() {
    window.location.reload();
  }

  return GameOver;
});
