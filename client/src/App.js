import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import MainView from "./components/MainView";
import NavBar from "./components/NavBar";
import keyboardService from "./services/keyboard";
import apiClient from "./utils/apiClient";

export default function App() {
  const [login] = useCookies(["access_token"]);
  const [keyboards, setKeyboards] = useState([]);

  apiClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${login.access_token}`;

  const keyboardHook = () => {
    keyboardService.getAll().then((response) => {
      setKeyboards(response);
    });
  };
  useEffect(keyboardHook, []);

  const handleDelete = (id) => {
    return async () => {
      await keyboardService.deleteKeyboard(id);
      const keyboardResp = await keyboardService.getAll();
      setKeyboards(keyboardResp);
    };
  };

  const handlePost = async (newKeyboard) => {
    await keyboardService.postNewKeyboard(newKeyboard);
    const keyboardResp = await keyboardService.getAll();
    setKeyboards(keyboardResp);
  };

  return (
    <>
      <NavBar login={login} />
      <MainView
        keyboards={keyboards}
        handlePost={handlePost}
        handleDelete={handleDelete}
        login={login}
      />
    </>
  );
}
