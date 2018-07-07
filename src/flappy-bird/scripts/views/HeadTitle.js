
// HeadTitle单例对象（标题)
let HeadTitle = (function () {

        // 动画
    let _movie = null,
        // 获取标题盒子 dom节点
        _element = document.querySelector("#head-title"),
        // 获取获取标题图片 dom节点
        _img = document.querySelector("#head-title img"),
        _headImg = document.querySelectorAll(".head-img img"),
        // 图片数组
        _imageArray = [
            _headImg[0].src,
            _headImg[1].src
        ],
        // 图片数组的下标
        _index = 0;

    return {

        // 显示标题
        show () {
            _element.className = "head-title-up show-block";
        },
        // 开始动画
        startMovie () {
            this.show();

            // 动画函数
            let intervalFunc = () => {
                _img.src = _imageArray[_index++];
                if (_index == 2) {
                    _element.className = "head-title-up";
                    _index = 0;
                } else {
                    _element.className = "head-title-down";
                }
            };

            _movie = setInterval(intervalFunc , 200);
        },
        // 停止动画
        stopMovie () {
            clearInterval(_movie);
        },
        // 隐藏标题
        hide () {
            _element.className = "hide";
        }

    };

})();


export { HeadTitle };


