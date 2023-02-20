import React from "react";
import {
    Routes, Route
} from "react-router-dom";
import About from "./About";
import Home from "./Home";
import LoginForm from "./LoginForm";

const MainView = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </>
    );
};

export default MainView;