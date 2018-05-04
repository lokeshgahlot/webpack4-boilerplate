import React from "react";
import {render} from "react-dom";
import HomePage from "./HomePage"; // jsx test

const Root = _ => <React.Fragment><HomePage/></React.Fragment>

render(<Root />, document.getElementById("root"));
