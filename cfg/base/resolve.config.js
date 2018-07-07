"use strict";

const path = require("path");
const dirVars = require("../params/dir-vars.config");

module.exports = {
    alias: {
        "jquery": path.resolve(dirVars.nodeModulesDir, "jquery/dist/jquery.min.js"),
        "jquery-timer": path.resolve(dirVars.vendorsDir, "jquery-timer/jquery.timer.js"),

        "react": path.resolve(dirVars.nodeModulesDir, "react/dist/react.js"),
        "react-dom": path.resolve(dirVars.nodeModulesDir, "react-dom/dist/react-dom.js"),
        "react-dom/lib/ReactMount": path.resolve(dirVars.nodeModulesDir, "react-dom/lib/ReactMount.js"),
    },
    extensions: [".js", ".jsx", ".json"]
};