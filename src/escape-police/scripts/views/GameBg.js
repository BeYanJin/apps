/* global $ */

// 游戏背景
let GameBg = ( function () {

    // 私有属性、方法和对象
    // 背景偏移量
    let _offset = 0,
        _element = $("#game-bg");
    // 地面 单例对象
    let _Ground = ( function() {

        // 私有属性、方法和对象
        let _element = $("#ground span");

        // 公有属性、方法和对象
        return {
            show () {
                $("#ground").show();
            },
            // 将地面上的数字全部加 1
            add () {
                _element.each(function () {
                    let value = parseInt( $(this).text() ) + 1;
                    $(this).text(value);
                });
            },
            // 将地面上的数字还原回最初的 -1, 0, 1, 2, ......
            reset () {
                _element.each(function (index) {
                    $(this).text(index - 1);
                });
                $("#ground span:first-child").hide();
            },
            // 初始化背景中地面上的数字的left值
            init () {
                _element.each(function (index) {
                    let left = index * 80 - 50;
                    $(this).css("left", left + "px");
                });
            },
            getElement () {
                return _element;
            }
        };
    })();

    return {
        getGround () {
            return _Ground;
        },
        // 背景向左偏移, 地面上的数字全部加 1
        move () {
            _Ground.getElement().eq(0).show();
            _offset += 80;
            _element.css("background-position", "-" + _offset + "px 0");
            if (_offset >= 1120) {
                _offset = 0;
            }
            _Ground.add();
        },
        // 获取当前所站的地面上的数字
        getCurrentStep () {
            return _Ground.getElement().get(1).innerHTML;
        }
    };

})();


export { GameBg };
