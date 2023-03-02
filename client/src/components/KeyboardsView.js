import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import React from "react";

import KeyboardCard from "./KeyboardCard";
import KeyboardForm from "./KeyboardForm";
import StyledContainer from "./StyledContainer";

const KeyboardsView = ({ keyboards, handlePost, handleDelete, login }) => {
  console.log(login);
  return (
    <StyledContainer>
      <Grid container spacing={0.5}>
        {keyboards.map((keyboard) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={keyboard.id}>
              <KeyboardCard
                item
                key={keyboard.id}
                keyboard={keyboard}
                handleDelete={handleDelete(keyboard.id)}
              />
            </Grid>
          );
        })}
        {login.access_token && (
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <KeyboardForm handlePost={handlePost} />
          </Grid>
        )}
      </Grid>
    </StyledContainer>
  );
};

KeyboardsView.propTypes = {
  keyboards: PropTypes.array,
  handlePost: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default KeyboardsView;
