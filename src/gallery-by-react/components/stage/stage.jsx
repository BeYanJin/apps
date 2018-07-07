// scss
import "./stage.scss";

// libs
import React from "react";
import ReactDOM from "react-dom";

// scripts
import getImageURL from "../../scripts/utils/getImageURL.js";
import getRangeRandom from "../../scripts/utils/getRangeRandom.js";
import get30DegRandom from "../../scripts/utils/get30DegRandom.js";
import importAll from "../../scripts/utils/importAll.js";

// components
// 单张图片组件
import ImgFigure from "./img-figure/imgFigure.jsx";
// 控制栏
import ControllerUnit from "./controller-unit/controllerUnit.jsx";

// images
// 打包所有图片
let req = require.context("../../static/images", true, /\.jpg$/i);
importAll(req);

class GalleryByReactApp extends React.Component {

    // 构造器
    // 设置属性
    constructor(props) {

        super(props);

        this.Constant = {
            // 中心点位置
            centerPos: {
                top: 0,
                left: 0
            },
            // 左右两侧的取值范围
            lrPosRange: {
                leftSecX: [0, 0],
                rightSecX: [0, 0],
                y: [0, 0]
            },
            // 上侧区域的取值范围
            tPosRange: {
                x: [0, 0],
                topY: [0, 0]
            }
        };

        this.state = {
            imgsArrangeArr: []
        };

        this.resizeTimer = null;

        /**
        * 获取图片json数据, 得到一个图片数组
        * 并给图片数组添加一个imageURL属性, 可通过调用该属性获取图片的URL
        */
        this.imageDatas = getImageURL(require("../../data/imageDatas.json"));
    }

    // 初始化各参数
    initParams () {

        // 获取舞台的dom元素和宽高
        let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        // 拿到一个imgFigure的大小
        let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgFigureW = imgFigureDOM.scrollWidth,
            imgFigureH = imgFigureDOM.scrollHeight,
            halfImgFigureW = Math.ceil(imgFigureW / 2),
            halfImgFigureH = Math.ceil(imgFigureH / 2);

        // 计算 中心图片 的位置点
        this.Constant.centerPos = {
            top: halfStageH - halfImgFigureH,
            left: halfStageW - halfImgFigureW
        };
        // 计算 左侧、右侧区域 图片排布位置的取值范围
        this.Constant.lrPosRange = {
            leftSecX: [ -halfImgFigureW,
                        halfStageW - halfImgFigureW * 3 ],
            rightSecX: [ halfStageW + halfImgFigureW,
                         stageW - halfImgFigureW ],
            y: [ -halfImgFigureH, stageH - halfImgFigureH ]
        };
        // 计算 上侧区域 图片排布位置的取值范围
        this.Constant.tPosRange = {
            topY: [ -halfImgFigureH ,
                    halfStageH - halfImgFigureH * 3 ],
            x: [ halfStageW - imgFigureW ,
                 halfStageW ]
        };
    }

    /**
    * 初始化各元素
    * @return imgFigures: 图片数组, controllerUnits: 控制栏单元数组
    */
    initElements () {

        // 控制栏
        let controllerUnits = [],
            // 图片组件
            imgFigures = [];

        this.imageDatas.map(function (value, index) {

            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        top: "0",
                        left: "0"
                    },
                    // 旋转角度
                    rotate: 0,
                    // 正反面
                    isInverse: false,
                    // 图片是否居中
                    isCenter: false
                };
            };

            imgFigures.push(
                <ImgFigure data={ value } key={ index }
                        arrange={ this.state.imgsArrangeArr[index] }
                        inverse={ this.inverse(index) }
                        center={ this.center(index) }
                        ref={ "imgFigure" + index } />
            );

