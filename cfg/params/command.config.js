"use strict";

/* global process */

const task = process.env.npm_lifecycle_event;
const argv = JSON.parse(process.env.npm_config_argv).original.slice(2);



/**
* serve: true, false
         是否开启服务器调试, true 为 开启, false 为 打包
* name: xxx, undefined
        欲打包或调试的项目名, 如: flappy-bird, 则只打包flappy-bird文件夹
        若该参数未定义, 即 name = undefined, 则默认打包所有项目文件夹
* env:  dev, prod
        模式, dev 为 开发模式(默认), prod 为 生产环境
*/
let serve, name, env = "dev";


argv.map( (element) => {
    if (element.match(/--env=/)) {
        env = element.substring(6, element.length);
        return;
    }
    if (element.match(/--name=/)) {
        name = element.substring(7, element.length);
        return;
    }
});

if (task == "start") {
    serve = true;
} else {
    serve = false;
}

module.exports= {
    "env": env,
    "name": name,
    "serve": serve
};