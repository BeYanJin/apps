"use strict";

const command = require("../params/command.config.js");
const dirVars = require("../params/dir-vars.config.js");
const app = require("../params/app-entries.config.js");

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const pluginsConfig = [
    // 使jquery暴露到全局
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "window.$": "jquery",
    }),
    /**
    * 把css抽取出来单独打包到css文件中, 并通过link标签导入到html中
    * 因ExtractTextPlugin不支持热更新, 故开发环境下直接用style-loader加载样式
    * 如有问题, 可切换回ExtractTextPlugin, 即使不能用热更新, 也可用LiveReload
    */
    new ExtractTextPlugin({
        filename: command.serve ? "style.[contenthash:4].css" : "[name]/style.[contenthash:4].css",
        // 向所有额外的 chunk 提取 (默认只提取初始加载模块)
        allChunks: true,
        disable: (command.env == "dev")
    }),
    new webpack.DefinePlugin({
        IS_PRODUCTION: (command.env == "prod")
    })
];

// 开启服务器
if (command.serve) {
    // hot-module-replacement-plugin
    pluginsConfig.push(new webpack.HotModuleReplacementPlugin());
} else {
    // 每次打包都先删除掉dist目录
    pluginsConfig.push(
        new CleanWebpackPlugin(app, {
            root: dirVars.distDir,
            verbose: true,
            dry: false
        })
    );
}
// 生产环境
if (command.env == "prod") {
    /**
    * no-emit-on-errors-plugin
    * 配合CLI的--bail, 一出error就终止webpack的编译进程
    */
    pluginsConfig.push(new webpack.NoEmitOnErrorsPlugin());
    /**
    * uglify-js-plugin
    * 压缩输出的 js 文件
    */
    pluginsConfig.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}


/**
* html-webpack-plugin
* 输出对应的 html 页面
*/
const htmlPlugin = new HtmlWebpackPlugin({
    filename: command.serve ? "index.html" : `${app}/index.html`,
    template: path.resolve(dirVars.srcDir, `${app}/index.html`),
    // 导入到body
    inject: true,
    // 需要依赖的模块
    chunks: [app],
    // xhtml
    xhtml: true,
    // 根据依赖自动排序
    chunksSortMode: "dependency",
    minify: {
        "collapseWhitespace": (command.env == "prod"),
        "removeAttributeQuotes": (command.env == "prod"),
        "removeEmptyAttributes": (command.env == "prod"),
        "removeComments": (command.env == "prod")
    }
});
pluginsConfig.push(htmlPlugin);


module.exports = pluginsConfig;