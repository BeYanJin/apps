import { RandomCreator } from "../utils/RandomCreator.js";
import { Counter } from "./Counter.js";
import { GameBg } from "./GameBg.js";
import { GrassLand } from "./GrassLand.js";


// Block对象：用于生成上下阻碍管道
let Block = (function () {

        // 管道生成动画
    let _createMovie = null,
        // 管道移动动画
        _movementMovie = null,
        // 记录管道
        _blocks = [];

    return {

        // 生成新的阻碍管道
        create (left) {

            let hmin = GameBg.getHeight() * 0.3125,
                hmax = GameBg.getHeight() * 0.3333,
                // 随机生成 间隙高度
                gapHeight = RandomCreator.random(hmin, hmax),

                // 随机生成 上管道的高度，上管道的高度占剩余高度的 20%——80%
                upMin = (GrassLand.getOffsetTop() - gapHeight - 60) * 0.2,
                upMax = (GrassLand.getOffsetTop() - gapHeight - 60) * 0.8,
                upHeight = RandomCreator.random(upMin,upMax),
                // 下管道的高度 = 草地一直到界面顶端的高度 - 上管道的高度 - 间隙高度 - 上下管口各30px
                downHeight = GrassLand.getOffsetTop() - upHeight - gapHeight - 60;

            // 创建5个div元素
            let blockWrap = document.createElement("div");

            let blockUpWrap = document.createElement("div");
            let blockUpWall = document.createElement("div");
            let blockUpPipe = document.createElement("div");

            let blockDownWrap = document.createElement("div");
            let blockDownPipe = document.createElement("div");
            let blockDownWall = document.createElement("div");

            // 分别给这5个元素设置类名
            blockWrap.className = "block-wrap";

            blockUpWrap.className = "block-up-wrap";
            blockUpWall.className = "block-up-wall";
            blockUpPipe.className = "block-up-pipe";

            blockDownWrap.className = "block-down-wrap";
            blockDownPipe.className = "block-down-pipe";
            blockDownWall.className = "block-down-wall";

            /**
            * 设置各个div的样式
            * block-wrap 的 left
            * block-up-wall 的 height 要自己设置
            * block-up-pipe 的 top 值与 block-up-wall 的 height 相等
            * block-down-pipe 的 bottom 值与 block-down-wall 的 height 相等
            * block-down-wall 的 height 要自己设置
            */
            blockWrap.style.left = left + "px";

            blockUpWall.style.height = upHeight + "px";

            blockDownWall.style.height = downHeight + "px";

            // 把其余4个div插入到 div.block-wrap 的大盒子中
            blockUpWrap.appendChild(blockUpWall);
            blockUpWrap.appendChild(blockUpPipe);

            blockDownWrap.appendChild(blockDownPipe);
            blockDownWrap.appendChild(blockDownWall);

            blockWrap.appendChild(blockUpWrap);
            blockWrap.appendChild(blockDownWrap);

            GameBg.getElement().appendChild(blockWrap);

            return blockWrap;
        },
        move (element) {
            element.style.left = element.offsetLeft - 3 + "px";
        },
        remove (element) {
            if (element !== undefined && element !== null) {
                element.parentNode.removeChild(element);
            }
        },
        startMovie (bird, callback) {

            let width = GameBg.getWidth(),
                ifCounted = false;

            // 首先生成一根管道
            _blocks[_blocks.length] = Block.create(width + 150);

            let createIntervalFunc = () => {
                let dmin = width * 0.45,
                    dmax = width * 0.73,
                    distance = RandomCreator.random(dmin, dmax);

                _blocks[_blocks.length] = this.create(_blocks[_blocks.length - 1].offsetLeft + distance);
            };

            let movementIntervalFunc = () => {

                // 检测小鸟是否通过管道
                // console.log(blocks[0].offsetLeft);
                if (!ifCounted && (bird.getOffsetLeft() > _blocks[0].offsetLeft + _blocks[0].offsetWidth)) {
                    Counter.add();
                    ifCounted = true;
                }

                // 检测管道是否已经移出界面，是则删除该节点，且删除管道数组的第一个元素
                if (_blocks[0].offsetLeft < -_blocks[0].offsetWidth) {
                    this.remove(document.querySelectorAll(".block-wrap")[0]);
                    _blocks.shift();
                    ifCounted = false;
                }

                for(let i = 0; i < _blocks.length; i++) {

                    // 移动管道
                    this.move(_blocks[i]);

                    // 碰撞检测
                    let x =this.crashCheck(_blocks[i].firstElementChild, bird);
                    let y = this.crashCheck(_blocks[i].lastElementChild, bird);
                    if (x || y) {
                        // 停止阻碍物的动画
                        this.stopMovie();
                        callback && callback();
                    }
                }
            };

            _createMovie = setInterval(createIntervalFunc, 2000);
            _movementMovie = setInterval(movementIntervalFunc, 30);
        },
        stopMovie () {
            clearInterval(_createMovie);
            clearInterval(_movementMovie);
        },
        // 碰撞检测
        crashCheck (block, bird) {
            /**
            * left1: 管道最左边 离 界面左边界 的距离
            * width1: 管道最右边 离 界面左边界 的距离, 即 left1 加管道宽度
            * top1: 下管道最上边 离 界面上边界 的距离
            * height1: 上管道的高度
            */
            let left1 = block.parentNode.offsetLeft,
                width1 = block.parentNode.offsetLeft + block.offsetWidth,
                top1 = block.offsetTop,
                height1 = block.offsetHeight;
            /**
            * left2: 小鸟最左边 离 界面左边界 的距离
            * width2: 小鸟最右边 离 界面左边界 的距离, 即 left2 加小鸟宽度
            * top2: 小鸟最上边 离 界面上边界 的距离
            * height2: 小鸟最下边 离 界面上边界 的距离, 即 top2 加小鸟高度
            */
            let left2 = bird.getElement().offsetLeft,
                width2 = bird.getElement().offsetLeft + bird.getElement().offsetWidth,
                top2 = bird.getElement().offsetTop,
                height2 = bird.getElement().offsetTop + bird.getElement().offsetHeight;
            /**
            * 撞击上管道的情况：
              width2 > left1
              left2 < width1
              top2 < height1 (对于上管道, top1等于0)
            * 撞击下管道的情况：
              width2 > left1
              left2 < width1 (与上管道同)
              height2 > top1
            */
            let ifUpCrashed =  (block.className == "block-up-wrap") &&
                                (width2 > left1) && (left2 < width1) &&
                                (top2 < height1),
                ifDownCrashed = (block.className == "block-down-wrap") &&
                                (width2 > left1) && (left2 < width1) &&
                                (height2 > top1);

            if (ifUpCrashed || ifDownCrashed) {
                return true;
            }
            return false;
        },
        delete () {
            for(let i = 0; i < _blocks.length; i++) {
                GameBg.getElement().removeChild(_blocks[i]);
            }
            _blocks = [];
        }
    };

})();

export { Block };
