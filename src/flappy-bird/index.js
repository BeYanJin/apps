
// scss
import "./index.scss";

// javascript
import { GameBg } from "./scripts/views/GameBg";
import { HeadTitle } from "./scripts/views/HeadTitle";
import { GrassLand } from "./scripts/views/GrassLand";
import { StartBtn } from "./scripts/views/StartBtn";
import { StartInfo } from "./scripts/views/StartInfo";
import { Counter } from "./scripts/views/Counter";
import { Bird } from "./scripts/views/Bird";
import { Block } from "./scripts/views/Block";
import { GameOver } from "./scripts/views/GameOver";

// musics

// 这里是程序的 main 入口，编写的是程序运行的逻辑

// 根据时间来选择背景图片
GameBg.getBgImage();

// 启动标题动画
HeadTitle.startMovie();

// 启动草地动画
GrassLand.startMovie();

/**
* start-btn按钮被点击后，隐藏自身
* 同时，标题也隐藏自身并停止动画，get-ready提醒显示动画开启
*/
StartBtn.handleClick( function () {

    // 隐藏标题并清除动画定时器
    HeadTitle.hide();
    HeadTitle.stopMovie();

    // get-ready提醒显示动画开启
    StartInfo.startMovie( function () {

        // 动画完毕之后调用的回调函数

        // 显示计分器
        Counter.show();

        // 创建一只鸟并显示在界面中
        let bird1 = new Bird("bird1");
        bird1.startMovie( function () {

            // 若鸟碰到地面, 则执行该回调函数

            // 停止阻碍物的动画
            Block.stopMovie();

            // 执行 doGameOverLogic 方法
            doGameOverLogic(bird1);
        });

        // 点击界面小鸟会往上升
        GameBg.handleClick( function () {
            bird1.setFallSpeed(-8);
        });

        // PC端按空格就相当于点击鼠标左键
        window.onkeyup = function (event) {
            if (event.keyCode == 32) {
                bird1.setFallSpeed(-8);
            }
        };

        // 开启阻碍物动画
        Block.startMovie(bird1, function () {

            // 若鸟碰到障碍物, 则执行该回调函数

            // 小鸟下落
            bird1.setFallSpeed(0);

            // 执行 doGameOverLogic 方法
            doGameOverLogic(bird1);
        });
    });
});

// doGameOverLogic 方法
function doGameOverLogic(bird) {

    // 清除事件
    GameBg.removeClick();
    window.onkeyup = null;

    // 停止草地动画
    GrassLand.stopMovie();

    // 计分器隐藏
    Counter.hide();

    // 显示gameover面板
    GameOver.show(Counter.getScore());

    GameOver.handleClick( function () {

        // 当gameover面板被点击后执行回调函数

        // 计分器置零
        Counter.clear();

        // 删除小鸟
        bird.delete();

        // 清除阻碍物
        Block.delete();

        // 启动标题动画
        HeadTitle.startMovie();

        // 显示开始按钮
        StartBtn.show();

        // 启动草地动画
        GrassLand.startMovie();

        // 清楚gameover面板的点击事件
        GameOver.removeClick();
    });
}