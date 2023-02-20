import React from "react";
import { useState } from "react";
import userService from "../services/user";
import { useNavigate } from "react-router-dom";

import { TextField, Button } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await userService.login(username, password);
      window.localStorage.setItem("keeb_user_token", JSON.stringify(user));
      navigate("/");
      window.location.reload();
    } catch (exception) {
      console.log(exception);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        Username
        <div>
          <TextField
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        Password
        <div>
          <TextField
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="contained" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
