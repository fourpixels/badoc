define(function(require, exports, module) {

    var _ = require('lodash');
    var debug = require('debug')('jar:game');
    var Settings = require('settings');
    var Creeps = require('creeps');
    var KeysManager = require('KeysManager');

    var Cow = require('Cow');
    var Mouse = require('Mouse');
    var HeroInputs = require('HeroInputs');
    var KeyMap = require('KeyMap');
    var UIManager = require('UIManager');

    var Game = function Game() {
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        globals.windowWidth = width;
        globals.windowHeight = height;

        var game = new Phaser.Game(width, height, Phaser.AUTO, '', {
            create: create,
            preload: preload,
            update: update,
            render: render
        });

        var cow;
        var mouse;
        var ui;

        var cursors;

        var fpsText;
        //var inputsText;

        function create() {
            game.time.advancedTiming = true;
            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.stage.backgroundColor = '#2d2d2d';

            cow = new Cow(game, new HeroInputs(game, KeyMap.cow));
            mouse = new Mouse(game, new HeroInputs(game, KeyMap.mouse));

            cow.on('action:b', function() {
                debug('>> COW:B');
            });

            mouse.on('action:a', function() {
                cow.switchColor();
            });

            mouse.on('action:b', function() {
                debug('switch mouse & cow!');
                var mousePos = { x: mouse.sprite.x, y: mouse.sprite.y };
                var cowPos = { x: cow.sprite.x, y: cow.sprite.y };

                //debug(mousePos);
                //debug(cowPos);

                mouse.sprite.x = cowPos.x;
                mouse.sprite.y = cowPos.y;

                cow.sprite.x = mousePos.x;
                cow.sprite.y = mousePos.y;

                var mouseInputs = mouse.inputs;
                var cowInputs = cow.inputs;

                mouse.setInputs(cowInputs);
                cow.setInputs(mouseInputs);
            });


            game.cow = cow;
            game.mouse = mouse;

            //var cow2 = game.add.sprite(Settings.COW.startX, Settings.COW.startY, 'hero-test');
            //cow2.animations.add('swim', Phaser.Animation.generateFrameNames('Cow Standing instance', 0, 32, '', 4), 30, true);
            //cow2.animations.play('swim');
            //cow2.animations.add('left', [3, 4, 5], 10, true);
            //cow2.animations.add('right', [6, 7, 8], 10, true);

            cursors = game.input.keyboard.createCursorKeys();

            //Creeps.init(game);

            fpsText = game.add.text(16, 16, 'FPS: 0', {
                fontSize: '16px',
                fill: '#abc'
            });


            ui = new UIManager(game);

            //inputsText = game.add.text(1, 36);
        }

        function preload() {
            game.load.spritesheet('hero-cow', 'assets/cow.png', Settings.COW.width, Settings.COW.height);
            game.load.spritesheet('hero-mouse', 'assets/mouse.png', Settings.COW.width, Settings.COW.height);

            game.load.spritesheet('creepRed', 'assets/dummy_creep_red.png', 34, 34);
            game.load.spritesheet('creepYellow', 'assets/dummy_creep_yellow.png', 34, 34);

            game.load.image('stamina-bar-bgr', 'assets/stamina-bar-bgr.png');
            game.load.image('stamina-bar-over', 'assets/stamina-bar-over.png');

            //game.load.spritesheet('hero-cow', 'assets/dummy_creep_red.png', 34, 34);
            //game.load.spritesheet('hero-mouse', 'assets/dummy_creep_yellow.png', 34, 34);
        }
        var lookingRight = true; //what is the default?
        function update() {
            /*var moving = false;
            if (cursors.left.isDown) {
                moving = true;
                if (lookingRight) {
                    lookingRight = false
                    cow.scale.x *=-1;
                }
                cow.body.velocity.x = -Settings.COW.velocity;
            } else if (cursors.right.isDown) {
                moving = true;
                if (!lookingRight) {
                    lookingRight = true
                    cow.scale.x *= -1;
                }
                cow.body.velocity.x = Settings.COW.velocity;
            } else {
                norLeftNorRight = true;
                cow.body.velocity.x = 0;
            }

            if (cursors.up.isDown) {
                moving = true;
                cow.body.velocity.y = -Settings.COW.velocity;
            } else if (cursors.down.isDown) {
                moving = true;

                cow.body.velocity.y = Settings.COW.velocity;
            } else {
                cow.body.velocity.y = 0;
            }

            if (!moving) {
                cow.animations.stop(null, true);
            } else {
                cow.animations.play('right');
            }*/

            fpsText.text = 'FPS: ' + game.time.fps;

            //Creeps.update(game.time.elapsed);

            game.physics.arcade.collide(cow, Creeps.group, function(cow, creep) {
                creep.die();
            });
            //Creeps.group.forEach(function(creep) {
            //    game.debug.body(creep);
            //});
            //
            //game.debug.body(cow);
            //inputsText.text = 'inputs: ' + _.keys(KeysManager.getPressedKeys());
        }

        function render() {
        }

        return game;
    };


    return Game;
});