// Footer 单例对象，尾部版权文本
let Footer = (function () {

    // 私有属性和方法
    let _element = document.getElementById("footer");

    // 公有属性和方法
    return {
        hide () {
            _element.className = "hide";
        }
    };

})();

export { Footer };
