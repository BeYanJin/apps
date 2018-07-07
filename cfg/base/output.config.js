"use strict";

const dirVars = require("../params/dir-vars.config");
const command = require("../params/command.config.js");

let config = {
    path: dirVars.distDir,
    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
    filename: command.serve ? "entry.[hash:4].js" : "[name]/entry.[hash:4].js",
    chunkFilename: "[id].chunk.js",
    publicPath: command.serve ? "http://localhost:8000/" : dirVars.publicPath
};

module.exports = config;