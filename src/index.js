import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// ReactDOM.render(
//   <App></App>,document.getElementById("root")
// )
const root = document.getElementById('root');
const rootContainer = ReactDOM.createRoot(root);
rootContainer.render(<App />);

