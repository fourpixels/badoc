define(function(require, exports, module) {

    var Settings = require('settings');
    var Beans = {};
    var _ = require('lodash');

    var gameRef;

    function Bean(game) {
        var bean = game.add.sprite(0, 0, 'bean');
        bean.anchor.setTo(.5, .5);
        game.physics.enable(bean, Phaser.Physics.ARCADE);
        bean.body.setSize(45, 25, 0, 40);
        bean.animations.add('drop', [0, 1, 2, 3, 4, 5, 6, 7, 9, 10], 12, false);
        bean.animations.add('idle', [10], 12, false);

        bean.drop = function(x, y) {
            bean.revive();
            bean.reset(x, y);
            bean.alive = true;
            bean.animations.play('drop').onComplete.add(function(){
                if (bean.alive) {
                    bean.animations.play('idle');
                    // bean disappears after some time
                    gameRef.add.tween(bean).to({alpha: 0}, Settings.BEAN.beanTimeout, Phaser.Easing.Linear.None, true, 0).onComplete.add(function() {
                        if (bean.alive) {
                            bean.alive = false;
                            bean.kill();
                        }
                    });
                }
            });
        }

        bean.collect = function() {
            bean.alive = false;
            bean.kill();
        };

        bean.kill();

        return bean;
    }

    Beans.init = function(game) {
        gameRef = game;
        Beans.group = game.add.group();
        Beans.group.enableBody = true;

        _.times(Settings.BEAN.maxBeans, function() {
            Beans.group.add(new Bean(game));
        });

        return Beans.group;
    };

    Beans.dropBean = function(x, y) {
        var bean = Beans.group.getFirstDead();
        if (bean === null || bean === undefined) return;
        bean.drop(x, y);
    };

    return Beans;
});