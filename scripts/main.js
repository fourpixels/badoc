require.config({
    baseUrl: 'scripts',
    paths: {
        'jquery'          : 'libs/jquery-2.1.1.min',
        //'jquery'            : 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        'domReady'          : 'libs/domReady',
        'Phaser'            : 'libs/phaser.min',
        'settings'          : 'settings',
        'Game'              : 'game',
        'Sounds'            : 'sounds',
        'creeps'            : 'creeps',
        'beans'             : 'beans',

        'easystar'       : 'libs/easystar',

        // libs
        'lodash'            : 'libs/lodash.min',
        'EventEmitter'      : 'libs/EventEmitter',
        'seek'              : 'seek',
        'map'               : 'map',
        'defaultMap'        : 'defaultMap',
        'gameOver'        : 'gameOver',

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
    deps: ['jquery', 'Phaser', 'lodash', 'settings', 'domReady', 'debug', 'KeyMap', 'KeysManager', 'HeroInputs', 'Sounds',
        // heroes
        'Cow', 'Mouse', 'BaseHero',
        'creeps', 'beans',

        // ui
        'UIManager'
    ],
    callback: function(domReady) {
        require(['game', 'gameOver'], function(Game, GameOver) {
            domReady(function() {
              var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'test', null, false, true);

              game.state.add('GameOver', GameOver);
              game.state.add('Game', Game);
              game.state.start('Game');

              globals.game = game;
            });
        })
    }
});
