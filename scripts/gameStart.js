define(function(require, exports, module) {
  var GameStart = function(game) {
    this.game = game;
  };

  GameStart.prototype.preload = function() {
    this.game.load.image('button', 'assets/ui/buttonStart.png');
    this.game.load.image('instructions', 'assets/ui/buttonInstructions.png');
    this.game.load.image('background','assets/ui/backgroundGameStart.jpg');
  }

  GameStart.prototype.create = function() {
    var game = this.game;

    game.stage.backgroundColor = '#000000';

    var imageX = game.world.centerX - 1000/2;
    var imageY = game.world.centerY - 670/2;

    game.add.image(imageX, imageY, 'background');

    var buttonX = imageX + 374;
    var buttonY = imageY + 550;

    var button = game.add.button(buttonX, buttonY, 'button', start, this);

    // var instructionsX = imageX + 660;
    // var instructionsY = imageY + 600;

    // var instructions = game.add.button(instructionsX, instructionsY, 'instructions', showInstructions, this);

  }

  function start() {
    this.game.state.start('Game');
  }

  function showInstructions() {
    this.game.state.start('GameInstructions');
  }

  return GameStart;
});

