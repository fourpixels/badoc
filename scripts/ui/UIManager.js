/**
 * Created by morifey on 30-Jan-16.
 */
define(function(require, exports, module) {

    function UIManager(game) {

        var cowBar;
        var mouseBar;

        if (game.cow)
            cowBar = new Bar(120, 70, game.cow);
        if (game.mouse)
            mouseBar = new Bar(560, 70, game.mouse);

        var avatarCow = game.add.image(10, 10, 'avatar-cow');
        var avatarMouse = game.add.image(440, 10, 'avatar-mouse');

        function Bar(x, y, hero) {
            var bgr = game.add.image(x, y, 'stamina-bar-bgr');
            var front = game.add.image(x, y, 'stamina-bar-over');

            var mask = game.add.graphics(x, y);
            mask.beginFill(0xffeecc);
            mask.drawRect(0, 0, 300, 20);
            mask.endFill();
            front.mask = mask;

            bgr.update = function() {
                //console.log(hero.stamina);
                mask.x = x - 300 + ((hero.stamina / 100) * 300);
                //console.log('updaaaaaate');
            };

           /* var id = setInterval(function() {
                mask.x -= 1;
            }, 100);*/

        }
    }

    return UIManager;
});