            controllerUnits.push(
                <ControllerUnit key={ index }
                        arrange={ this.state.imgsArrangeArr[index] }
                        inverse={ this.inverse(index) }
                        center={ this.center(index) } />
            );
        }.bind(this));

        return {
            imgFigures: imgFigures,
            controllerUnits: controllerUnits
        }
    }

    /**
    * 重新布局所有的图片, 会触发render函数
    * @param centerIndex 指定居中排布哪一个图片
    */
    rearrange (centerIndex) {

        // 中间的图片
        let imgsArrangeCenterArr = this.placeCenterImg(centerIndex),
            // 上侧的图片, 可能存在也可能不存在
            { topImgIndex, imgsArrangeTopArr } = this.placeTopImg(),
            // 全部图片都分布在左右两侧的图片数组
            imgsArrangeArr = this.placeLeftAndRightImg();

        if (imgsArrangeTopArr) {
            // 若上侧图片存在, 替换并放置上侧图片
            imgsArrangeArr.splice(topImgIndex, 0, imgsArrangeTopArr);
        }
        // 替换并放置居中图片
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    }

    /**
    * 布局位于居中的图片
    * @param centerIndex 指定居中排布哪一个图片
    */
    placeCenterImg (centerIndex) {

        // 将要居中的图片从图片数组中删除并返回
        let imgsArrangeCenterArr = this.state.imgsArrangeArr.splice(centerIndex, 1);

        imgsArrangeCenterArr[0] = {
            pos: this.Constant.centerPos,
            rotate: 0,
            // centerIndex图片不需要旋转
            isCenter: true
        };

        return imgsArrangeCenterArr[0];
    }

    /**
    * 布局位于上侧的图片
    */
    placeTopImg () {

        // topImgNum = 0 或 1 , 布置在上侧的图片可以有一张或者没有
        let topImgNum = getRangeRandom(0, 2);

        if (topImgNum !== 0) {

            let imgsArrangeArr = this.state.imgsArrangeArr,
                tPosRange = this.Constant.tPosRange,

                // 取出要布置在上侧的图片
                topImgIndex = getRangeRandom(0, imgsArrangeArr.length),

                // 将要布置在上侧的图片从图片数组中删除并返回
                imgsArrangeTopArr = imgsArrangeArr.splice(topImgIndex, 1);

            // 设置布置在上侧的图片
            imgsArrangeTopArr[0] = {
                pos: {
                    top: getRangeRandom(tPosRange.topY[0], tPosRange.topY[1]),
                    left: getRangeRandom(tPosRange.x[0], tPosRange.x[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
            return {
                topImgIndex: topImgIndex,
                imgsArrangeTopArr: imgsArrangeTopArr[0]
            };
        } else {
            return {
                topImgIndex: null,
                imgsArrangeTopArr: null
            };
        }
    }

    /**
    * 布局位于左右两侧的图片
    */
    placeLeftAndRightImg () {

        let imgsArrangeArr = this.state.imgsArrangeArr,
            lrPosRange = this.Constant.lrPosRange;

        for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {

            let lrPosRangeX = null;

            // 前半部分布局左边, 右边部分布局右边
            if (i < k) {
                lrPosRangeX = lrPosRange.leftSecX;
            } else {
                lrPosRangeX = lrPosRange.rightSecX;
            }
            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(lrPosRange.y[0], lrPosRange.y[1]),
                    left: getRangeRandom(lrPosRangeX[0], lrPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
        }

        return imgsArrangeArr;
    }

    // 翻转图片的函数, 会触发render函数
    inverse (index) {
        return () => {
            let imgsArrangArr = this.state.imgsArrangeArr;
            imgsArrangArr[index].isInverse = !imgsArrangArr[index].isInverse;
            this.setState({
                imgsArrangeArr: imgsArrangArr
            })
        }
    }

    // 居中图片的函数, 会利用rearrange函数, 所以也会触发render函数
    center (index) {
        return () => {
            this.rearrange(index);
        }
    }

    // 渲染函数
    render () {

        let { imgFigures, controllerUnits } = this.initElements();

        return (
            <div className="component-wrap">
                <section className="stage" ref={ "stage" }>
                    <section className="img-section">
                        { imgFigures }
                    </section>
                    <nav className="controller-nav">
                        { controllerUnits }
                    </nav>
                </section>
            </div>
        );
    }

    // 给窗口绑定resize事件, 若窗口大小改变, 则在最后一次触发initParams和rearrange
    bindWindowResizeListener () {

        // 在某个时间段如果多次触发resize事件, 执行最后一次
        window.onresize = () => {
            if (this.resizeTimer) {
                clearTimeout(this.resizeTimer);
            }
            this.resizeTimer = setTimeout (() => {
                this.initParams();

                // 随机将一张图片居中放置
                let num = getRangeRandom(0, this.state.imgsArrangeArr.length);
                this.rearrange(num);
            } , 500);
        };
    }

    // componentDidMount结束时: 计算出Constant内的各取值范围, 执行 rearrange 函数
    componentDidMount () {

        this.bindWindowResizeListener();

        this.initParams();

        // 随机将一张图片居中放置
        let num = getRangeRandom(0, this.state.imgsArrangeArr.length);
        this.rearrange(num);
    }
}

export default GalleryByReactApp;
