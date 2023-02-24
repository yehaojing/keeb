import React from "react";
import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";
import About from "./About";
import KeyboardsView from "./KeyboardsView";
import LoginForm from "./LoginForm";

const MainView = ({ keyboards, handlePost, handleDelete }) => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <KeyboardsView
              keyboards={keyboards}
              handlePost={handlePost}
              handleDelete={handleDelete}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
};

MainView.propTypes = {
  keyboards: PropTypes.array,
  handlePost: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default MainView;
