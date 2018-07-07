"use strict";

const path = require("path");
const dirVars = require("../params/dir-vars.config.js");

// app为一个字符串, 是当前文件夹中的一个, 如： "avoid-food", "escape-police", "flappy-bird"等等
const app = require("../params/app-entries.config.js");

const entryObj = {};

entryObj[app] = path.resolve(dirVars.srcDir, app + "/index.js");

module.exports = entryObj;
