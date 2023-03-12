import React from "react";
import { useCookies } from "react-cookie";

import MainView from "./components/MainView";
import NavBar from "./components/NavBar";
import apiClient from "./utils/apiClient";

export default function App() {
  const [login] = useCookies(["access_token"]);

  apiClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${login.access_token}`;

  return (
    <>
      <NavBar login={login} />
      <MainView
        login={login}
      />
    </>
  );
}
