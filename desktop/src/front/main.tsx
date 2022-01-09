import React from "react";
import ReactDOM from "react-dom";
import { App, Button, theming, themingThemes } from "@skylixgh/luxjs-client";
import Root from "./Root";

theming.installTheme(themingThemes.defaultDarkTheme).then(() => {
    theming.loadTheme(themingThemes.defaultDarkTheme.author, themingThemes.defaultDarkTheme.name);
});

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById("root")
);
