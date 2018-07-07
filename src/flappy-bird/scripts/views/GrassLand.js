

// 草地对象
let GrassLand = (function () {

        // 动画
    let _movie = null,
        // 获取草地1 dom节点
        _gl1 = document.querySelector("#grassLand1"),
        // 获取草地2 dom节点
        _gl2 = document.querySelector("#grassLand2");

    return {
        startMovie () {

            // 获取草地2一开始时离界面左边界的距离
            const _left = _gl2.offsetLeft;

            // 动画函数
            let intervalFunc = () => {
                if (_gl1.offsetLeft <= -_left + 3) {
                    _gl1.style.left = _left + "px";
                }
                if (_gl2.offsetLeft <= -_left + 3) {
                    _gl2.style.left = _left + "px";
                }
                _gl1.style.left = _gl1.offsetLeft - 3 + "px";
                _gl2.style.left = _gl2.offsetLeft - 3 + "px";

            };

            _movie = setInterval(intervalFunc, 30);
        },
        stopMovie () {
            _gl1.style.left = 0;
            _gl2.style.left = "100%";
            clearInterval(_movie);
        },
        // 获取草地上边界离界面顶部的距离
        getOffsetTop () {
            return _gl1.offsetTop;
        }
    };

})();

export { GrassLand };
