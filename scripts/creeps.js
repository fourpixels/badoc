define(function(require, exports, module) {
    var Settings = require('settings');

    var CreepTypes = {
        RED: 1,
        BLUE: 2
    };
    var _ = require('lodash');

    var Creeps = {};
    var timeSinceLastCreep = 0;

    var gameRef;

    function Creep(game, renderable) {
        gameRef = game; // YES , THIS IS BAD
        var creep;
        creep = renderable.create(0, 0, 'creep');
        creep.anchor.setTo(.5, .9);
        if (Math.random() < 0.5) {
            creep.type = CreepTypes.RED;
        } else {
            creep.type = CreepTypes.BLUE;
        }
        //var creep = game.add.sprite(Math.round(Math.random() * globals.windowWidth),Math.round(Math.random() * globals.windowHeight), image);
        game.physics.enable(creep, Phaser.Physics.ARCADE);

        // creep collision area
        creep.body.setSize(50, 25, 0, 25);

        creep.checkWorldBounds = true;
        creep.outOfBoundsKill = true;
        creep.body.collideWorldBounds = true;

        // creep animations
        creep.animations.add('move-blue', [0, 1, 2, 3, 4, 5, 6, 7], 12, true);
        creep.animations.add('die-blue', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 12, false).killOnComplete = true;
        creep.animations.add('move-red', [24, 25, 26, 27, 28, 29, 30, 31], 12, true);
        creep.animations.add('die-red', [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47], 12, false).killOnComplete = true;

        creep.spawn = function() {
            creep.revive();
            creep.dead = false;
            creep.body.enable = true;
            gameRef.add.tween(creep).from({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0);
            var some = Math.random();
            var x = 0
            if (some > 0.67) {
                x = globals.windowWidth - creep.body.width;
            } else if (some > 0.33) {
                x = Math.round(globals.windowWidth / 2) - Math.round(creep.body.width / 2)
            } else {
                x = creep.body.width;
            }
            creep.reset(x, creep.body.height);

            //calculate direction
            if (creep.type == CreepTypes.BLUE) {
                creep.animations.play('move-blue');
            } else {
                creep.animations.play('move-red');
            }
        }

        // kill creep and return death coordinates
        // callback to put a jelly bean at given coordinates
        creep.die = function(callback) {
            if (!creep.dead) {
                creep.body.enable = false;
                creep.dead = true;
                if (creep.type == CreepTypes.BLUE) {
                    creep.animations.play('die-blue'); // animation is set to kill it at the end
                } else {
                    creep.animations.play('die-red'); // animation is set to kill it at the end
                }

                if (callback) {
                    creep.animations.currentAnim.onComplete.add(function() {
                        var coordinates = {
                            x: creep.body.x,
                            y: creep.body.y
                        };
                        callback(coordinates);
                    });
                }
            }
        };

        creep.attack = function() {
            creep.animations.play('attack');
        }

        creep.kill();

        return creep;
    }

    Creeps.init = function(game, renderable) {
        Creeps.group = []

        _.times(Settings.CREEP.maxCreeps, function() {
            var aCreep = new Creep(game, renderable);
            Creeps.group.push(aCreep);
        });

        return Creeps.group;
    };

    Creeps.addCreep = function() {
        for (var i = 0; i < Creeps.group.length; i++) {
            if (!Creeps.group[i].alive) {
                Creeps.group[i].spawn();
                break;
            }
        }
    };

    var timeUntilNextCreep = 3000;

    Creeps.update = function(timeElapsed) {
        timeSinceLastCreep += timeElapsed;
        if (timeSinceLastCreep > timeUntilNextCreep) {
            timeUntilNextCreep -= 100;
            if (timeUntilNextCreep < 1000) timeUntilNextCreep = 1000;
            Creeps.addCreep();
            timeSinceLastCreep = 0;
        }
    };

    return Creeps;
});
