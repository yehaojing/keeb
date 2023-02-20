import React, { useEffect } from "react";
import MainView from "./components/MainView";
import NavBar from "./components/NavBar";
import apiClient from './utils/apiClient';
export default function App() {

  useEffect(() => {
    const keebUser = window.localStorage.getItem("keeb_user_token");
    if (keebUser) {
      console.log(keebUser);
      const login = JSON.parse(keebUser);
      console.log(login);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${login.access_token}`;
    }
  }, []);

  return (
    <>
      <NavBar />
      <MainView />
    </>
  );
}
