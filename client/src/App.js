import React, { useEffect, useState } from "react";

import MainView from "./components/MainView";
import NavBar from "./components/NavBar";
import keyboardService from "./services/keyboard";
import postService from "./services/posts";
import apiClient from "./utils/apiClient";

export default function App() {
  const [login, setLogin] = useState({});
  const [keyboards, setKeyboards] = useState([]);
  const [posts, setPosts] = useState([]);

  const keyboardHook = () => {
    keyboardService.getAll().then((response) => {
      setKeyboards(response);
    });
  };
  useEffect(keyboardHook, []);

  const postHook = () => {
    postService.getAll().then((response) => {
      setPosts(response);
    });
  };
  useEffect(postHook, []);

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
        posts={posts}
        handlePost={handlePost}
        handleDelete={handleDelete}
      />
    </>
  );
}
