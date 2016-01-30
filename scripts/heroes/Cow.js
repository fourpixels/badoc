/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {

    var BaseHero = require('BaseHero');

    function Cow(game, inputs) {
        BaseHero.call(this, game, 'cow', inputs);
    }

    Cow.prototype = Object.create(BaseHero.prototype);

    return Cow;
});