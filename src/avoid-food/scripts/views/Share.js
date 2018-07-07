
// Share 单例对象，游戏结束后显示的 "分享到朋友圈" 图片
let Share = (function () {

    // 私有属性和方法
    let _element = document.getElementById("share");

    // 公有属性和方法
    return {
        hide () {
            _element.className = "hide";
        },
        show () {
            _element.className = "show-block";
        }
    };

})();

export { Share };
