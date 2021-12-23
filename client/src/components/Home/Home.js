import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Grid } from '@mui/material';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Movies from '../Movies/Movies';
import useStyles from './styles';
import { getAllMovies, getRandomMovies, getLatestMovies, getTopRatedMovies, getMoviesByGenre } from '../../actions/movies';
import { ALL_MOVIES, HOME, LATEST, TOP_RATED, GENRES } from '../../constants/actionTypes';

function Home({ filter }) {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        switch (filter) {
            case HOME:
                dispatch(getRandomMovies(user?.result?._id));
                break;
            case LATEST:
                dispatch(getLatestMovies(user?.result?._id));
                break;
            case TOP_RATED:
                dispatch(getTopRatedMovies(user?.result?._id));
                break;
            case GENRES:
                dispatch(getMoviesByGenre(user?.result?._id));
                break;
            case ALL_MOVIES:
                dispatch(getAllMovies(user?.result?._id));
                break;
            default:
                dispatch(getRandomMovies(user?.result?._id));
        }
    }, [currentId, dispatch]);

    return (
        <Box className={classes.box}>
            <Grid container rowSpacing={20} columnSpacing={16}>
                <Grid item xs={12} md={12}>
                    <Header />
                </Grid>
                <Grid item xs={12} md={2}>
                    <div style={{ textAlign: 'center' }}><Navigation /></div>
                </Grid>
                <Grid item xs={12} md={10}>
                    <Movies setCurrentId={setCurrentId} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;
