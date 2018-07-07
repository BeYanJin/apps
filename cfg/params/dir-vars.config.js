"use strict";

const command = require("./command.config.js");

const path = require("path");

const dirVars = {};

/* global __dirname */

// output配置的publicPath参数值
// dirVars.publicPath = (command.env == "dev") ? "../" : "http://localhost:8000/";
dirVars.publicPath = "../";

// 项目根目录
dirVars.rootDir = path.resolve(__dirname, "../../");

// node-modules 目录的路径
dirVars.nodeModulesDir = path.resolve(dirVars.rootDir, "node_modules/");
// cfg 目录的路径
dirVars.cfgDir = path.resolve(dirVars.rootDir, "cfg/");
// dist 目录的路径
dirVars.distDir = path.resolve(dirVars.rootDir, "dist/");
// src 目录的路径
dirVars.srcDir = path.resolve(dirVars.rootDir, "src/");
// test 目录的路径
dirVars.testDir = path.resolve(dirVars.rootDir, "test/");
// vendors
dirVars.vendorsDir = path.resolve(dirVars.rootDir, "vendors/");


// projectDir
dirVars.projectDir = path.resolve(dirVars.distDir, command.name);
// avoid-food
dirVars.avoidFood = path.resolve(dirVars.distDir, "avoid-food/");
// escape-police
dirVars.escapePolice = path.resolve(dirVars.distDir, "escape-police/");
// flappy-bird
dirVars.flappyBird = path.resolve(dirVars.distDir, "flappy-bird/");
// gallery-by-react
dirVars.galleryByReact = path.resolve(dirVars.distDir, "gallery-by-react/");


module.exports = dirVars;