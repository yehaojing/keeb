import React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import KeyboardCard from "./KeyboardCard";
import KeyboardForm from "./KeyboardForm";

const Home = ({ keyboards, handlePost, handleDelete }) => {
  return (
    <Paper style={{ marginTop: 80 }}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          {keyboards.map((keyboard) => {
            return (
              <KeyboardCard
                key={keyboard.id}
                keyboard={keyboard}
                handleDelete={handleDelete(keyboard.id)}
              />
            );
          })}
          <KeyboardForm handlePost={handlePost} />
        </Box>
      </Container>
    </Paper>
  );
};

Home.propTypes = {
  keyboards: PropTypes.array,
  handlePost: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default Home;
