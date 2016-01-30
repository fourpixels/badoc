define(function(require, exports, module) {

    var _ = require('lodash');
    var debug = require('debug')('jar:game');
    var Settings = require('settings');
    var Creeps = require('creeps');
    var KeysManager = require('KeysManager');

    var Cow = require('Cow');
    var Mouse = require('Mouse');
    var jellyBeans;
    var HeroInputs = require('HeroInputs');
    var KeyMap = require('KeyMap');

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

        var fpsText;
        var inputsText;

        var renderable;

        function create() {
            renderable = game.add.group();

            game.time.advancedTiming = true;
            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.stage.backgroundColor = '#2d2d2d';

            cow = new Cow(game, new HeroInputs(game, KeyMap.cow));
            mouse = new Mouse(game, new HeroInputs(game, KeyMap.mouse));

            mouse.on('input:a', function() {
                cow.switchColor();
            });

            mouse.on('input:b', function() {
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

            var creepsGroup = Creeps.init(game);
            renderable.add(cow.sprite);
            renderable.add(mouse.sprite);
            renderable.add(creepsGroup);

            fpsText = game.add.text(16, 16, 'FPS: 0', {
                fontSize: '16px',
                fill: '#abc'
            });

            jellyBeans = game.add.group();
            jellyBeans.enableBody = true;

            inputsText = game.add.text(1, 36);
        }

        function preload() {
            game.load.spritesheet('hero-cow', 'assets/cow.png', Settings.COW.width, Settings.COW.height);
            game.load.spritesheet('hero-mouse', 'assets/mouse.png', 100, 138);
            game.load.spritesheet('creep', 'assets/creep.png', 126, 150);
            game.load.image('jellyBean', 'assets/dummy_jellyBean.png');
        }

        function update() {
            var timeSinceLastUpdate = game.time.elapsed;
            Creeps.update(timeSinceLastUpdate);

            renderable.sort('y', Phaser.Group.SORT_ASCENDING);

            fpsText.text = 'FPS: ' + game.time.fps;

            game.physics.arcade.collide(cow.sprite, Creeps.group, function(cow, creep) {
                //creep.attack();
                creep.die(function(coordinates) {
                    jellyBeans.create(coordinates.x, coordinates.y, 'jellyBean');
                });
            });

            game.physics.arcade.overlap(mouse.sprite, jellyBeans, collectJellyBean, null, this);
            // collission debugging
            //Creeps.group.forEachAlive(function(creep) {
            //    game.debug.body(creep);
            //});
            //game.debug.body(mouse.sprite);
            //game.debug.body(cow.sprite);
            inputsText.text = 'inputs: ' + _.keys(KeysManager.getPressedKeys());
        }

        function collectJellyBean(mouse, jellyBean) {
            jellyBean.kill();
            //mouse.increaseStamina();
            // mouse add power
        };

        function render() {
        }

        return game;
    };


    return Game;
});