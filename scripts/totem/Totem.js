/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {

    var Settings = require('settings');

    function Totem(game) {
        var self = this;
        this.maxLifes = Settings.TOTEM.maxHits;
        this.currentLife = this.maxLifes;

        this.sprite = game.add.sprite(globals.windowWidth / 2 - 134 / 2, globals.windowHeight - 326, 'totem');
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.immovable = true;
        this.sprite.anchor.setTo(.5, .9);
        this.sprite.body.setSize(90, 40, 0, 0);

        this.sprite.animations.add('regular', [0, 1, 2, 3, 4, 5, 6], 12, true);
        this.sprite.animations.add('hit', [7, 8, 9, 10, 11, 12], 12, false);
        this.sprite.animations.play('regular');

        this.takingDamage = false;

        this.takeDamage = function() {
            if (!this.takingDamage) {
                this.takingDamage = true;
                if (--this.currentLife < 0) {
                    console.log("GAME OVER")
                }
                this.sprite.animations.play('hit');
                this.sprite.animations.currentAnim.onComplete.add(function() {
                    self.sprite.animations.play('regular');
                    self.takingDamage = false;
                });
            }
        }
    }

    return Totem;
});