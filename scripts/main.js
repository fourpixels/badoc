require.config({
    baseUrl: 'scripts',
    paths: {
        //'jquery'          : 'scripts/lib/jquery-2.1.1.min',
        'jquery'            : 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        'domReady'          : 'libs/domReady',
        'phaser'            : 'libs/phaser.min',
        'settings'          : 'settings',
        'Game'              : 'game',

        // libs
        'lodash'            : 'libs/lodash.min',

        'debug'             : 'libs/debug',
        'KeysManager'       : 'inputs/KeysManager'
    },
    config: {

    },
    deps: ['jquery', 'phaser', 'lodash', 'settings', 'domReady', 'debug', 'KeysManager'],
    callback: function(domReady) {
        require(['game'], function(Game) {
            domReady(function() {
                console.info("DOM READY");
                var game = new Game();
            });
        })
    }
});