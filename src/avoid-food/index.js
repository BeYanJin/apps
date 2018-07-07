"use strict";

// scss
import "./index.scss";

// javascript
import { Canvas } from "./scripts/views/Canvas.js";
import { Dialog } from "./scripts/views/Dialog.js";
import { Footer } from "./scripts/views/Footer.js";
import { HeadTitle } from "./scripts/views/HeadTitle.js";
import { Item } from "./scripts/views/Item.js";
import { Info } from "./scripts/views/Info.js";
import { Share } from "./scripts/views/Share.js";
import { Star } from "./scripts/views/Star.js";
import { StartBtn } from "./scripts/views/StartBtn.js";
import { TitleChanger } from "./scripts/utils/TitleChanger.js";

// musics
import "./static/musics/music.mp3";

// 游戏开始按钮被点击后，隐藏自身 并 执行传入的回调函数
StartBtn.handleClick( function () {

    // 隐藏 游戏规则提示文段
    Info.hide();

    // 隐藏 初始界面的标题图片（你能逃离北二的控制吗）
    HeadTitle.hide();

    // 隐藏 尾部版权文本
    Footer.hide();

    // 切换 body 的背景图片
    if (document.body.className !== "game-bg") {
        document.body.setAttribute("class","game-bg");
    }

    // 开始游戏
    startGame();
});

// 再来一次按钮被点击后，执行传入的回调函数
Dialog.getAgainBtn().handleClick( function () {

    // 隐藏对话框
    Dialog.hide();

    // 隐藏 分享到朋友圈 的图片
    Share.hide();

    // 切换标题为 你能逃离北二的控制吗
    TitleChanger.changeTitle("你能逃离北二的控制吗");

    // 开始游戏
    startGame();
});

// 将开始游戏的代码提取出来，定义成一个方法（函数）
function startGame () {


    // 设置 画布 的 宽高 等于 窗口的宽高
    Canvas.setWidth(window.innerWidth);
    Canvas.setHeight(window.innerHeight);

    // 初始化 主角 的 图片、位置、速度、大小、旋转的弧度
    Star.init("emo1", window.innerWidth/2, window.innerHeight/2, 0, 0, 8 * 2.5, 0);

    // 一开始先创建 十个 物件
    for (let i = 0; i < 10; i++) {
        Item.pushItem();
    }

    // 开启 物件 生成动画
    Item.startMovie( function () {

        // 当 物件数量 超过最大限制 时, 执行该回调函数

        // 执行 overGame 函数, 结束游戏, 胜利!
        overGame("win");
    });

    // 开启 Canvas 动画
    Canvas.startMovie( function () {

        // 当 主角碰到四周边缘 或 物件与主角产生碰撞时, 执行该回调函数

        // 执行 overGame 函数, 结束游戏, 失败!
        overGame("lose");
    });
}

function overGame (str) {

    // 停止 Canvas 动画
    Canvas.stopMovie();

    // 停止物件生成动画
    Item.stopMovie();

    // 改变标题
    TitleChanger.changeTitle("我在逃离北二饭堂游戏中撑了" + (Item.getCount()-10)/5 + "s");

    // 显示 分享到朋友圈 图片
    Share.show();

    // 显示 游戏结束 对话框
    Dialog.show();

    if (str == "lose") {
        // 设置 主角 图片 为 受伤表情
        Star.setImg("emo2");
        // 重新绘制 主角，使受伤表情的图片生效
        Star.draw(Canvas.getContext());
    }

    // 设置对话框的文字
    Dialog.text("you " + str + ": " + (Item.getCount()-10)/5 + "s");

    // 设置 主角 不可拖动
    Star.setDraggable(false);

    // 重置物件对象
    Item.reset();
}

// PC端 使用点击拖动事件
Canvas.handleClick( function (event) {
    if (Math.abs(event.clientX - Star.getX()) <= Star.getSize() / 2 &&
        Math.abs(event.clientY - Star.getY()) <= Star.getSize() / 2) {
        Star.setDraggable(true);
    }
});
Canvas.handleMouseMove( function (event) {
    if (Star.getDraggable()) {
        Star.setX(event.clientX);
        Star.setY(event.clientY);
    }
});

// 手机平板类 使用重力感应事件
window.addEventListener("deviceorientation", function (event) {

    // 沿着 y 轴转动，产生的角度为 gamma
    if ((event.gamma >= 3 && event.gamma <= 90) || (event.gamma <= -3 && event.gamma >= -90)) {
        Star.setSpeedX(0.5 * event.gamma);
    } else {
        Star.setSpeedX(0);
    }

    // 沿着 x 轴转动，产生的角度为 beta
    if ((event.beta >= 3 && event.beta <= 90) || (event.beta <= -3 && event.beta >= -90)) {
        Star.setSpeedY(0.5 * event.beta);
    } else {
        Star.setSpeedY(0);
    }
}, true);
