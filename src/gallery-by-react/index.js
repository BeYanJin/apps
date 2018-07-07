// scss
import "./index.scss";

// vendors
import React from "react";
import { render } from "react-dom";

// components
import GalleryByReactApp from "./components/stage/stage.jsx";

// render
render(
    <GalleryByReactApp />,
    document.getElementById("content")
);
