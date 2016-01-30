require.config({
    baseUrl: 'scripts',
    paths: {
        'jquery'          : 'libs/jquery-2.1.1.min',
        //'jquery'            : 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        'domReady'          : 'libs/domReady',
        'Phaser'            : 'libs/phaser.min',
        'settings'          : 'settings',
        'Game'              : 'game',
        'creeps'            : 'creeps',

        'easystar'       : 'libs/easystar',

        // libs
        'lodash'            : 'libs/lodash.min',
        'EventEmitter'      : 'libs/EventEmitter',
        'seek'              : 'seek',
        'map'               : 'map',
        'defaultMap'        : 'defaultMap',

        'debug'             : 'libs/debug',
        'KeysManager'       : 'inputs/KeysManager',
        'KeyMap'            : 'inputs/KeyMap',
        'HeroInputs'        : 'inputs/HeroInputs',

        // hero
        'Cow'               : 'heroes/Cow',
        'Mouse'             : 'heroes/Mouse',
        'BaseHero'          : 'heroes/BaseHero',

        'Totem'             : 'totem/Totem',

        // ui
        'UIManager'         : 'ui/UIManager'
    },
    config: {

    },
    deps: ['jquery', 'Phaser', 'lodash', 'settings', 'domReady', 'debug', 'KeyMap', 'KeysManager', 'HeroInputs',
        // heroes
        'Cow', 'Mouse', 'BaseHero',
        'creeps',

        // ui
        'UIManager'
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
