import { Box, Card, Divider, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../../services/user";
import { StyledFilledButton } from "../StyledButton";
import StyledContainer from "../StyledContainer";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigate = useNavigate();

  const signUpHandler = async (event) => {
    event.preventDefault();
    try {
      await userService.createUser(username, password, fullName, email);
      navigate("/");
      window.location.reload();
    } catch (exception) {
      console.log(exception);
    }
    setUsername("");
    setEmail("");
    setFullName("");
    setPassword("");
    setConfirmedPassword("");
  };

  return (
    <StyledContainer>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card style={{ padding: "5%" }}>
          <h1>Sign Up</h1>
          <form onSubmit={signUpHandler}>
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
                type="text"
                label="Email"
                value={email}
                name="Email"
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div style={{ paddingBottom: "5%" }}>
              <TextField
                type="text"
                label="Full Name"
                value={fullName}
                name="Full Name"
                onChange={({ target }) => setFullName(target.value)}
              />
            </div>
            <Divider/>
            <div style={{ paddingTop: "5%", paddingBottom: "5%" }}>
              <TextField
                type="password"
                label="Password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div style={{ paddingBottom: "5%" }}>
              <TextField
                type="password"
                label="Confirm Password"
                value={confirmedPassword}
                name="Confirm Password"
                onChange={({ target }) => setConfirmedPassword(target.value)}
              />
            </div>
            <StyledFilledButton type="submit">Submit</StyledFilledButton>
          </form>
        </Card>
      </Box>
    </StyledContainer>
  );
};

export default SignUpForm;
