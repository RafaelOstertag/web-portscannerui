import React from "react";
import ReactDOM from "react-dom";
import Ports from "./Ports";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Ports ports={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
