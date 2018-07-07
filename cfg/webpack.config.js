"use strict";

const command = require("./params/command.config.js");

module.exports = {

    cache: true,

    stats: {
        // 增加缓存了的（但没构建）模块的信息
        cached: true,
        // `webpack --colors` 等同于
        colors: true,
        // 增加模块被引入的原因
        reasons: true,
        // 增加时间信息
        timings: true,
        // 增加 webpack 版本信息
        version: true,
        // 增加错误信息
        errors: true
    },

    bail: true,

    devtool: (command.env == "dev") ?
            "cheap-module-eval-source-map" :
            "cheap-module-source-map",

    // 入口文件
    entry: require("./base/entry.config.js"),

    // 输出文件
    output: require("./base/output.config.js"),

    // 插件
    plugins: require("./base/plugins.config.js"),

    // 模块
    module: require("./base/module.config.js"),

    externals: require("./base/externals.config.js"),

    resolve: require("./base/resolve.config.js"),

    devServer: command.serve ? require("./vendors/devServer.config.js") : {}
};