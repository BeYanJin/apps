"use strict";

/* global $ */

// scss
import "./index.scss";

// javascript
import { Alert } from "./scripts/views/Alert.js";
import { Counter } from "./scripts/views/Counter.js";
import { GameBg } from "./scripts/views/GameBg.js";
import { GameBtn } from "./scripts/views/GameBtn.js";
import { GameOverLayer } from "./scripts/views/GameOverLayer.js";
import { Info } from "./scripts/views/Info.js";
import { InitialLayer } from "./scripts/views/InitialLayer.js";
import { Packman } from "./scripts/views/Packman.js";
import { Police } from "./scripts/views/Police.js";
import "./scripts/utils/SevenJudger.js";

// musics
import "./static/musics/bg-music.mp3";
import "./static/musics/lose.mp3";
import "./static/musics/beat.mp3";

// 初始化背景中地面上的数字的left值, 初始化完毕后才显示它们
GameBg.getGround().init();
GameBg.getGround().show();

// 躲 按钮被点击后, 执行回调函数
GameBtn.getEscapeBtn().handleClick(function () {

    btnControlLogic();

    let ifAbout7 = $.SevenJudger.check(GameBg.getCurrentStep());

    if (ifAbout7) {
        // 设置文本信息, 跑了几步
        Info.setInfo(GameBg.getCurrentStep() - 1);
        Packman.caught();
        gameOver();
    } else {
        Packman.escape();
    }
});

// 跑 按钮被点击后, 执行回调函数
GameBtn.getRunBtn().handleClick(function () {

    btnControlLogic();

    let ifAbout7 = $.SevenJudger.check(GameBg.getCurrentStep());

    if (!ifAbout7) {
        // 设置文本信息, 跑了几步
        Info.setInfo(GameBg.getCurrentStep() - 1);
        Packman.caught();
        gameOver();
    } else {
        Packman.run();
    }
});

// 游戏开始按钮被点击后, 执行回调函数
InitialLayer.getStartBtn().handleClick( function () {

    // 隐藏 初始层
    InitialLayer.hide();

    restartGame();
});

// 若 怎么玩按钮 被点击, 则执行回调函数
GameOverLayer.getHowTOPlay().handleClick( function () {

    // 隐藏 游戏结束层
    GameOverLayer.hide();
    // 显示初始层
    InitialLayer.show();
    //隐藏 打斗场景
    Police.hideBeatCloud();
    // 显示人物并重置人物位置
    Packman.reset();

});

// 若 再玩一次按钮 被点击, 则执行回调函数
GameOverLayer.getAgain().handleClick( function () {

    // 隐藏 游戏结束层
    GameOverLayer.hide();

    restartGame();
});

// 游戏开始时进行重置
function restartGame () {
    // 重置地面上的数字
    GameBg.getGround().reset();
    // 隐藏 打斗场景
    Police.hideBeatCloud();
    // 重置人物
    Packman.reset();

    // 显示 思考时间倒计时
    Counter.show();
    // 显示 游戏控制按钮
    GameBtn.show();
}

// 该方法为按钮点击后游戏的运行逻辑
function btnControlLogic () {


    // 背景移动, 地面上的数字都 增加 1
    GameBg.move();
    // 提示框移动
    Alert.move();


    // 开启 思考时间倒计时, 若计时到达0, 表示游戏结束, 执行回调函数
    Counter.countDown( function () {
        Info.setInfo(GameBg.getCurrentStep());
        Packman.caught();
        gameOver();
    });
}

// 该方法在游戏结束之后执行
function gameOver () {

    // 中止并重置 思考时间倒计时器
    Counter.stop();

    // 清楚提示框
    Alert.reset();

    // 隐藏 思考时间倒计时器
    Counter.hide();
    // 隐藏 游戏控制按钮
    GameBtn.hide();

    // 播放游戏结束后的音频
    $("#lose-music")[0].play();

    // 显示 城管捉人压制 动画, 动画结束后执行回调函数
    Police.startMovie( function () {

        // 显示 游戏结束层
        GameOverLayer.show();

    });
}