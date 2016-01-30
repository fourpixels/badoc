define(function(require, exports, module) {

    var _ = require('lodash');
    var Settings = require('settings');
    var Creeps = require('creeps');
    var KeysManager = require('KeysManager');

    var Cow = require('Cow');
    var Mouse = require('Mouse');
    var HeroInputs = require('HeroInputs');
    var KeyMap = require('KeyMap');

    var Game = function Game() {
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;


        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
            create: create,
            preload: preload,
            update: update,
            render: render
        });

        var cow;
        var mouse;

        var cursors;

        var fpsText;
        var inputsText;

        function create() {
            game.time.advancedTiming = true;
            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.stage.backgroundColor = '#2d2d2d';

            cow = new Cow(game, new HeroInputs(game, KeyMap.cow));
            mouse = new Mouse(game, new HeroInputs(game, KeyMap.mouse));

            //var cow2 = game.add.sprite(Settings.COW.startX, Settings.COW.startY, 'hero-test');
            //cow2.animations.add('swim', Phaser.Animation.generateFrameNames('Cow Standing instance', 0, 32, '', 4), 30, true);
            //cow2.animations.play('swim');
            //cow2.animations.add('left', [3, 4, 5], 10, true);
            //cow2.animations.add('right', [6, 7, 8], 10, true);

            cursors = game.input.keyboard.createCursorKeys();

            Creeps.init(game);

            fpsText = game.add.text(16, 16, 'FPS: 0', {
                fontSize: '16px',
                fill: '#abc'
            });

            inputsText = game.add.text(1, 36);
        }

        function preload() {
            game.load.spritesheet('cow', 'assets/dummy_cow.png', Settings.COW.width, Settings.COW.height);
            game.load.spritesheet('creepRed', 'assets/dummy_creep_red.png', 34, 34);
            game.load.spritesheet('creepYellow', 'assets/dummy_creep_yellow.png', 34, 34);

            game.load.spritesheet('hero-cow', 'assets/dummy_creep_red.png', 34, 34);
            game.load.spritesheet('hero-mouse', 'assets/dummy_creep_yellow.png', 34, 34);
        }

        function update() {
            /*if (cursors.left.isDown) {
                cow.animations.play('left');
                cow.body.velocity.x = -Settings.COW.velocity;
            } else if (cursors.right.isDown) {
                cow.animations.play('right');
                cow.body.velocity.x = Settings.COW.velocity;
            } else {
                cow.animations.stop(null, true);
                cow.body.velocity.x = 0;
            }*/

            fpsText.text = 'FPS: ' + game.time.fps;

            Creeps.update(game.time.elapsed);

            //game.physics.arcade.collide(cow, Creeps.group);
            inputsText.text = 'inputs: ' + _.keys(KeysManager.getPressedKeys());
        }

        function render() {
        }

        return game;
    };


    return Game;
});