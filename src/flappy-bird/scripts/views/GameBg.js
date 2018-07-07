
// 界面背景单例对象
let GameBg = (function () {

    // 私有变量
    let _element = document.querySelector("#game-bg");

    return {
        handleClick (callback) {

            // 绑定onclick事件，callback函数用于处理外部事物的逻辑
            _element.onclick = () => {
                callback && callback();
            };
        },
        getBgImage () {
            let hour = (new Date()).getHours();
            if (hour < 6 || hour > 18) {
                _element.className = "game-bg-night";
            } else {
                _element.className = "game-bg-day";
            }
        },
        getElement () {
            return _element;
        },
        getWidth () {
            return _element.offsetWidth;
        },
        getHeight () {
            return _element.offsetHeight;
        },
        removeClick () {
            _element.onclick = null;
        }
    };
})();

export { GameBg };
