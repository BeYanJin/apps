/* global $ */

import { GameBg } from "./GameBg.js";

// 提示框 单例对象
let Alert = ( function() {


    // 公有属性、方法和对象
    return {
        move () {
            let spans = GameBg.getGround().getElement();
            spans.removeClass();
            spans.each( function (index, element) {
                if ( element.innerHTML == 7 ) {
                    $(this).addClass("alert alert7");
                } else if ( element.innerHTML == 14 ) {
                    $(this).addClass("alert alert14");
                } else if ( element.innerHTML == 17 ) {
                    $(this).addClass("alert alert17");
                } else if ( element.innerHTML == 18 ) {
                    $(this).addClass("alert alertnext");
                }
            });
        },
        reset () {
            GameBg.getGround().getElement().removeClass();
        }
    };
})();

export { Alert };
