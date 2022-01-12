import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, TextField, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import logo from '../../images/logo.png';
import useStyles from './styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { logout, getNewToken } from '../../actions/auth';
import SearchIcon from '@mui/icons-material/Search';
import { searchMovies } from '../../actions/movies';


function Header() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const accessToken = user?.accessToken;
        const refreshToken = user?.refreshToken;

        if (accessToken && refreshToken) {
            const decodedAT = decode(accessToken);

            if (decodedAT.exp * 1000 < new Date().getTime()) {
                dispatch(getNewToken({ refreshToken: refreshToken }));
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location]);

    const _logout = () => {
        dispatch(logout({ token: user?.refreshToken }, navigate));
        setUser(null);
    };

    const handleChange = (e) => {
        setKeyword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchMovies(keyword));
    }

    return (
        <Box>
            <Grid container className={classes.mainGrid}>
                <Grid item>
                    <form onSubmit={handleSubmit}>
                        <TextField label="Search" variant="standard" onChange={handleChange} />
                        <IconButton type="submit">
                            <SearchIcon />
                        </IconButton>
                    </form>
                </Grid>
                <Grid item>
                    <img src={logo} height="80" alt="logo" />
                </Grid>
                <Grid item>
                    {user ? (
                        <div className={classes.userDiv}>
                            <Typography className={classes.userName}>{user?.result.name}</Typography>
                            <Button variant="contained" className={classes.button} onClick={_logout}>LOGOUT</Button>
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

