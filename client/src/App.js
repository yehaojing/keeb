import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import KeyboardCard from "./components/KeyboardCard";

import keyboardService from "./services/keyboard";
import KeyboardForm from "./components/KeyboardForm";
import NavBar from "./components/NavBar";

export default function App() {
  const [keyboards, setKeyboards] = useState([]);

  const hook = () => {
    keyboardService.getAll().then((response) => {
      setKeyboards(response);
    });
  };
  useEffect(hook, []);

  const deleteHandler = (id) => {
    return async () => {
      await keyboardService.deleteKeyboard(id);
      const keyboardResp = await keyboardService.getAll();
      setKeyboards(keyboardResp);
    };
  };

  const postHandler = async (newKeyboard) => {
    await keyboardService.postNewKeyboard(newKeyboard);
    const keyboardResp = await keyboardService.getAll();
    setKeyboards(keyboardResp);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          {keyboards.map((keyboard) => {
            return (
              <KeyboardCard
                key={keyboard.id}
                keyboard={keyboard}
                handleDelete={deleteHandler(keyboard.id)}
              />
            );
          })}
          <KeyboardForm handlePost={postHandler} />
        </Box>
      </Container>
    </>
  );
}
