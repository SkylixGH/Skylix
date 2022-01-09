import React from "react";
import ReactDOM from "react-dom";
import { App, Button, theming, themingThemes } from "@skylixgh/luxjs-client";

theming.installTheme(themingThemes.defaultDarkTheme).then(() => {
    theming.loadTheme(themingThemes.defaultDarkTheme.author, themingThemes.defaultDarkTheme.name);
});

ReactDOM.render(
    <App>
        <Button>Hello</Button>
    </App>,
    document.getElementById("root")
);
