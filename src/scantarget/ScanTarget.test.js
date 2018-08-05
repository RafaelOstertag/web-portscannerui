import React from "react";
import ReactDOM from "react-dom";
import ScanTarget from "./ScanTarget";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <ScanTarget failureHandler={() => {}} successHandler={() => {}} />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
