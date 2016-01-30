define(function(require, exports, module) {

    var Settings = require('settings');
    var game = {};

    var cow;
    var cursors;

    game.preloadGame = function() {
        game.load.spritesheet('cow', 'assets/dummy_cow.png', Settings.COW.width, Settings.COW.height);
    };

    game.createGame = function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        cow = game.add.sprite(Settings.COW.startX, Settings.COW.startY, 'cow');
        cow.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(cow);
        cow.animations.add('left', [3, 4, 5], 10, true);
        cow.animations.add('right', [6, 7, 8], 10, true);

        cursors = game.input.keyboard.createCursorKeys();
    };

    game.update = function() {
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
    };

    function init() {
        game = new Phaser.Game(Settings.CANVAS.width, Settings.CANVAS.height, Phaser.AUTO, '', {
            preload: game.preloadGame,
            create: game.createGame,
            update: game.update
        });
    }

    return init;
});