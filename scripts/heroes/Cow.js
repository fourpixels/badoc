/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {

    var BaseHero = require('BaseHero');

    function Cow(game, inputs) {
        BaseHero.call(this, game, 'cow', inputs);

        var _this = this;

        this.cowColor = 'red';
        this.hitSprite = game.add.sprite(this.sprite.x, this.sprite.y, 'cow-hit');
        this.hitSprite.alpha = .2;
        game.physics.arcade.enable(this.hitSprite);
        //this.hitSprite.body.enable = false;

        var hideHit = false;
        var hideLarge = false;

        var _update = this.update;
        this.update = function update() {
            _update();
            this.hitSprite.x = this.sprite.x;
            this.hitSprite.y = this.sprite.y;

            if (hideHit) {
                hideHit = false;
                //this.hitSprite.alpha = .2;
                this.hitSprite.scale.x = this.hitSprite.scale.y = 1;
                this.hitSprite.body.enable = false;
            }

            if (this.hitSprite.alpha > .5) {
                hideHit = true;
            }

            //game.debug.body(this.hitSprite);
        };

        this.executeA = function executeA() {
            _this.hitSprite.alpha = .72;
            this.hitSprite.body.enable = true;
            _this.emit('action:a');
        };

        this.executeB = function executeB() {
            _this.hitSprite.alpha = .72;
            _this.hitSprite.scale.x = _this.hitSprite.scale.y = 1.5;
            this.hitSprite.body.enable = true;
            _this.emit('action:b');
        };

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

        this.initSprite = function initSprite() {
            this.sprite.anchor.setTo(.62, .95);
            this.hitSprite.anchor.setTo(.5,.65);
        };

        this.stop = function stop() {
            _this.sprite.animations.play('idle-' + this.cowColor);
        };

        this.init();

    }

    Cow.prototype = Object.create(BaseHero.prototype);

    return Cow;
});