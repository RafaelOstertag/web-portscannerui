import React from "react";
import ReactDOM from "react-dom";
import ScanResult from "./ScanResult";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <ScanResult
            scanResult={{
                state: "up",
                ports: [],
                hostnames: [],
                addresses: []
            }}
        />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
