
// 游戏规则
// Info 单例对象
let Info = (function () {

    // 私有属性和方法
    // dom 对象
    let _element = document.getElementById("info");

    // 公有属性和方法
    return {
        hide: function () {
            _element.className = "hide";
        }
    };

})();

export { Info };