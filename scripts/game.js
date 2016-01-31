define(function(require, exports, module) {

    var _ = require('lodash');
    var debug = require('debug')('jar:game');
    var Settings = require('settings');
    var Creeps = require('creeps');
    var map = require('defaultMap')();
    var Sounds = require('Sounds');
    var seek = require('seek');
    var KeysManager = require('KeysManager');

    var Cow = require('Cow');
    var Mouse = require('Mouse');
    var Totem = require('Totem');
    var jellyBeans;
    var HeroInputs = require('HeroInputs');
    var KeyMap = require('KeyMap');
    var UIManager = require('UIManager');

    var Game = function Game() {

        var game = new Phaser.Game(globals.windowWidth, globals.windowHeight, Phaser.AUTO, '', {
            create: create,
            preload: preload,
            update: update,
            render: render
        });


        var cow;
        var mouse;
        var ui;
        var totem;

        var cursors;

        var fpsText, timeText, soulsText;
        var renderable;
        //var inputsText;
        var noCollide;

        game.soulsCollected = 0;

        function create() {

            Sounds.init(game);

            noCollide = map.buildGroupsFor(game);
            renderable = game.add.group();

            game.time.advancedTiming = true;
            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.stage.backgroundColor = '#AAAAAA';

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

            var creepsGroup = Creeps.init(game);
            renderable.add(cow.sprite);
            renderable.add(mouse.sprite);
            //renderable.add(creepsGroup);

            noCollide.add(cow.sprite);
            noCollide.add(mouse.sprite);

            totem = new Totem(game);

            renderable.add(totem.sprite);
            noCollide.add(totem.sprite);

            //var cow2 = game.add.sprite(Settings.COW.startX, Settings.COW.startY, 'hero-test');
            //cow2.animations.add('swim', Phaser.Animation.generateFrameNames('Cow Standing instance', 0, 32, '', 4), 30, true);
            //cow2.animations.play('swim');
            //cow2.animations.add('left', [3, 4, 5], 10, true);
            //cow2.animations.add('right', [6, 7, 8], 10, true);

            fpsText = game.add.text(16, 16, 'FPS: 0', {
                fontSize: '16px',
                fill: '#abc'
            });

            timeText = game.add.text(globals.windowWidth / 2 - 8, 16, '0', {
                fontSize: '20px',
                fill: '#ea1'
            });

            soulsText = game.add.text(globals.windowWidth - 90, 16, 'Souls: 0', {
                fontSize: '16px',
                fill: '#ea1'
            });

            jellyBeans = game.add.group();
            jellyBeans.enableBody = true;

            ui = new UIManager(game);

            seek(map, [cow.sprite, mouse.sprite, totem.sprite], creepsGroup);
            //inputsText = game.add.text(1, 36);
        }

        function preload() {
            Sounds.load(game);
            map.loadFrom(game);
            game.load.spritesheet('hero-cow', 'assets/cow.png', Settings.COW.width, Settings.COW.height);
            game.load.spritesheet('hero-mouse', 'assets/mouse.png', Settings.MOUSE.width, Settings.MOUSE.height);
            game.load.spritesheet('creep', 'assets/creep.png', Settings.CREEP.width, Settings.CREEP.height);
            game.load.image('jellyBean', 'assets/dummy_jellyBean.png');

            game.load.spritesheet('totem', 'assets/totem.png', Settings.TOTEM.width, Settings.TOTEM.height);

            game.load.image('stamina-bar-bgr', 'assets/stamina-bar-bgr.png');
            game.load.image('stamina-bar-over', 'assets/stamina-bar-over.png');

            game.load.image('cow-hit', 'assets/cow-hit.png');
        }

        function update() {
            var timeSinceLastUpdate = game.time.elapsed;

            Creeps.update(timeSinceLastUpdate);

            game.physics.arcade.overlap(cow.hitSprite, Creeps.group, function(cowSprite, creep) {
                //creep.attack();
                var die = false;
                if (cow.cowColor == 'red') {
                    if (creep.type == 1)
                        die = true;
                } else if (cow.cowColor == 'blue') {
                    if (creep.type == 2)
                        die = true;
                }
                console.log('collision:', creep.type, cow.cowColor);
                if (die) {
                    Sounds.creepDie.play();
                    creep.die(function(coordinates) {
                        game.soulsCollected++;
                        jellyBeans.create(coordinates.x, coordinates.y, 'jellyBean');
                    });
                }
            });

            game.physics.arcade.overlap(mouse.sprite, jellyBeans, collectJellyBean, null, this);

            game.physics.arcade.overlap(totem.sprite, Creeps.group, totemTakeDamage, null, this);

            this.game.physics.arcade.collide(noCollide);

            // collision debugging
            //Creeps.group.forEachAlive(function(creep) {
            //    game.debug.body(creep);
            //});
            //game.debug.body(mouse.sprite);
            //game.debug.body(cow.sprite);
            //game.debug.body(totem.sprite);
            //inputsText.text = 'inputs: ' + _.keys(KeysManager.getPressedKeys());

            fpsText.text = 'FPS: ' + game.time.fps;
            timeText.text = Math.floor(game.time.totalElapsedSeconds());
            soulsText.text = 'Souls: ' + game.soulsCollected;

            renderable.sort('y', Phaser.Group.SORT_ASCENDING);
        }

        function collectJellyBean(mouseSprite, jellyBean) {
            jellyBean.kill();
            mouse.increaseStamina(20);
        };

        function totemTakeDamage(totemSprite, creep) {
            totem.takeDamage();
            creep.die();
        }

        function render() {
        }

        return game;
    };


    return Game;
});
