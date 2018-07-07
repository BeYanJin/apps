/* global $ */

// 游戏控制按钮 单例对象
let GameBtn = ( function() {

    // 私有属性、方法和对象
    let _element = $("#game-btn");

    // 躲 按钮
    let _EscapeBtn = ( function() {
        let _element = $("#game-btn #escape");
        return {
            handleClick (callback) {
                _element.click( () => {

                    // 执行回调函数
                    callback && callback();
                });
            },
            getElement () {
                return _element;
            }
        };
    })();

    // 跑 按钮
    let _RunBtn = ( function() {
        let _element = $("#game-btn #run");
        return {
            handleClick (callback) {
                _element.click( () => {

                    // 执行回调函数
                    callback && callback();
                });
            },
            getElement () {
                return _element;
            }
        };
    })();

    // 公有属性、方法和对象
    return {
        hide () {
            _element.hide();
        },
        show () {
            _element.show();
        },
        getRunBtn () {
            return _RunBtn;
        },
        getEscapeBtn () {
            return _EscapeBtn;
        }
    };
})();

export { GameBtn };
