/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {

    var Settings = require('Settings');

    function Totem(game) {
        this.maxLifes = Settings.TOTEM.maxHits;
    }

    return Totem;
});