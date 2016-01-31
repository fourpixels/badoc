/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {

    var BaseHero = require('BaseHero');
    var Settings = require('settings');
    var Sounds = require('Sounds');

    function Mouse(game, inputs, renderable) {
        BaseHero.call(this, game, 'mouse', inputs, renderable);
        var _this = this;

        /*var _inputA = this.inputA;
        this.inputA = function inputA() {
            _inputA();
        };

        var _inputB = this.inputB;
        this.inputB = function inputB() {
            console.log('ooooooo ', this);
            if (_this.hasEnoughStaminaForB()) {
                _inputB.call(_this);
            }
        };*/

        this.initAnimations = function initAnimations() {
            //console.log('mouse init animations',  this);
            this.sprite.animations.add('idle', [0], 12, false);
            this.sprite.animations.add('move', [1,2,3,4,5,6,7,8], 12, true);
            var spellGreenAnim = this.sprite.animations.add('spell-blue', [9,10,11,12,13,14,15,16,17,18], 12, false);
            var spellRedAnim = this.sprite.animations.add('spell-red', [19,20,21,22,23,24,25,26,27,28], 12, false);
            var teleportAnim = this.sprite.animations.add('teleport', [29,30,31,32,33,34,35], 12, false);

            function castingEnded() {
                _this.casting = false;
                _this.stop();
                if (!_this.moving) {
                    _this.stop();
                } else {
                    _this.walk();
                }
            }

            spellGreenAnim.onComplete.add(castingEnded);
            spellRedAnim.onComplete.add(castingEnded);
            teleportAnim.onComplete.add(castingEnded);
        };

        this.cast = function cast(color) {
            this.sprite.animations.play('spell-' + color);
            this.casting = true;
            Sounds.mouseSpell.play();
        };

        this.initSprite = function initSprite() {
            this.sprite.reset(Settings.MOUSE.startX, Settings.MOUSE.startY);
            //this.sprite.anchor.setTo(.62, .95);
            this.pouf.anchor.setTo(.5, 1);
            this.sprite.anchor.setTo(.5, .95);
            this.sprite.body.setSize(50, 25, 5, 5);

            // 0 - idle
            // 1 - 8 - walk
            // 9 - 18 - spell 1
            // 18-26 - spell 2
            // 27 - end - spell 3
        };

        this.init();
    }

    Mouse.prototype = Object.create(BaseHero.prototype);

    return Mouse;
});