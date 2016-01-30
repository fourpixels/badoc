require.config({
    baseUrl: 'scripts',
    paths: {
        //'jquery'          : 'scripts/lib/jquery-2.1.1.min',
        'jquery'            : 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        'domReady'          : 'libs/domReady',
        'Phaser'            : 'libs/phaser.min',
        'settings'          : 'settings',
        'Game'              : 'game',
        'creeps'         : 'creeps',

        // libs
        'lodash'            : 'libs/lodash.min',
        'EventEmitter'      : 'libs/EventEmitter',

        'debug'             : 'libs/debug',
        'KeysManager'       : 'inputs/KeysManager',
        'KeyMap'            : 'inputs/KeyMap',
        'HeroInputs'        : 'inputs/HeroInputs',

        // hero
        'Cow'               : 'heroes/Cow',
        'Mouse'             : 'heroes/Mouse',
        'BaseHero'          : 'heroes/BaseHero'
    },
    config: {

    },
    deps: ['jquery', 'Phaser', 'lodash', 'settings', 'domReady', 'debug', 'KeyMap', 'KeysManager', 'HeroInputs',
        // heroes
        'Cow', 'Mouse', 'BaseHero',
        'creeps'
    ],
    callback: function(domReady) {
        require(['game'], function(Game) {
            domReady(function() {
                console.info("DOM READY");
                var game = new Game();
                globals.game = game;
            });
        })
    }
});