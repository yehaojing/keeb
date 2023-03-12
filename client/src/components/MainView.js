// import { Paper } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import About from "./About";
import Breadcrumbs from "./Breadcrumbs";
import KeyboardsView from "./KeyboardsView";
import LoginForm from "./LoginForm";
import { PostView } from "./Post";
import SignUpForm from "./SignUpForm";
import Social from "./Social";
import StyledContainer from "./StyledContainer";

const MainView = ({ login }) => {
  const [crumbs, setCrumbs] = useState([]);

  return (
    <StyledContainer>
      <Breadcrumbs crumbs={crumbs} />
      <Routes>
        <Route
          path="/"
          element={
            <KeyboardsView
              login={login}
              setCrumbs={setCrumbs}
            />
          }
        />
        <Route
          path="/social"
          element={<Social login={login} setCrumbs={setCrumbs}/>}
        />
        <Route path="/social/:id" element={<PostView login={login} setCrumbs={setCrumbs}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm setCrumbs={setCrumbs}/>} />
        <Route path="/signup" element={<SignUpForm setCrumbs={setCrumbs}/>} />
      </Routes>
    </ StyledContainer>
  );
};

MainView.propTypes = {
  keyboards: PropTypes.array,
  posts: PropTypes.array,
  handlePost: PropTypes.func,
  handleDelete: PropTypes.func,
  login: PropTypes.object,
};

export default MainView;
