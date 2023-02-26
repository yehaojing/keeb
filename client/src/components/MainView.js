// import { Paper } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Route,Routes } from "react-router-dom";

import About from "./About";
import KeyboardsView from "./KeyboardsView";
import LoginForm from "./LoginForm";
import { PostView } from "./Post";
import Social from "./Social";

const MainView = ({ keyboards, posts, handlePost, handleDelete }) => {
  return (
    // <Paper style={{ marginTop: 80 }}>
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
      <Route path="/social" element={<Social posts={posts}/>} />
      <Route path="/social/:id" element={<PostView/>} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
    // </Paper>
  );
};

MainView.propTypes = {
  keyboards: PropTypes.array,
  posts: PropTypes.array,
  handlePost: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default MainView;
