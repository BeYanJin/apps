/* global $ */

// 潮汕快炒小哥 单例对象
let Packman = ( function() {

    // 私有属性、方法和对象
    let _element = $("#packman"),
        _index = 0;

    // 公有属性、方法和对象
    return {
        run () {
            _element.removeClass();
            if (_index == 0) {
                _element.addClass("packman-run1");
            } else {
                _element.addClass("packman-run2");
            }
            if ( ++_index == 2) {
                _index = 0;
            }
        },
        escape () {
            _element.removeClass();
            _element.addClass("packman-escape");
        },
        caught () {
            _element.removeClass();
            _element.addClass("packman-caught");
        },
        // 显示人物并重置人物位置
        reset () {
            _element.removeClass();
            Packman.show();
        },
        show () {
            _element.show();
        },
        hide () {
            _element.hide();
        }
    };
})();

export { Packman };
