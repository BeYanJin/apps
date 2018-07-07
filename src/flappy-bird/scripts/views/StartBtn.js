
// StartBtn单例对象（开始按钮）
let StartBtn = (function () {

    let _element = document.querySelector("#start-btn");

    return {
        // dom节点
        handleClick (callback) {

            // 绑定onclick事件，callback函数用于处理外部事物的逻辑
            _element.onclick = () => {
                // 隐藏按钮
                this.hide();

                // 处理外部事物的逻辑
                callback && callback();

            };
        },
        show () {
            _element.className = "show-block";
        },
        hide () {
            _element.className = "hide";
        }
    };
})();

export { StartBtn };
