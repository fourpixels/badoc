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
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    globals.windowWidth = width;
    globals.windowHeight = height;

    return {
        CREEP: {
            width: 126,
            height: 150,
        },
        TOTEM: {
            width: 134,
            height: 326,
            startX: (globals.windowWidth / 2 - 134 / 2),
            startY: (globals.windowHeight - 326),
            maxHits: 10
        },
        COW: {
            width: 189,
            height: 195,
            startX: (globals.windowWidth / 2 - 134 / 2) - 189, // totem startX - cow width
            startY: (globals.windowHeight - 326), // totem startY
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
            startX: (globals.windowWidth / 2 + 134 / 2),// totem endX
            startY: (globals.windowHeight - 326), // totem startY
            maxStamina: 100,
            framesToIncreaseStamina: 4,
            actionAStamina: 50,
            actionBStamina: 90,
            actionAThrottle: 1000,
            actionBThrottle: 5000
        }
    };
});