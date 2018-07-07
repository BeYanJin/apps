import { GameBg } from "./GameBg.js";

// StartInfo单例对象（get-ready提醒图片）
let StartInfo = (function () {

        // get-ready盒子
    let _element = document.createElement("div"),
        // get-ready图片
        _img = document.createElement("img");

    return {
        show () {

            // 设置装小鸟的盒子
            _element.id = "start-info";
            _element.className = "show-block";

            // 设置小鸟图片
            _img.src = document.querySelector(".ready-img img").src;
            _img.draggable = false;

            // 将小鸟图片插入到盒子中
            _element.appendChild(_img);
            // 将盒子插入到游戏界面中
            GameBg.getElement().appendChild(_element);
        },
        startMovie (callback) {

            // 显示get-ready图片
            this.show();

            // 记录get-ready图片初始宽度
            let width = _element.offsetWidth;

            // 定时器函数
            let intervalFunc = () => {
                _element.style.width = _element.offsetWidth + 1 + "px";
                if (_element.offsetWidth >= width + 100) {
                    clearInterval(addWidthMovie);
                    setTimeout( () => {
                        _element.className = "hide";
                        _element.style.width = "60%";
                        callback && callback();
                    }, 500);
                }
            };

            // 宽度渐增动画
            let addWidthMovie = setInterval(intervalFunc, 10);

        }
    };

})();

export { StartInfo };

