/* global $ */

// 初始层 单例对象
let Info = ( function() {

    // 私有属性、方法和对象
    let _span = $("#info span"),
        _div = $("#info div");

    // 公有属性、方法和对象
    return {
        setInfo (step) {

            let text;
            if (step <= 15) {
                text = "这么辣鸡还好意思学人家摆摊，进去蹲几年吧！";
            } else if (step > 15 && step <= 30) {
                text = "傻逼了吧，进去了吧，腿短还学人摆摊，辣鸡";
            } else if (step > 30 && step <= 45) {
                text = "从前有个卖炒饭的小哥，然后就没然后了！";
            } else if (step > 45 && step <= 60) {
                text = "你别以为你长得帅我就不抓你！";
            } else if (step > 60 && step <= 75) {
                text = "哎哟我去，吃啥长大的，长腿欧巴！";
            } else if (step > 75 && step <= 90) {
                text = "你再快点，小心没有朋友！";
            } else if (step > 90 && step <= 110) {
                text = "不愧是快枪手，我服！";
            } else if (step > 110 && step <= 140) {
                text = "卧槽，吊炸天的智商，请收下我的膝盖！";
            } else {
                text = "你别跑呀，我不查你还不行吗！";
            }

            _span.text(step);
            _div.text(text);
        }
    };

})();

export { Info };
