// import { Paper } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Route,Routes } from "react-router-dom";

import About from "./About";
import KeyboardsView from "./KeyboardsView";
import LoginForm from "./LoginForm";
import { PostView } from "./Post";
import SignUpForm from "./SignUpForm";
import Social from "./Social";

const MainView = ({ keyboards, posts, handlePost, handleDelete, login }) => {
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
            login={login}
          />
        }
      />
      <Route path="/social" element={<Social posts={posts} login={login}/>} />
      <Route path="/social/:id" element={<PostView login={login}/>} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
    // </Paper>
  );
};

MainView.propTypes = {
  keyboards: PropTypes.array,
  posts: PropTypes.array,
  handlePost: PropTypes.func,
  handleDelete: PropTypes.func,
  login: PropTypes.object
};

export default MainView;
