define(function(require, exports, module) {

    var _ = require('lodash');
    var debug = require('debug')('jar:game');
    var Settings = require('settings');
    var Creeps = require('creeps');
    var Beans = require('beans');
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

    return function Game(game) {
        var cow;
        var mouse;
        var ui;
        var totem;

        var cursors;

        var fpsText, timeText, soulsText;
        var renderable;
        //var inputsText;
        var obsticles;
        var creepsGroup;

        game.soulsCollected = 0;

        function create() {

            Sounds.init(game);

            obsticles = map.buildGroupsFor(game);
            renderable = game.add.group();

            game.time.advancedTiming = true;
            game.physics.startSystem(Phaser.Physics.ARCADE);

            //game.stage.backgroundColor = '#AAAAAA';

            cow = new Cow(game, new HeroInputs(game, KeyMap.cow), renderable);
            mouse = new Mouse(game, new HeroInputs(game, KeyMap.mouse), renderable);

            cow.on('action:b', function() {
                debug('>> COW:B');
            });

            mouse.on('action:a', function() {
                setTimeout(function() {
                    cow.switchColor();
                }, 500);

                mouse.cast(cow.cowColor == 'red' ? 'blue' : 'red');
            });

            mouse.on('action:b', function() {
                debug('switch mouse & cow!');
                var mousePos = { x: mouse.sprite.x, y: mouse.sprite.y };
                var cowPos = { x: cow.sprite.x, y: cow.sprite.y };

                //debug(mousePos);
                //debug(cowPos);


                setTimeout(function() {
                    mouse.sprite.x = cowPos.x;
                    mouse.sprite.y = cowPos.y;

                    cow.sprite.x = mousePos.x;
                    cow.sprite.y = mousePos.y;
                }, 500);

                cow.teleport();
                mouse.teleport();

                var mouseInputs = mouse.inputs;
                var cowInputs = cow.inputs;

                mouse.setInputs(cowInputs);
                cow.setInputs(mouseInputs);
            });


            game.cow = cow;
            game.mouse = mouse;

            creepsGroup = Creeps.init(game, renderable);
            Beans.init(game, renderable);

            renderable.add(cow.sprite);
            renderable.add(mouse.sprite);

            totem = new Totem(game, renderable);

            renderable.add(totem.sprite);

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

            ui = new UIManager(game);

            seek(map, [mouse.sprite, totem.sprite], creepsGroup);
            //inputsText = game.add.text(1, 36);
        };

        function preload() {
            Sounds.load(game);
            map.loadFrom(game);
            game.load.spritesheet('hero-cow', 'assets/cow.png', Settings.COW.width, Settings.COW.height);
            game.load.spritesheet('hero-mouse', 'assets/mouse.png', Settings.MOUSE.width, Settings.MOUSE.height);
            game.load.spritesheet('creep', 'assets/creep.png', Settings.CREEP.width, Settings.CREEP.height);

            game.load.spritesheet('bean', 'assets/bean.png', Settings.BEAN.width, Settings.BEAN.height);

            game.load.spritesheet('totem', 'assets/totem.png', Settings.TOTEM.width, Settings.TOTEM.height);
            game.load.spritesheet('totem-fill', 'assets/totem_fill.png', 66, 80);

            game.load.spritesheet('pouf', 'assets/pouf.png', 51, 170);

            game.load.image('stamina-bar-bgr', 'assets/stamina-bar-bgr.png');
            game.load.image('stamina-bar-over', 'assets/stamina-bar-over.png');

            game.load.image('avatar-cow', 'assets/avatar-cow.png');
            game.load.image('avatar-mouse', 'assets/avatar-mouse.png');

            game.load.image('cow-hit', 'assets/cow-hit.png');
        };

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
                //console.log('collision:', creep.type, cow.cowColor);
                if (die) {
                    Sounds.creepDie.play();
                    creep.die(function(coordinates) {
                        game.soulsCollected++;
                        Beans.dropBean(coordinates.x, coordinates.y);
                    });
                }
            });

            game.physics.arcade.overlap(mouse.sprite, Beans.group, collectBean, null, this);
            game.physics.arcade.overlap(mouse.sprite, Creeps.group, mouse.decreaseStamina, null, this);

            game.physics.arcade.overlap(totem.sprite, Creeps.group, totemTakeDamage, null, this);

            game.physics.arcade.collide(cow.sprite, obsticles);
            game.physics.arcade.collide(cow.sprite, totem.sprite);
            game.physics.arcade.collide(mouse.sprite, obsticles);
            game.physics.arcade.collide(mouse.sprite, totem.sprite);
            game.physics.arcade.collide(mouse.sprite, cow.sprite);

            game.physics.arcade.collide(creepsGroup, obsticles);

            // collision debugging
            //Creeps.group.forEachAlive(function(creep) {
            //    game.debug.body(creep);
            //});
            //Beans.group.forEach(function(bean) {
            //    game.debug.body(bean);
            //});
            //game.debug.body(mouse.sprite);
            //game.debug.body(cow.sprite);
            //game.debug.body(totem.sprite);
            //inputsText.text = 'inputs: ' + _.keys(KeysManager.getPressedKeys());

            fpsText.text = 'FPS: ' + game.time.fps;
            timeText.text = Math.floor(game.time.totalElapsedSeconds());
            soulsText.text = 'Souls: ' + game.soulsCollected;

            renderable.sort('y', Phaser.Group.SORT_ASCENDING);
        };

        function collectBean(mouseSprite, bean) {
            bean.collect();
            mouse.increaseStamina(20);
        }

        function totemTakeDamage(totemSprite, creep) {
            totem.takeDamage();
            //creep.die();
        }

        function render() {
        }

        return {
            create: create,
            preload: preload,
            update: update,
            render: render
        };
    };
});
