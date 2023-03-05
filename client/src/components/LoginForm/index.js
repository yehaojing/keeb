import { Box, Card, TextField } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../../services/user";
import { StyledFilledButton, StyledOutlinedButton } from "../StyledButton";

const LoginForm = ({ setCrumbs }) => {
  const loginHook = () => {
    setCrumbs([
      { link: "/", name: "Home" },
      { link: "/login", name: "Login" },
    ]);
  };
  useEffect(loginHook, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      await userService.login(username, password);
      navigate("/");
      window.location.reload();
    } catch (exception) {
      console.log(exception);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card style={{ padding: "5%" }}>
        <h1>Login</h1>
        <form onSubmit={loginHandler}>
          <div style={{ paddingBottom: "5%" }}>
            <TextField
              type="text"
              label="Username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div style={{ paddingBottom: "5%" }}>
            <TextField
              type="password"
              label="Password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <StyledFilledButton type="submit">Login</StyledFilledButton>
            <StyledOutlinedButton
              style={{ alignItem: "flex-end" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </StyledOutlinedButton>
          </div>
        </form>
      </Card>
    </Box>
  );
};

export default LoginForm;
