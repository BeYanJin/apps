/* global $ */

// 初始层 单例对象
let InitialLayer = ( function() {

    // 私有属性、方法和对象
    let _element = $("#initial-layer");

    // 游戏开始按钮 单例对象
    let _StartBtn = ( function () {

        // 私有属性、方法和对象
        let _element = $("#start-btn button");
        // 公有属性、方法和对象
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
        // 隐藏自身
        hide () {
            _element.hide();
        },
        show () {
            _element.show();
        },
        getStartBtn () {
            return _StartBtn;
        }
    };
})();

export { InitialLayer };
