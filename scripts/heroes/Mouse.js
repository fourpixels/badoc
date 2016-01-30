/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {

    var BaseHero = require('BaseHero');

    function Mouse(game, inputs) {
        BaseHero.call(this, game, 'mouse', inputs);
    }

    Mouse.prototype = Object.create(BaseHero.prototype);

    return Mouse;
});