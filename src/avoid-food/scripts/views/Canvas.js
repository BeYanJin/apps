import { Star } from "./Star.js";
import { Item } from "./Item.js";

// Canvas 单例对象，游戏画布
let Canvas = (function () {

    // 私有属性和方法
    let _element = document.getElementById("canvas"),
        _context = _element.getContext("2d"),
        _time = 18,
        _movie;

    // 公有属性和方法
    return {
        setWidth (value) {
            _element.width = value;
        },
        setHeight (value) {
            _element.height = value;
        },
        getContext () {
            return _context;
        },
        /**
        * callback1 在 主角 碰撞到四周边界时触发
        * callback2 在 物件 与 主角 产生碰撞时触发
        */
        draw (callback) {

            // 每一次动画都新建一个新的矩形区域，该区域铺满屏幕，覆盖以前的绘图
            _context.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // 绘制主角
            Star.draw(_context);

            // 绘制物件
            Item.draw(_context, _time, callback);

            // 判断 主角 是否碰撞到四周边界
                // 碰撞到 上边界
            if (Star.getX() - Star.getSize() / 2 < 0 ||
                // 碰撞到 左边界
                Star.getY() - Star.getSize() / 2 < 0 ||
                // 碰撞到 右边界
                Star.getX() + Star.getSize() / 2 > window.innerWidth ||
                // 碰撞到 下边界
                Star.getY() + Star.getSize() / 2 > window.innerHeight) {

                // 若定义了回调函数 callback1 则执行它
                callback && callback();

            }
        },
        startMovie (callback) {
            _movie = setInterval( () => {
                this.draw(callback);
            }, _time);
        },
        stopMovie () {
            clearInterval(_movie);
        },
        handleClick (callback) {
            _element.onclick = (event) => {
                callback && callback(event);
            };
        },
        handleMouseMove (callback) {
            _element.onmousemove = (event) => {
                callback && callback(event);
            };
        },
        removeEvent () {
            _element.onclick = null;
            _element.onmousemove = null;
        }
    };

})();

export { Canvas };