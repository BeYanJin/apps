// scss
import "./imgFigure.scss";

// libs
import React from "react";

class ImgFigure extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    initAttrs () {
        let styleObj = {},
            imgFigureClassName = "img-figure ";

        // 如果props属性中指定了这张图片的位置, 则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }
        // 如果图片的旋转角度有值并且不为0, 添加旋转角度
        if (this.props.arrange.rotate) {
            (['Moz', 'Ms', 'Webkit', '']).map((value) => {
                styleObj[value + 'Transform'] = 'rotate(' +
                                    this.props.arrange.rotate +
                                    'deg)';
            });
        }
        // 如果图片处于中心, 则它要在最顶层
        if (this.props.arrange.isCenter) {
            styleObj.zIndex = 999;
        }

        imgFigureClassName += this.props.arrange.isInverse ? "is-inverse " : "";

        return {
            styleObj: styleObj,
            imgFigureClassName: imgFigureClassName
        }
    }

    handleClick (e) {
        // 翻转和居中图片
        if (this.props.arrange.isCenter) {
            this.props.inverse()
        } else {
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    }

    // methods
    render () {

        let { styleObj, imgFigureClassName } = this.initAttrs();

        return (
            <figure className={ imgFigureClassName } style = { styleObj }
                    onClick={ this.handleClick }>
                <img draggable="false"
                     src={ this.props.data.imageURL }
                     alt={ this.props.data.title } />
                <figcaption>
                    <h2 className="img-title">
                        { this.props.data.title }
                    </h2>
                    <div className="img-back" onClick={ this.handleClick }>
                        <p>{ this.props.data.desc }</p>
                    </div>
                </figcaption>
            </figure>
        );
    }
}

export default ImgFigure;