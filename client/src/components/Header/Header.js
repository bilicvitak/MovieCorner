import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, TextField, Box, Typography } from '@mui/material';
import logo from '../../images/logo.png';
import useStyles from './styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';


function Header() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        navigate('/');
    };

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
                    {user ? (
                        <div className={classes.userDiv}>
                            <Typography className={classes.userName}>{user?.result.name}</Typography>
                            <Button variant="contained" className={classes.button} onClick={logout}>LOGOUT</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" className={classes.button} variant="contained">SIGN IN</Button>
                    )}
                </Grid>
            </Grid>
        </Box >
    );
}

export default Header;

