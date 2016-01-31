/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {

    var BaseHero = require('BaseHero');
    var Settings = require('settings');
    var Sounds = require('Sounds');

    function Cow(game, inputs, renderable) {
        BaseHero.call(this, game, 'cow', inputs, renderable);

        var _this = this;

        this.cowColor = 'blue';
        this.hitSprite = renderable.create(this.sprite.x, this.sprite.y, 'cow-hit');
        this.hitSprite.alpha = .2;
        game.physics.arcade.enable(this.hitSprite);
        this.hitSprite.body.enable = false;

        var hideHit = false;
        var hideLarge = false;

        var _update = this.update;
        this.update = function update() {
            _update();
            this.hitSprite.x = this.sprite.x;
            this.hitSprite.y = this.sprite.y;

            if (hideHit) {
                hideHit = false;
                /*this.hitSprite.alpha = .2;
                this.hitSprite.scale.x = this.hitSprite.scale.y = 1;
                this.hitSprite.body.enable = false;*/
            }

            if (this.hitSprite.alpha > .5) {
                hideHit = true;

                this.hitSprite.alpha = .2;
                this.hitSprite.scale.x = this.hitSprite.scale.y = 1;
                this.hitSprite.body.enable = false;
            }

            //game.debug.body(this.hitSprite);
        };

        this.executeA = function executeA() {
            _this.hitSprite.alpha = .72;
            this.hitSprite.body.enable = true;
            this.casting = true;

            this.sprite.animations.play('hit-' + this.cowColor).onComplete.add(function(){
                _this.casting = false;
                if (_this.moving) {
                    _this.walk();
                } else {
                    _this.stop();
                }
            });
            Sounds.hit.play();
            _this.emit('action:a');
        };

        this.executeB = function executeB() {
            _this.hitSprite.alpha = .72;
            _this.hitSprite.scale.x = _this.hitSprite.scale.y = 1.5;
            this.hitSprite.body.enable = true;
            _this.emit('action:b');
        };

        this.castColor = function cast(color) {
            if (!color)
                return;
            if (color != this.cowColor) {
                this.cowColor = color;
                this.stop();
            }
        };

        this.switchColor = function switchColor() {
            this.castColor(this.cowColor == 'red' ? 'blue' : 'red');
        };

        this.walk = function walk() {
            var label = 'move-' + this.cowColor;
            //console.log('cow walk', label);
            this.gotoAndPlay(label);
        };

        this.initAnimations = function initAnimations() {
            //console.log('cow init animations',  this);
            this.sprite.animations.add('idle-red', [9], 12, false);
            this.sprite.animations.add('idle-blue', [0], 12, false);
            this.sprite.animations.add('move-red', [10,11,12,13,14,15,16,17], 12, true);
            this.sprite.animations.add('move-blue', [1,2,3,4,5,6,7,8], 12, true);
            this.sprite.animations.add('hit-blue', [18, 19, 20, 21, 22, 23, 24], 16, false);
            this.sprite.animations.add('hit-red', [25, 26, 27, 28, 29, 30, 31], 16, false);
            //this.pouf.animations.play('pouf');
        };

        this.initSprite = function initSprite() {
            this.sprite.reset(Settings.COW.startX, Settings.COW.startY);
            this.sprite.anchor.setTo(.5, .95);
            this.hitSprite.anchor.setTo(.5,.65);
            this.sprite.body.setSize(55, 25, 5, 10);
            this.pouf.anchor.setTo(.5, 1);
        };

        this.stop = function stop() {
            _this.sprite.animations.play('idle-' + this.cowColor);
        };

        this.init();
        this.stop();
    }

    Cow.prototype = Object.create(BaseHero.prototype);

    return Cow;
});