import React from "react";
import { IAdContentPlugin } from "./types";

function DefaultAdContent() {
    return <h1>Default Plugin Content</h1>;
}

const DefaultPlugin: IAdContentPlugin = {
    name: "defaultAd",
    content() {
        return <DefaultAdContent></DefaultAdContent>;
    },
    user: {
        gender: "male",
        ageGroup: "teenager",
    },
    is: function () {
        return true;
    },
};

export default DefaultPlugin;
