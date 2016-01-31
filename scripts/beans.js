define(function(require, exports, module) {

    var Settings = require('settings');
    var Beans = {};
    var _ = require('lodash');

    var gameRef;

    function Bean(game, renderable) {
        var bean = renderable.create(0, 0, 'bean');
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
        };

        bean.collect = function() {
            bean.alive = false;
            bean.kill();
        };

        bean.kill();

        return bean;
    }

    Beans.init = function(game, renderable) {
        gameRef = game;
        Beans.group = [];

        _.times(Settings.BEAN.maxBeans, function() {
            var aBean = new Bean(game, renderable);
            Beans.group.push(aBean);
        });

        return Beans.group;
    };

    Beans.dropBean = function(x, y) {
        for (var i = 0; i < Beans.group.length; i++) {
            if (!Beans.group[i].alive) {
                Beans.group[i].drop(x, y);
                break;
            }
        }
    };

    return Beans;
});