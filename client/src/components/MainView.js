import React from "react";
import {
    Routes, Route
} from "react-router-dom";
import About from "./About";
import Home from "./Home";

const MainView = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    );
};

export default MainView;