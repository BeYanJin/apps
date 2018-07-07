"use strict";

const glob = require("glob");
const dirVars = require("./dir-vars.config.js");
const command = require("./command.config.js");

const options = {
    // 在 pages 目录里找
    cwd: dirVars.srcDir,
    // 这里不能异步，只能同步
    sync: true
};

// 考虑到多个页面共用HTML等资源的情况，跳过以"_"开头的目录
const globInstance = new glob.Glob("*", options);

// 判断数组是否包含某个元素, 若采用es6新出的includes api, 则注释掉
/*Array.prototype.contains = function (e) {
    let str = String.fromCharCode(2);
    let reg = new RegExp(str + e + str);
    return (reg.test(str + this.join(str) + str));
};*/

// 如果 globInstance.found 数组中含有 command.name 元素, 则覆盖该数组为该元素值
if (command.name !== undefined && globInstance.found.includes(command.name)) {
    globInstance.found = command.name;
} else {
    let message = "请输入正确的name参数(项目名), --name=xxx, xxx为欲打包的项目文件夹";
    throw new Error(message);
}

// 返回一个字符串, 是当前文件夹中的一个, 如： "avoid-food", "escape-police", "flappy-bird"等等
module.exports = globInstance.found;