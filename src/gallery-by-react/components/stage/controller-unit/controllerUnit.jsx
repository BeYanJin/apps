// scss
import "./controllerUnit.scss";

// libs
import React from "react";
import ReactDOM from "react-dom";


class ControllerUnit extends React.Component {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    initAttrs () {
        let controllerUnitClassName = "iconfont controller-unit ";

        // 如果对应的是居中的图片, 显示控制按钮的居中态
        if (this.props.arrange.isCenter) {
            controllerUnitClassName += "is-center ";
            // 如果翻转显示翻转状态
            if (this.props.arrange.isInverse) {
                controllerUnitClassName += "is-inverse ";
            }
        }
        return controllerUnitClassName;
    }

    /**
    * ControllerUnit的点击处理函数
    */
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

    render () {

        let controllerUnitClassName = this.initAttrs();

        return (
            <span className={ controllerUnitClassName }
                onClick={ this.handleClick }>
            </span>
        );
    }
}

export default ControllerUnit;