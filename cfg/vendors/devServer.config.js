"use strict";

const dirVars = require("../params/dir-vars.config.js");

module.exports = {
    contentBase: dirVars.projectDir,
    historyApiFallback: true,
    // 主机名默认为 localhost
    watchContentBase: true,
    host: "localhost",
    compress: true,
    // 可以监控js变化
    inline: true,
    // 默认8000
    port: 8000,
    // 热启动
    hot: true
};