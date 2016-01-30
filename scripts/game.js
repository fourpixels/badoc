define(function(require, exports, module) {

    var Settings = require('settings')

    var Game = function Game() {
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;


        var game = new Phaser.Game(width, height, Phaser.AUTO, '', {
            preload: preloadGame,
            create: createGame,
            update: update
        });

        var cow;
        var cursors;

        function preloadGame() {
            game.load.spritesheet('cow', 'assets/dummy_cow.png', Settings.COW.width, Settings.COW.height);
        }

        function createGame() {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            cow = game.add.sprite(Settings.COW.startX, Settings.COW.startY, 'cow');
            cow.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(cow);
            cow.animations.add('left', [3, 4, 5], 10, true);
            cow.animations.add('right', [6, 7, 8], 10, true);

            cursors = game.input.keyboard.createCursorKeys();
        }

        function update() {
            if (cursors.left.isDown) {
                cow.animations.play('left');
                cow.body.velocity.x = -Settings.COW.velocity;
            } else if (cursors.right.isDown) {
                cow.animations.play('right');
                cow.body.velocity.x = Settings.COW.velocity;
            } else {
                cow.animations.stop(null, true);
                cow.body.velocity.x = 0;
            }
        }

        return game;
    };


    return Game;
});