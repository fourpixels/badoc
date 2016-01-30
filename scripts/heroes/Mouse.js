/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {

    var BaseHero = require('BaseHero');

    function Mouse(game, inputs) {
        BaseHero.call(this, game, 'mouse', inputs);
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


        this.initSprite = function initSprite() {
            this.sprite.anchor.setTo(.62, .95);
            this.sprite.body.setSize(50, 25, 5, 5);
        };

        this.init();
    }

    Mouse.prototype = Object.create(BaseHero.prototype);

    return Mouse;
});