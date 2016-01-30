define(function(require, exports, module) {
    var CreepTypes = {
        GREEN: 1,
        RED: 2,
        BLUE: 3
    };
    var _ = require('lodash');
    var MAX_CREEPS = 200;

    var Creeps = {};

    var timeSinceLastCreep = 0;

    Creeps.init = function(game) {
        Creeps.group = game.add.group();
        Creeps.group.enableBody = true;

        _.times(MAX_CREEPS, function() {
            var image = 'creepYellow';
            if (Math.random() < 0.5) {
                image = 'creepRed';
            }
            var creep = game.add.sprite(Math.round(Math.random() * 700), 0, image);
            creep.animations.add('down', [0, 1, 2], 10, true);
            creep.animations.add('left', [3, 4, 5], 10, true);
            creep.animations.add('right', [6, 7, 8], 10, true);
            creep.animations.add('up', [9, 10, 11], 10, true);
            Creeps.group.add(creep);
            creep.kill();
        });
        //game.physics.arcade.enable()
        //
        //setTimeout(function() {
        //    console.log(game.time.elapsed);
        //}, 4000);
        //setTimeout(function() {
        //    console.log(game.time.elapsed);
        //}, 8000);
    };

    Creeps.addCreep = function() {
        // generate random X, Y == 0
        var creep = Creeps.group.getFirstDead();
        if (creep === null || creep === undefined) return;
        creep.revive();
        creep.body.velocity.y = 20;
        creep.animations.play('down');
    };

    Creeps.move = function() {

    };

    var timeUntilNextCreep = 1500;

    Creeps.update = function(timeElapsed) {
        timeSinceLastCreep += timeElapsed;
        //if (timeSinceLastCreep > timeUntilNextCreep) {
        //    timeUntilNextCreep -= 100;
        //    if (timeUntilNextCreep <300) timeUntilNextCreep = 300;
        //    Creeps.addCreep();
        //    Creeps.group.sort('y', Phaser.Group.SORT_ASCENDING);
        //    timeSinceLastCreep = 0;
        //}
    };

    return Creeps;
});