/* global $ */

import { Packman } from "./Packman.js";

// 城管 单例对象
let Police = ( function() {

    // 私有属性、方法和对象
    let _element = $("#police");
    let _bElement =  $("#beat-cloud");
    let _timer = $.timer();

    _timer.set({autostart : false });

    let catching = function (callback) {

        _element.children().eq(0).addClass("police1-catch");
        _element.children().eq(1).addClass("police2-catch");
        _element.children().eq(2).addClass("police3-catch");

        _timer.set({
            action () {
                _element.children().removeClass();
                _element.children().addClass("police");

                callback && callback();
            }
        });
        _timer.once(480);
    };
    let beat = function (callback) {

        Packman.hide();
        _bElement.removeClass();
        _bElement.addClass("beat");

        // 播放打斗的音频
        $("#beat-music")[0].play();

        _timer.set({
            action () {

                callback && callback();
            }
        });
        _timer.once(480);
    };

    // 公有属性、方法和对象
    return {
        startMovie (callback) {
            catching( function () {
                beat( function () {
                    _bElement.removeClass();
                    _bElement.addClass("show-block");

                    // 若游戏结束, 城管动画播放完毕, 执行回调函数
                    callback && callback();
                });
            });
        },
        hideBeatCloud () {
            _bElement.removeClass();
        }
    };
})();

export { Police };
