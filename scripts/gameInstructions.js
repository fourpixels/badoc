define(function(require, exports, module) {
  var GameInstructions = function(game) {
    this.game = game;
  };

  GameInstructions.prototype.preload = function() {
    this.game.load.image('button', 'assets/ui/buttonStart.png');
    this.game.load.image('background','assets/ui/backgroundGameStart.png');
  }

  GameInstructions.prototype.create = function() {
    var game = this.game;

    game.stage.backgroundColor = '#FFFFFF';

    var imageX = game.world.centerX - 1000/2;
    var imageY = game.world.centerY - 670/2;

    game.add.image(imageX, imageY, 'background');

    var buttonX = imageX + 260;
    var buttonY = imageY + 300;

    var button = game.add.button(buttonX, buttonY, 'button', actionOnClick, this);
  }

  function actionOnClick() {
    this.game.state.start('Game');
  }

  return GameInstructions;
});


