import { Button, Grid, TextField, Box } from '@mui/material';
import React from 'react';
import logo from '../../images/logo.png';
import useStyles from './styles';
import { Link } from 'react-router-dom';

function Header() {
    const classes = useStyles();

    return (
        <Box>
            <Grid container className={classes.mainGrid}>
                <Grid item>
                    <TextField label="Search" variant="standard" />
                </Grid>
                <Grid item>
                    <img src={logo} height="80" alt="logo" />
                </Grid>
                <Grid item>
                    <Button component={Link} to="/auth" className={classes.button} variant="contained">SIGN IN</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Header;

