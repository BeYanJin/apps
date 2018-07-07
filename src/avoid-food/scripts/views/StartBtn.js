
// StartBtn 单例对象，游戏开始按钮
let StartBtn = (function () {

    // 私有属性和方法
    let _element = document.getElementById("start-btn");

    // 公有属性和方法
    return {
        getElement () {
            return _element;
        },
        hide () {
            _element.className = "hide";
        },
        handleClick (callback) {

            // 绑定点击事件
            _element.onclick = () => {

                // 隐藏自身（游戏开始按钮）
                StartBtn.hide();

                // 被点击后执行的回调函数
                callback && callback();
            };
        }
    };

})();

export { StartBtn };
