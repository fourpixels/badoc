/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {

    var debug = require('debug')('jar:heroes:base');

    function BaseHero(game, type, inputs) {
        var _this = this;

        this.game = game;
        this.type = type;

        this.sprite = game.add.sprite(Math.round(Math.random() * 500), Math.round(Math.random() * 500), 'hero-' + type);
        game.physics.arcade.enable(this.sprite);
        this.sprite.animations.add('down', [0, 1, 2], 10, true);
        this.sprite.animations.add('left', [3, 4, 5], 10, true);
        this.sprite.animations.add('right', [6, 7, 8], 10, true);
        this.sprite.animations.add('up', [9, 10, 11], 10, true);

        var _update = this.sprite.update;
        this.sprite.update = function() {
            
        };

        _this.inputLeft = inputLeft;
        _this.inputRight = inputRight;
        _this.inputUp = inputUp;
        _this.inputDown = inputDown;
        _this.inputA = inputA;
        _this.inputB = inputB;

        setInputs(inputs);

        function setInputs(controller) {
            listenInputs(_this.inputs, false);
            _this.inputs = controller;
            listenInputs(_this.inputs, true);
        }
        this.setInputs = setInputs;

        function listenInputs(controller, state) {
            if (!controller)
                return;

            if (state) {
                debug('hero %s listen inputs', type);
                controller.on('input:left', _this.inputLeft);
                controller.on('input:right', _this.inputRight);
                controller.on('input:up', _this.inputUp);
                controller.on('input:down', _this.inputDown);
                controller.on('input:a', _this.inputA);
                controller.on('input:b', _this.inputB);
            } else {
                controller.removeListener('input:left', _this.inputLeft);
                controller.removeListener('input:right', _this.inputRight);
                controller.removeListener('input:up', _this.inputUp);
                controller.removeListener('input:down', _this.inputDown);
                controller.removeListener('input:a', _this.inputA);
                controller.removeListener('input:b', _this.inputB);
            }
        }

        function inputLeft() {
            debug('> hero [%s] input - left', type);
        }
        function inputRight() {
            debug('> hero [%s] input - right', type);
        }
        function inputUp() {
            debug('> hero [%s] input - up', type);
            _this.sprite.body.velocity.y = -10;
        }
        function inputDown() {
            debug('> hero [%s] input - down', type);
        }
        function inputA() {
            debug('> hero [%s] input - a', type);
        }
        function inputB() {
            debug('> hero [%s] input - b', type);
        }
    }

    return BaseHero;
});