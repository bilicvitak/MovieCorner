import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';
import Movie from './Movie/Movie';

function Movies({ setCurrentId }) {
    const movies = useSelector((state) => state.movies);

    return (
        !movies.length ? <CircularProgress /> : (
            <Grid container alignItems="stretch" spacing={3} >
                {movies.map((movie) => (
                    <Grid item key={movie._id} xs={12} sm={4}>
                        <Movie movie={movie} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Movies;
