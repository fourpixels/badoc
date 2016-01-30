require.config({
    baseUrl: 'scripts',
    paths: {
        //'jquery'         : 'scripts/lib/jquery-2.1.1.min',
        'jquery'         : 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        'domReady'       : 'libs/domReady',
        'phaser'         : 'libs/phaser.min',
        'settings'       : 'settings',
        'game'           : 'game'
    },
    config: {

    },
    deps: ['jquery', 'phaser', 'settings', 'domReady'],
    callback: function(domReady) {
        require(['game'], function(game) {
            domReady(function() {
                console.info("DOM READY");
                game();
            });
        })
    }
});