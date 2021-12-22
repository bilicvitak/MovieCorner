import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Grid } from '@mui/material';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Movies from '../Movies/Movies';
import useStyles from './styles';
import { getAllMovies, getRandomMovies } from '../../actions/movies';
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
                console.log('Latest not yet implemented');
                break;
                //dispatch(getRadnomMovies()); // getLatestMovies
            case TOP_RATED:
                console.log('Top rated not yet implemented');
                break;
                //dispatch(getRadnomMovies()); // getTopRatedMovies
            case GENRES:
                console.log('Genres not yet implemented');
                break;
                //dispatch(getRadnomMovies()); // getGenres
            case ALL_MOVIES:
                dispatch(getAllMovies());
                break;
            default:
                dispatch(getRandomMovies(user?.result?._id)); // getAllMovies
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
