import { GameBg } from "./GameBg.js";
import { GrassLand } from "./GrassLand.js";


// Bird对象的构造函数
let Bird = function (idName) {

    // Bird的上下文
    let self = this;

    // 小鸟飞翔动画
    let flyMovie = null,
        // 小鸟翅膀摆动动画
        wingMovie = null,
        // 小鸟下落的速度
        fallSpeed = 0,
        // 装小鸟的盒子
        element = document.createElement("div"),
        // 小鸟图片
        img = document.createElement("img"),
        birdImg = document.querySelectorAll(".bird-img img"),
        // 图片数组
        imageArray = {
            up: [
                birdImg[0].src,
                birdImg[1].src
            ],
            mid: birdImg[2].src,
            down: [
                birdImg[3].src,
                birdImg[4].src
            ]
        };

    let show = function () {

        // 设置装小鸟的盒子
        element.id = idName;
        element.style.display = "block";

        // 设置小鸟图片
        img.src = imageArray.mid;
        img.draggable = false;

        // 将小鸟图片插入到盒子中
        element.appendChild(img);
        // 将盒子插入到游戏界面中
        GameBg.getElement().appendChild(element);
    };

    this.setFallSpeed = function (num) {
        fallSpeed = num;
    };

    this.getFallSpeed = function () {
        return fallSpeed;
    };

    this.getElement = function () {
        return element;
    };

    this.getOffsetLeft = function () {
        return element.offsetLeft;
    };

    this.startMovie = function (callback) {

        // 显示小鸟
        show();

        // 计算出鸟下落的最大允许距离 limitHeight
        let BirdHeight = element.offsetHeight;
        let limitHeight = GrassLand.getOffsetTop() - BirdHeight;

        // 小鸟飞翔动画函数
        let flyIntervalFunc = function () {

            // 小鸟离界面顶端的距离增加，同时下落速度也增加
            element.style.top = element.offsetTop + fallSpeed++ + "px";
            if (element.offsetTop < 0) {
                // 这里用于控制小鸟不要飞出界面
                fallSpeed = 2;
            }
            // 一旦落到地面，停止动画，清楚主界面绑定的点击事件
            if (element.offsetTop >= limitHeight) {
                // 停止动画并下降
                self.stopMovie();
                callback && callback ();
            }
            // 鸟的最大下落速度控制在12
            if (fallSpeed > 12) {
                fallSpeed = 12;
            }
        };

        // 判断翅膀的开合
        let i = 0, j = 0;
        // 小鸟翅膀摆动动画函数
        let wingIntervalFunc = function () {
            // 如果下落速度为正，则用down图片，否则，用up图片
            if (fallSpeed > 0) {
                img.src = imageArray.down[i++];
                if (i==2) {
                    i = 0;
                }
            } else {
                img.src = imageArray.up[j++];
                if (j==2) {
                    j = 0;
                }
            }
        };

        flyMovie = setInterval(flyIntervalFunc, 40);
        wingMovie = setInterval(wingIntervalFunc, 120);
    };

    this.stopMovie = function () {
        // 清除所有的定时器，下落速度置0
        fallSpeed = 0;
        clearInterval(flyMovie);
        clearInterval(wingMovie);
    };

    this.delete = function () {
        element.parentNode.removeChild(element);
    };
};

export { Bird };

