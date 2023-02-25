import { Button,Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import PropTypes from "prop-types";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import useStyles from "./style";

const NavBar = ({ login }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <AppBar style={classes.header}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Typography variant="h3">Keeb</Typography>
        <div style={{ alignItems: "flex-end" }}>
          <Button
            style={classes.outlineButton}
            color="inherit"
            component={Link}
            to="/"
          >
            <Typography variant="h5">Keyboards</Typography>
          </Button>
          <Button
            color="inherit"
            style={classes.outlineButton}
            component={Link}
            to="/about"
          >
            <Typography variant="h5">About</Typography>
          </Button>

          {login.access_token ? (
            <>
              <Button
                variant="outlined"
                style={classes.outlineButton}
                onClick={() => {
                  window.localStorage.removeItem("keeb_user_token");
                  navigate("/");
                  window.location.reload();
                }}
                color="inherit"
                component={Link}
                to="/"
              >
                <Typography variant="h5">Logout</Typography>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                style={classes.outlineButton}
                color="inherit"
                component={Link}
                to="/login"
              >
                <Typography variant="h5">Login</Typography>
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
NavBar.propTypes = {
  login: PropTypes.object,
};

export default NavBar;
