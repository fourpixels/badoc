/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {
    var EventEmitter = require('EventEmitter');


    function HeroInputs(game, keymap) {
        EventEmitter.call(this);

        var _this = this;

        this.up = game.input.keyboard.addKey(keymap.up);
        this.down = game.input.keyboard.addKey(keymap.down);
        this.left = game.input.keyboard.addKey(keymap.left);
        this.right = game.input.keyboard.addKey(keymap.right);
        this.a = game.input.keyboard.addKey(keymap.a);
        this.b = game.input.keyboard.addKey(keymap.b);

        function dispatch(action) {
            return function() {
                //console.log('dispatch -> input:%s', action);
                _this.emit('input:' + action);
            }
        }

        /*this.up.onDown.add(dispatch('up'));
        this.down.onDown.add(dispatch('down'));
        this.left.onDown.add(dispatch('left'));
        this.right.onDown.add(dispatch('right'));*/
        this.a.onDown.add(dispatch('a'));
        this.b.onDown.add(dispatch('b'));
    }

    HeroInputs.prototype = Object.create(EventEmitter.prototype);

    return HeroInputs;
});