define(function(require, exports, module) {
  var GameStart = function(game) {
    this.game = game;
  };

  GameStart.prototype.preload = function() {
    $('#loader').show();
    this.game.load.image('button', 'assets/ui/buttonStart.png');
    this.game.load.image('instructions', 'assets/ui/buttonInstructions.png');
    this.game.load.image('background','assets/ui/backgroundGameStart.jpg');
  }

  GameStart.prototype.create = function() {
    $('#loader').hide();
    var game = this.game;

    game.stage.backgroundColor = '#000000';

    var imageX = game.world.centerX - 1000/2;
    var imageY = game.world.centerY - 670/2;

    game.add.image(imageX, imageY, 'background');

    var buttonX = imageX + 374;
    var buttonY = imageY + 550;

    var button = game.add.button(buttonX, buttonY, 'button', showInstructions, this);
  }

  function showInstructions() {
    this.game.state.start('GameInstructions');
  }

  return GameStart;
});

