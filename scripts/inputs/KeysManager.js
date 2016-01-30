/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {
    var debug = require('debug');

    function KeysManager() {
        window.addEventListener("keydown", keysPressed, false);
        window.addEventListener("keyup", keysReleased, false);

        var keys = {};


        function keysPressed(e) {
            // store an entry for every key pressed
            keys['k' + e.keyCode] = true;

            // Ctrl + Shift + 5
            /*if (keys[17] && keys[16] && keys[53]) {
                // do something
            }*/

            // Ctrl + f
            /*if (keys[17] && keys[70]) {
                // do something

                // prevent default browser behavior
                e.preventDefault();
            }*/
        }

        function keysReleased(e) {
            // mark keys that were released
            //keys[e.keyCode] = false;
            delete keys['k' + e.keyCode];
        }

        this.getPressedKeys = function getPressedKeys() {
            return keys;
        };

        this.isKeyPressed = function isKeyPressed(code) {
            return keys['k' + code] ? true : false; // cast to bool
        };
    }

    return new KeysManager();
});