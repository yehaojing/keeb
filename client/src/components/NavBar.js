import { Button, Slide, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import useStyles from "./style";

const NavBar = () => {
  // eslint-disable-next-line no-unused-vars
  const [login, setLogin, removeLogin] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const classes = useStyles();
  const trigger = useScrollTrigger();
  return (
    <Slide
      appear={false}
      direction="down"
      in={!trigger}
      addEndListener={() => console.log("This is the end.")}
    >
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
              style={classes.outlineButton}
              color="inherit"
              component={Link}
              to="/social"
            >
              <Typography variant="h5">Social</Typography>
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
                    removeLogin("access_token");
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
    </Slide>
  );
};
NavBar.propTypes = {
  login: PropTypes.object,
};

export default NavBar;
