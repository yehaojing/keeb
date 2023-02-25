import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import KeyboardCard from "./KeyboardCard";
import KeyboardForm from "./KeyboardForm";

const KeyboardsView = ({ keyboards, handlePost, handleDelete }) => {
  return (
    <>

      <Grid container spacing={0.5}>
        {keyboards.map((keyboard) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={2} key={keyboard.id}>
              <KeyboardCard
                item
                key={keyboard.id}
                keyboard={keyboard}
                handleDelete={handleDelete(keyboard.id)}
              />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <KeyboardForm handlePost={handlePost} />
        </Grid>

      </Grid>

    </>
  );
};

KeyboardsView.propTypes = {
  keyboards: PropTypes.array,
  handlePost: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default KeyboardsView;
