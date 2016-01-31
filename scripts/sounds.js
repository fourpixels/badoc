/**
 * Created by Ilian on 1/31/2016.
 */
define(function(require, exports, module) {
    var Sounds = {};

    Sounds.load = function(game) {
        game.load.audio('hit', 'assets/sounds/hit.mp3');
        game.load.audio('cowWalk', 'assets/sounds/cow_walk.mp3');
        game.load.audio('mouseWalk', 'assets/sounds/mouse_walk.mp3');
        game.load.audio('creepDie', 'assets/sounds/creep_die.wav');
        game.load.audio('gameOver', 'assets/sounds/game_over.wav');
    };

    Sounds.init = function(game) {
        Sounds.hit = game.add.audio('hit');
        Sounds.cowWalk = game.add.audio('cowWalk');
        Sounds.cowWalk.loop = true;
        Sounds.mouseWalk = game.add.audio('mouseWalk');
        Sounds.mouseWalk.loop = true;
        Sounds.creepDie = game.add.audio('creepDie');
        Sounds.gameOver = game.add.audio('gameOver');
    }

    return Sounds;
});