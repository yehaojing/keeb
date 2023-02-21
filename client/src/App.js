import React, { useEffect, useState } from "react";
import MainView from "./components/MainView";
import NavBar from "./components/NavBar";
import apiClient from './utils/apiClient';
export default function App() {

  const [login, setLogin] = useState({})

  useEffect(() => {
    const keebUser = window.localStorage.getItem("keeb_user_token");
    if (keebUser) {
      const login = JSON.parse(keebUser);
      setLogin(login);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${login.access_token}`;
    }
  }, []);

  return (
    <>
      <NavBar login={login}/>
      <MainView />
    </>
  );
}
