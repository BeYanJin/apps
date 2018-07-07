import { Star } from "./Star.js";

// Item 单例对象，飞出来的物件
let Item = (function () {

    // 私有属性和方法
    let _rice = document.getElementById("rice"),
        _tomato = document.getElementById("tomato"),
        _eggplant = document.getElementById("eggplant"),
        _corn = document.getElementById("corn"),
        // 存 物件 的 数组
        _items = [],
        // 物件的半宽高像素
        _size = 8,
        // 物件的数量
        _count = 0,
        // 物件数量的最大限制数
        _maxCount = 84,
        _movie;

    // 公有属性和方法
    return {
        getCount () {
            return _count;
        },
        pushItem (callback) {

            // 物件的数量 加 1 个
            _count++;

            // 若 物件数量 超过最大限制，则停止物件生成动画，并执行回调函数
            if (_count > _maxCount) {

                // 若定义了回调函数则执行它
                callback && callback();
            }

            // 创建一个 物件 对象
            let item = {
                x: 0,
                y: 0,
                /**
                * num 表示 物件的类型
                * 0 表示 rice (米饭)
                * 1 表示 eggplant (茄子)
                * 2 表示 tomato (西红柿)
                * 3 表示 corn (玉米)
                */
                num: 0,
                rad: 360 * Math.random(),
                speedX: 0,
                speedY: 0,
                // 自定义随机速度系数 (0.2 - 1.2) , 用来乘以 speedX 和 speedY 让 物件 速度不一
                ratio: Math.random() + 0.2
            };

            // 从 0、1、2、3 中生成一个随机数，其中：
            let randNum = parseInt(Math.random() * 4);

            switch (randNum) {

            /**
            * 如果 randNum 为 0，表示生成的是 rice (米饭)
            * rice 应从界面 左边界 飞出， num 应为 0
            */
            case 0:
                item.x = 0;
                item.y = Math.random() * window.innerHeight;
                item.num = 0;
                break;
            /**
            * 如果 randNum 为 1，表示生成的是 eggplant (茄子)
            * rice 应从界面 上边界 飞出， num 应为 1
            */
            case 1:
                item.x = Math.random() * window.innerWidth;
                item.y = 0;
                item.num = 1;
                break;
            /**
            * 如果 randNum 为 2，表示生成的是 tomato (西红柿)
            * tomato 应从界面 右边界 飞出， num 应为 2
            */
            case 2:
                item.x = window.innerWidth;
                item.y = Math.random() * window.innerHeight;
                item.num = 2;
                break;
            /**
            * 如果 randNum 为 3，表示生成的是 corn (玉米)
            * corn 应从界面 下边界 飞出， num 应为 3
            */
            case 3:
                item.x = Math.random() * window.innerWidth;
                item.y = window.innerHeight;
                item.num = 3;
                break;
            default:
                break;
            }

            // 将 物件 加到 物件数组 中
            _items.push(item);
        },
        draw (context, movieTime, callback) {

            // 从物件数组中遍历每一个物件，并将它们绘制到画布上
            _items.forEach( (item) => {

                /**
                * 获取每个物件 与 主角 之间的距离，计算方式为运用勾股定理：
                * dist = √[(物件x - 主角x)² + (物件y - 主角y)²]
                */
                let dist = Math.sqrt(Math.pow(item.x-Star.getX(), 2) + Math.pow(item.y-Star.getY(), 2));

                /**
                * 物件与主角之间的距离 < 物件半宽高 + 主角半宽高
                * 表示 物件 与 主角 之间碰撞在一起，则执行一下步骤
                */
                if (Math.abs(dist) < _size + Star.getSize()/2) {

                    // 若定义了回调函数则执行它
                    callback && callback();
                }

                // 限制 物件 的速度
                let speedRatio = 0.007 / movieTime;

                // speedX , speedY 都不能超过 10
                if (Math.abs(item.speedX + (Star.getX() - item.x) * speedRatio) <= 10) {
                    item.speedX += (Star.getX()-item.x) * speedRatio;
                }
                if (Math.abs(item.speedY + (Star.getY() - item.y) * speedRatio) <= 10) {
                    item.speedY += (Star.getY()-item.y) * speedRatio;
                }

                // 当前坐标 = 上一次坐标 + 速度 * 速度系数
                item.x += item.speedX * item.ratio;
                item.y += item.speedY * item.ratio;

                // 保存初始的设置
                context.save();

                // 将当前物件的坐标 (item.x, item.y) 作为坐标轴中心点
                context.translate(item.x, item.y);

                // 将当前物件随机旋转 0-360 度
                context.rotate(item.rad * Math.PI/180);

                // 根据 物件 的类型编号生成对应样式的 物件
                switch (item.num) {
                case 0:
                    context.drawImage(_rice, -_size, -_size, _size * 2, _size * 2);
                    break;
                case 1:
                    context.drawImage(_eggplant, -_size, -_size, _size * 2, _size * 2);
                    break;
                case 2:
                    context.drawImage(_tomato, -_size, -_size, _size * 2, _size * 2);
                    break;
                case 3:
                    context.drawImage(_corn, -_size, -_size, _size * 2, _size * 2);
                    break;
                }

                // 返回初始的设置
                context.restore();
            });
        },
        startMovie (callback) {

            // 每隔 200 毫秒增加一个物件
            _movie = setInterval( () => {
                this.pushItem(callback);
            }, 200);
        },
        stopMovie () {
            clearInterval(_movie);
        },
        reset () {
            _items.splice(0, _items.length);
            _count = 0;
        }
    };

})();

export { Item };