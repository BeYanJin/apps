"use strict";

const dirVars = require("../params/dir-vars.config.js");
const command = require("../params/command.config.js");

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    rules: [

        // eslint-loader
        {
            test: /\.js$/,
            enforce: "pre",
            loader: "eslint-loader",
            include: dirVars.srcDir,
            exclude: dirVars.libsDir,
            options: {
                // 若设为 true, 则 eslint 只会报 error 而忽略 warning
                quiet: true,
                // eslint 报 error 了就终止 webpack 编译
                failOnError: true,
                // 开启 cache, cache 存在 node_modules/.cache 目录里
                cache: true
            }
        },

        // expose-loader
        {
            // 此loader配置项的目标是NPM中的jquery
            test: require.resolve("jquery"),
            // 把jQuery对象声明成为全局变量 jQuery 和 $
            use: [
                {
                    loader: "expose-loader",
                    options: "jQuery"
                },
                {
                    loader: "expose-loader",
                    options: "$"
                }
            ]
        },

        // html-loader
        {
            test: /\.html$/,
            include: dirVars.srcDir,
            use: "html-loader"
        },

        // css-loader
        {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                // 在开发环境使用 style-loader
                fallback: "style-loader",
                use: [
                    {
                        loader: "css-loader?importLoaders=1",
                        options: {
                            minimize: true,
                            "-autoprefixer": true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.resolve(dirVars.cfgDir, "vendors/postcss.config.js")
                            }
                        }
                    }
                ]
            })
        },

        // css-loader to bootstrap
        {
            test: /\.css$/,
            include: /bootstrap/,
            use: ExtractTextPlugin.extract({
                // 在开发环境使用 style-loader
                fallback: "style-loader",
                use: [
                    { loader: "css-loader" }
                ]
            })
        },

        // scss-loader
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    {
                        loader: "css-loader?importLoaders=1",
                        options: {
                            minimize: true,
                            "-autoprefixer": true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.resolve(dirVars.cfgDir, "vendors/postcss.config.js")
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            })
        },

        // babel-loader
        {
            test: /\.(js|jsx)$/,
            include: [ dirVars.srcDir ],
            use:[
                {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true
                    }
                }
            ],
        },

        // json-loader
        {
            test: /\.json$/,
            use: "json-loader"
        },

        // url-loader
        {
            /**
            * 图片加载器, 与file-loader类似, 但其更适合图片
            * 作用: 可以将较小的图片转成base64, 减少http请求
            * 如下配置, 将小于8192byte的图片转成base64码, 图片名称不区分大小写
            */
            test: /\.(png|jpe?g|gif)$/i,
            include: dirVars.srcDir,
            use: [
                {
                    loader: "url-loader",
                    options: {
                        // 8192 bit, 1024 byte, 1kB
                        limit: 8192,
                        name: command.serve ?
                            "static/images/[name].[ext]" :
                            command.name + "/static/images/[name].[ext]"
                    }
                }
                /*{
                    loader: "image-webpack-loader",
                    options: {
                        progressive: true,
                        optimizationLevel: 7,
                        interlaced: false,
                        pngquant: {
                            quality: "65-90",
                            speed: 4
                        }
                    }
                }*/
            ]
        },

        // url-loader
        {
            // 专供iconfont方案使用的, 后面会带一串时间戳, 需要特别匹配到
            test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
            include: dirVars.srcDir,
            use: [
                {   loader: "url-loader",
                    options: {
                        // 8192 bit, 1024 byte, 1kB
                        limit: 8192,
                        name: command.serve ?
                            "static/fonts/[name].[ext]" :
                            command.name + "/static/fonts/[name].[ext]"
                    }
                }
            ]
        },

        // file-loader
        {
            test: /\.(mp3|ogg)$/,
            include: dirVars.srcDir,
            loader: "file-loader",
            options: {
                name: command.serve ?
                    "static/musics/[name].[ext]" :
                    command.name + "/static/musics/[name].[ext]"
            }
        },

        // file-loader
        {
            test: /\.mp4$/,
            include: dirVars.srcDir,
            loader: "file-loader",
            options: {
                name: command.serve ?
                    "static/videos/[name].[ext]" :
                    command.name + "/static/videos/[name].[ext]"
            }
        }
    ]
};
