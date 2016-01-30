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
            velocity: 150
        }
    };
});