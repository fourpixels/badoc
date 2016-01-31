/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {
    var EventEmitter = require('EventEmitter');

    var debug = require('debug')('jar:heroes:base');
    var Settings = require('settings');
    var Sounds = require('Sounds');

    function BaseHero(game, type, inputs) {
        EventEmitter.call(this);
        var _this = this;

        this.game = game;
        this.type = type;

        this.heroSettings = Settings[type.toUpperCase()];

        this.maxStamina = this.heroSettings.maxStamina;
        this.stamina = this.maxStamina / 2;

        this.sprite = game.add.sprite(Math.round(Math.random() * 500), Math.round(Math.random() * 500), 'hero-' + type);
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;

        /*this.sprite.animations.add('down', [0, 1, 2], 10, true);
        this.sprite.animations.add('left', [3, 4, 5], 10, true);
        this.sprite.animations.add('right', [6, 7, 8], 10, true);
        this.sprite.animations.add('up', [9, 10, 11], 10, true);*/

        this.moving = false;
        this.lookingDir = 1; // TODO: set default?


        this.init = function() {
            this.initSprite();
            this.initAnimations();

            this.inputAThrottle = _.throttle(function() { _this.inputA(); }, this.heroSettings.actionAThrottle, { leading: true, trailing: false });
            this.inputBThrottle = _.throttle(function() { _this.inputB(); }, this.heroSettings.actionBThrottle, { leading: true, trailing: false });

            this.setInputs(inputs);
        };

        this.initSprite = function initSprite() {
            this.sprite.anchor.setTo(.66, .5);
        };

        this.initAnimations = function initAnimations() {
            console.log('base init animations');
            this.sprite.animations.add('idle', [0], 12, false);
            this.sprite.animations.add('move', [1,2,3,4,5,6,7,8], 12, true);
        };

        this.staminaCounter = 0;

        this.update = function() {
            var lookingDir;
            var moving = false;
            if (_this.inputs.left.isDown) {
                moving = true;
                lookingDir = -1;

                _this.sprite.body.velocity.x = -Settings.COW.velocity;
            } else if (_this.inputs.right.isDown) {
                moving = true;
                lookingDir = 1;
                _this.sprite.body.velocity.x = Settings.COW.velocity;
            } else {
                //lookingDir = 0;
                _this.sprite.body.velocity.x = 0;
            }

            if (lookingDir && lookingDir != _this.lookingDir) {
                _this.lookingDir = lookingDir;
                _this.sprite.scale.x = _this.lookingDir == 0 ? 1 : _this.lookingDir;
            }

            if (_this.inputs.up.isDown) {
                moving = true;
                _this.sprite.body.velocity.y = -Settings.COW.velocity;
            } else if (_this.inputs.down.isDown) {
                moving = true;
                _this.sprite.body.velocity.y = Settings.COW.velocity;
            } else {
                _this.sprite.body.velocity.y = 0;
            }

            if (moving != _this.moving) {
                if (!moving) {
                    _this.stop();
                } else {
                    _this.walk();
                }

                _this.moving = moving;
            }

            _this.staminaCounter++;
            if (_this.staminaCounter == _this.heroSettings.framesToIncreaseStamina) {
                _this.staminaCounter = 0;
                _this.increaseStamina(1);
            }
        };

        var _update = this.sprite.update;
        this.sprite.update = function() {
            _this.update();
        };

        this.increaseStamina = function increaseStamina(by) {
            this.stamina = Math.min(this.stamina + by, this.maxStamina);
        };

        this.gotoAndPlay = function gotoAndPlay(label) {
            _this.sprite.animations.play(label);
            Sounds.mouseWalk.play();
        };

        this.walk = function walk() {
            console.log('base walk');
            _this.gotoAndPlay('move');
        };

        this.stop = function stop() {
            _this.sprite.animations.play('idle');
            Sounds.mouseWalk.stop();
            //_this.sprite.animations.stop(null, true);
        };


        this.inputA = function inputA() {
            debug('> hero [%s] input - a', type, this);
            if (this.hasEnoughStaminaForA()) {
                this.stamina -= this.heroSettings.actionAStamina;
                this.executeA();
            }
        };
        this.inputB = function inputB() {
            debug('> hero [%s] input - b', type);
            if (this.hasEnoughStaminaForB()) {
                this.stamina -= this.heroSettings.actionBStamina;
                this.executeB();
            }
        };

        this.executeA = function executeA() {
            _this.emit('action:a');
        };

        this.executeB = function executeB() {
            _this.emit('action:b');
        };

        this.hasEnoughStaminaForA = function hasEnoughStaminaForA() {
            return this.stamina >= this.heroSettings.actionAStamina;
        };

        this.hasEnoughStaminaForB = function hasEnoughStaminaForB() {
            return this.stamina >= this.heroSettings.actionBStamina;
        };


        this.setInputs = function setInputs(controller) {
            this.listenInputs(_this.inputs, false);
            _this.inputs = controller;
            this.listenInputs(_this.inputs, true);
        };

        this.listenInputs = function listenInputs(controller, state) {
            if (!controller)
                return;

            if (state) {
                debug('hero %s listen inputs', type);
                /*controller.on('input:left', _this.inputLeft);
                controller.on('input:right', _this.inputRight);
                controller.on('input:up', _this.inputUp);
                controller.on('input:down', _this.inputDown);*/
                controller.on('input:a', this.inputAThrottle);
                controller.on('input:b', this.inputBThrottle);
            } else {
                /*controller.removeListener('input:left', _this.inputLeft);
                controller.removeListener('input:right', _this.inputRight);
                controller.removeListener('input:up', _this.inputUp);
                controller.removeListener('input:down', _this.inputDown);*/
                controller.removeListener('input:a', this.inputAThrottle);
                controller.removeListener('input:b', this.inputBThrottle);
            }
        };


        /*_this.inputLeft = inputLeft;
        _this.inputRight = inputRight;
        _this.inputUp = inputUp;
        _this.inputDown = inputDown;*/
        /*function inputLeft() {
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
        }*/
    }

    BaseHero.prototype = Object.create(EventEmitter.prototype);

    return BaseHero;
});
