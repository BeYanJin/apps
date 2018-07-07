
// Star 单例对象，主角
let Star = (function () {

    // 私有属性和方法
    let _img,
        _x,
        _y,
        _speedX,
        _speedY,
        _size = 8 * 2.5,
        _rad = 0,
        // 不可拖动
        _draggable = false;

    // 公有属性和方法
    return {
        init (img, x, y, speedX, speedY, size, rad) {
            Star.setImg(img);
            _x = x;
            _y = y;
            _speedX = speedX;
            _speedY = speedY;
            _size = size;
            _rad = rad;
        },
        setDraggable (value) {
            _draggable = value;
        },
        getDraggable () {
            return _draggable;
        },
        setImg (value) {
            _img = document.getElementById(value);
        },
        getImg () {
            return _img;
        },
        setX (value) {
            _x = value;
        },
        getX () {
            return _x;
        },
        setY (value) {
            _y = value;
        },
        getY () {
            return _y;
        },
        getSize () {
            return _size;
        },
        setSpeedX (value) {
            _speedX = value;
        },
        setSpeedY (value) {
            _speedY = value;
        },
        draw (context) {

            // 当前坐标 = 上一次坐标 + 速度
            _x += _speedX;
            _y += _speedY;

            // 保存初始的设置
            context.save();

            // 将主角当前的坐标 (_x, _y) 作为坐标轴中心点
            context.translate(_x, _y);

            // 随着设置的弧度值旋转对应的角度
            context.rotate(_rad * Math.PI/180);

            // 绘制 主角 的图片
            context.drawImage(Star.getImg(), -_size/2, -_size/2, _size, _size);

            // 返回初始的设置
            context.restore();

            // 弧度值经过每一次动画都 累加 4
            _rad += 4;
        }
    };

})();

export { Star };
