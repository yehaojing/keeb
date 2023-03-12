import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import keyboardService from "../services/keyboard";
import KeyboardCard from "./KeyboardCard";
import KeyboardForm from "./KeyboardForm";

const KeyboardsView = ({ login, setCrumbs }) => {
  const [keyboards, setKeyboards] = useState([]);

  const keyboardHook = () => {
    keyboardService.getAll().then((response) => {
      setKeyboards(response);
    });
    setCrumbs([
      { link: "/", name: "Home" },
      { link: "/", name: "Keyboards" },
    ]);
  };
  useEffect(keyboardHook, []);

  return (
    <Grid container spacing={0.5}>
      {keyboards.map((keyboard) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={4} key={keyboard.id}>
            <KeyboardCard
              item
              key={keyboard.id}
              keyboard={keyboard}
            />
          </Grid>
        );
      })}
      {login.access_token && (
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <KeyboardForm />
        </Grid>
      )}
    </Grid>
  );
};

KeyboardsView.propTypes = {
  keyboards: PropTypes.array,
  handlePost: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default KeyboardsView;
