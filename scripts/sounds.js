/**
 * Created by Ilian on 1/31/2016.
 */
define(function(require, exports, module) {
    var Sounds = {};

    Sounds.load = function(game) {
        /*game.load.audio('hit', 'assets/sounds/hit.mp3');



        game.load.audio('gameOver', 'assets/sounds/game_over.wav');*/

        game.load.audio('ambient', 'assets/sounds/ambient.mp3');
        game.load.audio('cow-hit', 'assets/sounds/cow_hit.mp3');
        game.load.audio('creepDie', 'assets/sounds/creep_death.mp3');
        game.load.audio('mouseWalk', 'assets/sounds/mouse_walk.mp3');
        game.load.audio('mouseSpell', 'assets/sounds/mouse_spell.mp3');
        game.load.audio('cowWalk', 'assets/sounds/cow_walk.mp3');
        game.load.audio('beanSpawned', 'assets/sounds/bean_colected.mp3');
        game.load.audio('beanCollected', 'assets/sounds/bean_spawn.wav');
        game.load.audio('totem-damage', 'assets/sounds/totem_damage.mp3');
    };

    Sounds.init = function(game) {
        Sounds.ambient = game.add.audio('ambient');
        Sounds.ambient.play();

        Sounds.beanSpawned = game.add.audio('beanSpawned');
        Sounds.beanCollected = game.add.audio('beanCollected');
        Sounds.beanSpawned.allowMultiple = Sounds.beanCollected.allowMultiple = true;
        Sounds.cowHit = game.add.audio('cow-hit');
        Sounds.creepDie = game.add.audio('creepDie');
        Sounds.creepDie.allowMultiple = true;
        Sounds.mouseWalk = game.add.audio('mouseWalk');
        Sounds.mouseSpell = game.add.audio('mouseSpell');
        Sounds.cowWalk = game.add.audio('cowWalk');
        Sounds.cowWalk.loop = true;
        Sounds.mouseWalk.loop = true;
        Sounds.totemDamage = game.add.audio('totem-damage');
        /*Sounds.hit = game.add.audio('hit');




        Sounds.gameOver = game.add.audio('gameOver');*/
    };

    return Sounds;
});