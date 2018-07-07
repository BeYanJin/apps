/* global $ */

// 游戏结束层 单例对象
let GameOverLayer = ( function() {

    // 私有属性、方法和对象
    let _element = $("#game-over-layer");

    // 怎么玩 按钮 单例对象
    let _HowTOPlay = ( function() {

        // 私有属性、方法和对象
        let _element = $("#game-over-layer #how-to-play");
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

    // 怎么玩 按钮 单例对象
    let _Again = ( function() {

        // 私有属性、方法和对象
        let _element = $("#game-over-layer #again");
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
        getHowTOPlay () {
            return _HowTOPlay;
        },
        getAgain () {
            return _Again;
        }
    };
})();

export { GameOverLayer };
