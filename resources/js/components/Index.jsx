import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./Create";
import Edit from "./Edit";
import Main from "./Main";
import View from "./View";

function Example() {
    return (
        <Routes>
            <Route path="/home" element={<Main />} />
            <Route path="/view/:id" element={<View/>} />
            <Route path="/edit/:id" element={<Edit/>} />
            <Route path="/create" element={<Create/>} />
        </Routes>
    );
}

export default Example;

if (document.getElementById("index")) {
    ReactDOM.render(
        <BrowserRouter>
            <Example />
        </BrowserRouter>,
        document.getElementById("index")
    );
}
