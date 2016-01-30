(function (name, definition){
    if (typeof define === 'function'){ // AMD
        define(definition);
    } else if (typeof module !== 'undefined' && module.exports) { // Node.js
        module.exports = definition();
    } else { // Browser
        var theModule = definition(), global = this, old = global[name];
        theModule.noConflict = function () {
            global[name] = old;
            return theModule;
        };
        global[name] = theModule;
    }
})('Settings', function () {
    return {
        COW: {
            width: 139,
            height: 192,
            startX: 350,
            startY: 250,
            velocity: 150,
            maxStamina: 100,
            framesToIncreaseStamina: 2,
            actionAStamina: 10,
            actionBStamina: 50,
            actionAThrottle: 250,
            actionBThrottle: 1000
        },
        MOUSE: {
            width: 66,
            height: 87,
            maxStamina: 100,
            framesToIncreaseStamina: 4,
            actionAStamina: 50,
            actionBStamina: 90,
            actionAThrottle: 1000,
            actionBThrottle: 5000
        },
        CREEP: {
            width: 126,
            height: 150,
        },
        TOTEM: {
            width: 134,
            height: 326,
        }
    };
});