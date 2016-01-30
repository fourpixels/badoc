require.config({
    baseUrl: 'scripts',
    paths: {
        'phaser'         : 'libs/phaser.min',
        'easystar'       : 'libs/easystar',
        'seek'           : 'seek',
        'map'            : 'map',
        'demo'           : 'seekers/demo',
    },
    config: {},
    deps: ['phaser'],
    callback: function() {
        require(['demo'], function(game) {
          game();
        });
    }
});
