import React from "react";
import { useState } from "react";
import userService from "../services/user";

import { TextField, Button } from "@mui/material";

const LoginForm = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (username, password) => {
    try {
      const user = await userService.login(username, password);
      window.localStorage.setItem("keeb_user_token", JSON.stringify(user));
    } catch (exception) {
      console.log(exception)
    }
  };

  const login = (event) => {
    event.preventDefault();
    loginHandler(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
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
        <Button variant="contained" type="submit">login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
