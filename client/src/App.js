import React, { useEffect, useState } from "react";
import MainView from "./components/MainView";
import NavBar from "./components/NavBar";
import apiClient from "./utils/apiClient";
import keyboardService from "./services/keyboard";
export default function App() {
  const [login, setLogin] = useState({});
  const [keyboards, setKeyboards] = useState([]);

  const hook = () => {
    keyboardService.getAll().then((response) => {
      setKeyboards(response);
    });
  };
  useEffect(hook, []);

  useEffect(() => {
    const keebUser = window.localStorage.getItem("keeb_user_token");
    if (keebUser) {
      const login = JSON.parse(keebUser);
      setLogin(login);
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${login.access_token}`;
    }
  }, []);

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
      />
    </>
  );
}
