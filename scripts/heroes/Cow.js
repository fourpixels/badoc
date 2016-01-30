/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {

    var BaseHero = require('BaseHero');

    function Cow(game, inputs) {
        BaseHero.call(this, game, 'cow', inputs);

        var _this = this;

        this.cowColor = 'red';

        this.cast = function cast(color) {
            if (color != this.cowColor) {
                this.cowColor = color;
                this.stop();
            }
        };

        this.switchColor = function switchColor() {
            this.cast(this.cowColor == 'red' ? 'blue' : 'red');
        };

        this.walk = function walk() {
            var label = 'move-' + this.cowColor;
            //console.log('cow walk', label);
            this.gotoAndPlay(label);
        };

        this.initAnimations = function initAnimations() {
            console.log('cow init animations',  this);
            this.sprite.animations.add('idle-red', [0], 12, false);
            this.sprite.animations.add('idle-blue', [9], 12, false);
            this.sprite.animations.add('move-red', [0,1,2,3,4,5,6,7,8], 12, true);
            this.sprite.animations.add('move-blue', [9,10,11,12,13,14,15,16,17], 12, true);
        };

        this.stop = function stop() {
            _this.sprite.animations.play('idle-' + this.cowColor);
        };

        this.init();

    }

    Cow.prototype = Object.create(BaseHero.prototype);

    return Cow;
});