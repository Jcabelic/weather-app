import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

//React.StrictMode was removed from the code for the following reasons:
//natural process of react - rerendering application twice
// while GitHub OAuth give code which can be used only once
// so we need to remove StrictMode to avoid error
