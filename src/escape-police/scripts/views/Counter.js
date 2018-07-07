/* global $ */

import "jquery-timer";

// 思考时间倒计时器 单例对象
let Counter = ( function() {

    // 私有属性、方法和对象
    let _element = $("#counter"),
        _secElement = $("#counter span"),
        _time = 2.0,
        // 游戏结束 倒计时器
        _gameOverTimer = $.timer(),
        // 2s 倒计时器
        _downTimer = $.timer(() => {
            _time -= 0.1;
            _secElement.text(_time.toString().substring(0, 3));
        });

    _downTimer.set({ time : 100, autostart : false });
    _gameOverTimer.set({ time : 2000, autostart : false });

    // 公有属性、方法和对象
    return {
        hide () {
            _element.hide();
        },
        show () {
            _element.show();
        },
        countDown (callback) {

            _gameOverTimer.set({
                action () {

                    // 若游戏结束, 执行回调函数
                    callback && callback();
                }
            });

            // 重置秒数为 2s
            Counter.reset();

            // 重置并重新启动各计时器
            _downTimer.reset(true);
            _gameOverTimer.reset(true);

        },
        stop () {
            // 停止 2s 倒计时器
            _downTimer.stop();
            _gameOverTimer.stop();

            // 重置 思考时间 为 2s
            Counter.reset();
        },
        reset () {
            _time = 2.0;

            // 重置 思考时间 为 2s
            _secElement.text("2");
        }
    };
})();

export { Counter };
