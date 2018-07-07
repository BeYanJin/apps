// Dialog 单例对象，游戏结束弹出的对话框
let Dialog = (function () {

    // 私有属性、方法和对象
    let _element = document.getElementById("dialog");

    // againBtn 单例对象，再来一次按钮
    let againBtn = (function () {

        // 私有属性和方法
        let _element = document.getElementById("again-btn");

        // 公有属性和方法
        return {
            handleClick (callback) {

                // 绑定点击事件
                _element.onclick = () => {

                    // 被点击后执行的回调函数
                    callback && callback();
                };
            }
        };

    })();

    // 公有属性和方法
    return {
        getAgainBtn () {
            return againBtn;
        },
        hide () {
            _element.className = "hide";
        },
        show () {
            _element.className = "show-block";
        },
        text (value) {
            document.getElementById("game-over-text").innerHTML = value;
        }
    };

})();

export { Dialog };