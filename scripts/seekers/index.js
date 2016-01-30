require.config({
    baseUrl: 'scripts',
    paths: {
        'phaser'         : 'libs/phaser.min',
        'easystar'       : 'libs/easystar',
        'seek'           : 'seekers/seek',
        'map'            : 'seekers/map',
        'demo'           : 'seekers/demo',
        'settings'       : 'settings',
    },
    config: {},
    deps: ['phaser'],
    callback: function() {
        require(['demo'], function(game) {
          game();
        });
    }
});
