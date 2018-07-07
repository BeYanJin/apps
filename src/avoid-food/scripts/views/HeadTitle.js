// 初始界面的标题图片（你能逃离北二的控制吗）
// HeadTitle 单例对象
let HeadTitle = (function () {

    // 私有属性和方法
    // dom 对象
    let _element = document.getElementById("head-title");

    // 公有属性和方法
    return {
        hide () {
            _element.className = "hide";
        }
    };

})();

export { HeadTitle };