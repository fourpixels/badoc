/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {
    var EventEmitter = require('EventEmitter');


    function HeroInputs(keymap) {
        EventEmitter.call(this);

        var _this = this;

        this.hero = null;

        this.up = game.input.keyboard.addKey(keymap.up);
        this.down = game.input.keyboard.addKey(keymap.down);
        this.left = game.input.keyboard.addKey(keymap.left);
        this.right = game.input.keyboard.addKey(keymap.right);
        this.a = game.input.keyboard.addKey(keymap.a);
        this.b = game.input.keyboard.addKey(keymap.b);

        function callHeroAction(action) {
            return function() {
                var name = 'input' + action;
                if (_this.hero && _this.hero[name]) {
                    _this.hero[name]();
                }
            }
        }

        this.up.onDown.add(callHeroAction('Up'));
        this.down.onDown.add(callHeroAction('Down'));
        this.left.onDown.add(callHeroAction('Left'));
        this.right.onDown.add(callHeroAction('Right'));
        this.a.onDown.add(callHeroAction('A'));
        this.b.onDown.add(callHeroAction('B'));

        this.setHero = function setHero(hero) {
            _this.hero = hero;
        };
    }

    HeroInputs.prototype = Object.create(EventEmitter.prototype);

    return HeroInputs;
});