require.config({
    baseUrl: 'scripts',
    paths: {
        'phaser'         : 'libs/phaser.min',
        'easystar'       : 'libs/easystar',
        'seek'           : 'seekers/seek',
        'settings'       : 'settings',
    },
    config: {},
    deps: ['phaser'],
    callback: function() {
        require(['seek'], function(seek) {
          seek();
        });
    }
});
