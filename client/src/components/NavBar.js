import React from "react";
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./style";

const NavBar = () => {
    const classes = useStyles();
    return (
        <AppBar style={classes.header} enableColorOnDark>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Typography variant="h3">
                    Keeb
                </Typography>
                <div style={{ alignItems: 'flex-end' }}>

                    <Button color="inherit" component={Link} to="/">
                        <Typography variant="h5">
                            User
                        </Typography>
                    </Button>
                    <Button color="inherit" component={Link} to="/">
                        <Typography variant="h5">
                            About
                        </Typography>
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar