define(function(require, exports, module) {
    var CreepTypes = {
        GREEN: 1,
        RED: 2,
        BLUE: 3
    };
    var _ = require('lodash');
    var MAX_CREEPS = 30;

    var Creeps = {};
    var timeSinceLastCreep = 0;

    var gameRef;

    function Creep(game) {
        gameRef = game; // YES , THIS IS BAD
        var image = 'creepYellow';
        if (Math.random() < 0.5) {
            image = 'creepRed';
        }
        var creep = game.add.sprite(0, 0, image);
        //var creep = game.add.sprite(Math.round(Math.random() * globals.windowWidth),Math.round(Math.random() * globals.windowHeight), image);
        game.physics.enable(creep, Phaser.Physics.ARCADE);
        creep.height = 60;

        creep.checkWorldBounds = true;
        creep.outOfBoundsKill = true;

        // creep animations
        creep.animations.add('down', [0, 1, 2], 10, true);
        creep.animations.add('left', [3, 4, 5], 10, true);
        creep.animations.add('right', [6, 7, 8], 10, true);
        creep.animations.add('up', [9, 10, 11], 10, true);
        creep.animations.add('attack', [9, 10, 11], 10, true);
        creep.animations.add('die', [6, 7, 8], 10, false).killOnComplete = true;

        // creep collision area
        creep.body.setSize(32, 15, 0, 50);

        creep.spawn = function() {
            creep.revive();
            gameRef.add.tween(creep).from({alpha: 0}, 4000, Phaser.Easing.Linear.None, true, 0);
            var some = Math.random();
            var x = 0
            if (some > 0.67) {
                x = globals.windowWidth - creep.body.width;
            } else if (some > 0.33) {
                x = Math.round(globals.windowWidth / 2) - Math.round(creep.body.width / 2)
            } else {
                x = 0;
            }
            creep.reset(x, creep.body.height);
            //calculate direction
            creep.body.velocity.y = 60;
            creep.animations.play('down');
        }

        creep.die = function() {
            creep.animations.play('die'); // animation is set to kill it at the end
        };

        creep.attack = function() {
            creep.body.velocity.x = 0;
            creep.body.velocity.y = 0;
            creep.animations.play('attack');
        }

        creep.kill();

        return creep;
    }

    Creeps.init = function(game) {
        Creeps.group = game.add.group();
        Creeps.group.enableBody = true;

        _.times(MAX_CREEPS, function() {
            Creeps.group.add(new Creep(game));
        });

        return Creeps.group;
    };

    Creeps.addCreep = function() {
        var creep = Creeps.group.getFirstDead();
        if (creep === null || creep === undefined) return;
        creep.spawn();
    };

    Creeps.move = function() {

    };

    var timeUntilNextCreep = 2500;

    Creeps.update = function(timeElapsed) {
        timeSinceLastCreep += timeElapsed;
        if (timeSinceLastCreep > timeUntilNextCreep) {
            timeUntilNextCreep -= 100;
            if (timeUntilNextCreep <300) timeUntilNextCreep = 300;
            Creeps.addCreep();
            //Creeps.group.sort('y', Phaser.Group.SORT_ASCENDING);
            timeSinceLastCreep = 0;
        }
    };

    return Creeps;
});